from rest_framework import viewsets, generics, permissions, status, filters
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count, Avg, Sum
from django.shortcuts import get_object_or_404
from django.utils import timezone

from .models import (
    ServiceCategory, Service, ServiceImage,
    Booking, Review, ServiceRequest
)
from .serializers import (
    ServiceCategorySerializer,
    ServiceListSerializer,
    ServiceDetailSerializer,
    ServiceCreateSerializer,
    BookingSerializer,
    BookingCreateSerializer,
    ReviewSerializer,
    ServiceRequestSerializer,
    SearchFilterSerializer,
    DashboardStatsSerializer,
)
from .filters import ServiceFilter, ServiceSearchFilter

class ServiceCategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for service categories
    """
    queryset = ServiceCategory.objects.filter(is_active=True)
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]
    pagination_class = None
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return super().get_permissions()

class ServiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint for services
    """
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ServiceSearchFilter
    search_fields = ['title', 'description', 'location', 'category__name', 'tags__name']
    ordering_fields = ['price', 'created_at', 'rating']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = Service.objects.filter(is_available=True).select_related(
            'category', 'provider'
        ).prefetch_related('images', 'tags')
        
        # Filter verified services if requested
        verified_only = self.request.query_params.get('verified_only', 'false').lower() == 'true'
        if verified_only:
            queryset = queryset.filter(is_verified=True)
        
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'create':
            return ServiceCreateSerializer
        elif self.action == 'retrieve':
            return ServiceDetailSerializer
        return ServiceListSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy', 'my_services']:
            return [IsAuthenticated()]
        return [AllowAny()]
    
    def perform_create(self, serializer):
        serializer.save(provider=self.request.user)
    
    def perform_update(self, serializer):
        serializer.save()
    
    @action(detail=False, methods=['get'])
    def my_services(self, request):
        """
        Get services created by the logged-in user
        """
        services = Service.objects.filter(provider=request.user)
        page = self.paginate_queryset(services)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(services, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def toggle_availability(self, request, pk=None):
        """
        Toggle service availability
        """
        service = self.get_object()
        if service.provider != request.user:
            return Response(
                {'error': 'You do not have permission to modify this service'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        service.is_available = not service.is_available
        service.save()
        
        return Response({
            'id': service.id,
            'is_available': service.is_available,
            'message': f'Service availability set to {service.is_available}'
        })
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """
        Advanced search endpoint with filters
        """
        serializer = SearchFilterSerializer(data=request.query_params)
        if serializer.is_valid():
            queryset = Service.objects.filter(is_available=True)
            
            # Apply filters
            filterset = ServiceSearchFilter(serializer.validated_data, queryset)
            queryset = filterset.qs
            
            # Apply pagination
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = ServiceListSerializer(
                    page, many=True, context={'request': request}
                )
                return self.get_paginated_response(serializer.data)
            
            serializer = ServiceListSerializer(
                queryset, many=True, context={'request': request}
            )
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """
        Get featured services (highest rated, verified)
        """
        queryset = Service.objects.filter(
            is_available=True,
            is_verified=True,
            rating__gte=4.0
        ).order_by('-rating', '-total_reviews')[:10]
        
        serializer = ServiceListSerializer(
            queryset, many=True, context={'request': request}
        )
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def nearby(self, request):
        """
        Get services near a location (simplified version)
        """
        location = request.query_params.get('location', '')
        if not location:
            return Response(
                {'error': 'Location parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Simple location-based filtering
        queryset = Service.objects.filter(
            is_available=True,
            location__icontains=location
        )[:20]
        
        serializer = ServiceListSerializer(
            queryset, many=True, context={'request': request}
        )
        return Response(serializer.data)

class BookingViewSet(viewsets.ModelViewSet):
    """
    API endpoint for bookings
    """
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Booking.objects.filter(
            Q(customer=self.request.user) | Q(service__provider=self.request.user)
        ).select_related('service', 'customer', 'service__provider')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return BookingCreateSerializer
        return BookingSerializer
    
    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)
    
    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        """
        Confirm a booking (provider only)
        """
        booking = self.get_object()
        
        if booking.service.provider != request.user:
            return Response(
                {'error': 'Only the service provider can confirm bookings'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if booking.status != 'pending':
            return Response(
                {'error': f'Booking is already {booking.status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        booking.status = 'confirmed'
        booking.save()
        
        return Response({
            'id': booking.id,
            'status': booking.status,
            'message': 'Booking confirmed successfully'
        })
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """
        Mark booking as completed
        """
        booking = self.get_object()
        
        if booking.service.provider != request.user:
            return Response(
                {'error': 'Only the service provider can mark bookings as completed'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if booking.status != 'in_progress':
            return Response(
                {'error': 'Booking must be in progress to be completed'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        booking.status = 'completed'
        booking.save()
        
        return Response({
            'id': booking.id,
            'status': booking.status,
            'message': 'Booking marked as completed'
        })
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """
        Cancel a booking
        """
        booking = self.get_object()
        
        # Check permissions
        if booking.customer != request.user and booking.service.provider != request.user:
            return Response(
                {'error': 'You do not have permission to cancel this booking'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if booking.status in ['completed', 'cancelled']:
            return Response(
                {'error': f'Cannot cancel a {booking.status} booking'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        booking.status = 'cancelled'
        booking.save()
        
        return Response({
            'id': booking.id,
            'status': booking.status,
            'message': 'Booking cancelled successfully'
        })
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """
        Get upcoming bookings
        """
        bookings = Booking.objects.filter(
            customer=request.user,
            booking_date__gte=timezone.now(),
            status__in=['confirmed', 'pending']
        ).order_by('booking_date')
        
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def provider_bookings(self, request):
        """
        Get bookings for services owned by the provider
        """
        bookings = Booking.objects.filter(
            service__provider=request.user
        ).order_by('-created_at')
        
        page = self.paginate_queryset(bookings)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)

class ReviewViewSet(viewsets.ModelViewSet):
    """
    API endpoint for reviews
    """
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Review.objects.filter(customer=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

class ServiceRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint for service requests
    """
    serializer_class = ServiceRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ServiceRequest.objects.filter(customer=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)

class DashboardView(APIView):
    """
    API endpoint for dashboard statistics
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # For service providers
        if hasattr(user, 'services'):
            total_services = user.services.count()
            active_bookings = Booking.objects.filter(
                service__provider=user,
                status__in=['confirmed', 'in_progress']
            ).count()
            
            completed_bookings = Booking.objects.filter(
                service__provider=user,
                status='completed'
            )
            
            total_earnings = completed_bookings.aggregate(
                total=Sum('total_price')
            )['total'] or 0
            
            avg_rating = Review.objects.filter(
                service__provider=user
            ).aggregate(
                avg=Avg('rating')
            )['avg'] or 0
            
            stats = {
                'total_services': total_services,
                'active_bookings': active_bookings,
                'total_earnings': total_earnings,
                'average_rating': round(avg_rating, 2)
            }
        
        # For customers
        else:
            total_bookings = Booking.objects.filter(customer=user).count()
            active_bookings = Booking.objects.filter(
                customer=user,
                status__in=['confirmed', 'in_progress', 'pending']
            ).count()
            completed_bookings = Booking.objects.filter(
                customer=user,
                status='completed'
            ).count()
            
            stats = {
                'total_bookings': total_bookings,
                'active_bookings': active_bookings,
                'completed_bookings': completed_bookings,
                'pending_reviews': Review.objects.filter(
                    booking__customer=user,
                    booking__status='completed'
                ).exclude(
                    id__in=Review.objects.filter(customer=user).values('booking_id')
                ).count()
            }
        
        serializer = DashboardStatsSerializer(stats)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def filter_options(request):
    """
    Get available filter options
    """
    categories = ServiceCategory.objects.filter(is_active=True).values('id', 'name')
    min_price = Service.objects.filter(is_available=True).aggregate(min=Min('price'))['min'] or 0
    max_price = Service.objects.filter(is_available=True).aggregate(max=Max('price'))['max'] or 10000
    
    return Response({
        'categories': list(categories),
        'price_range': {
            'min': float(min_price),
            'max': float(max_price)
        },
        'sort_options': [
            {'value': 'newest', 'label': 'Newest First'},
            {'value': 'oldest', 'label': 'Oldest First'},
            {'value': 'price_low', 'label': 'Price: Low to High'},
            {'value': 'price_high', 'label': 'Price: High to Low'},
            {'value': 'rating', 'label': 'Highest Rated'}
        ]
    })