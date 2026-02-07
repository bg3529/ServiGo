# what serializers do?
# Django REST Framework Serializers Explained
# 
# Serializers convert complex data types (like Django models) into Python native data types that can be easily rendered into JSON/XML. They also do the reverse: parse incoming data and convert it back into complex types.
# Analogy: Translator Between Two Languages
# 
# Think of serializers as translators:
# 
    # Python/Django objects ↔ JSON/XML (for APIs)
# 
    # Database data ↔ Web/API format
# 
# What Serializers Actually Do:
# 1. Serialization (OUTGOING)
# python
# 
# Python object/Django model → JSON/XML
# Product object {
    # id: 1,
    # name: "Laptop",
    # price: 999.99,
    # created_at: datetime(2024, 1, 15)
# }
# 
# ↓ Serializer converts to ↓
# 
# JSON {
    # "id": 1,
    # "name": "Laptop",
    # "price": "999.99",
    # "created_at": "2024-01-15T10:30:00Z"
# }
# 
# 2. Deserialization (INCOMING)
# python
# 
# JSON from API → Python object/Django model
# JSON from request {
    # "name": "Phone",
    # "price": 599.99
# }
# 
# ↓ Serializer converts to ↓
# 
# Python dictionary {
    # 'name': 'Phone',
    # 'price': Decimal('599.99')
# }
# 
# Then Django can save to database


from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    ServiceCategory, Service, ServiceImage, ServiceTag,
    AvailabilitySlot, Booking, Review, ServiceRequest
)
import uuid

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

# class UserProfileSerializer(serializer.ModelSerializer):
#     class Meta:
#         model = User
#         fields=['id','username','email','first_name','last_name','profile_picture']

class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'description', 'icon', 'is_active']

class ServiceImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceImage
        fields = ['id', 'image_url', 'is_primary']
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

class ServiceTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceTag
        fields = ['id', 'name']

class AvailabilitySlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailabilitySlot
        fields = ['id', 'day', 'start_time', 'end_time', 'is_available']

class ServiceListSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)
    provider = UserProfileSerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()
    tags = ServiceTagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'description', 'price', 'price_unit',
            'location', 'category', 'provider', 'rating', 'total_reviews',
            'is_available', 'is_verified', 'primary_image', 'tags',
            'created_at'
        ]
    
    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image:
            serializer = ServiceImageSerializer(primary_image, context=self.context)
            return serializer.data['image_url']
        return None

class ServiceDetailSerializer(ServiceListSerializer):
    images = ServiceImageSerializer(many=True, read_only=True)
    availability_slots = AvailabilitySlotSerializer(many=True, read_only=True)
    
    class Meta(ServiceListSerializer.Meta):
        fields = ServiceListSerializer.Meta.fields + [
            'images', 'availability_slots', 'latitude', 'longitude'
        ]

class ServiceCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )
    tags = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )
    availability_slots = serializers.ListField(
        child=serializers.DictField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Service
        fields = [
            'category', 'title', 'description', 'price', 'price_unit',
            'location', 'latitude', 'longitude', 'images', 'tags',
            'availability_slots'
        ]
    
    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        tags_data = validated_data.pop('tags', [])
        slots_data = validated_data.pop('availability_slots', [])
        
        # Create service
        service = Service.objects.create(
            provider=self.context['request'].user,
            **validated_data
        )
        
        # Add images
        for i, image_data in enumerate(images_data):
            ServiceImage.objects.create(
                service=service,
                image=image_data,
                is_primary=(i == 0)
            )
        
        # Add tags
        for tag_name in tags_data:
            ServiceTag.objects.create(service=service, name=tag_name)
        
        # Add availability slots
        for slot_data in slots_data:
            AvailabilitySlot.objects.create(service=service, **slot_data)
        
        return service

class BookingSerializer(serializers.ModelSerializer):
    service_details = ServiceListSerializer(source='service', read_only=True)
    customer_name = serializers.CharField(source='customer.get_full_name', read_only=True)
    provider_name = serializers.CharField(source='service.provider.get_full_name', read_only=True)
    booking_time = serializers.SerializerMethodField()
    
    class Meta:
        model = Booking
        fields = [
            'id', 'customer', 'customer_name', 'service', 'service_details',
            'booking_date', 'booking_time', 'duration', 'total_price',
            'notes', 'customer_address', 'contact_phone', 'status',
            'payment_status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['customer', 'total_price', 'payment_status']

    def get_booking_time(self, obj):
        if obj.booking_date:
            return obj.booking_date.strftime('%H:%M:%S')
        return None

class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'service', 'booking_date', 'duration', 'notes',
            'customer_address', 'contact_phone'
        ]
    
    def validate(self, data):
        # Validate booking date is in future
        from django.utils import timezone
        if data['booking_date'] <= timezone.now():
            raise serializers.ValidationError("Booking date must be in the future")
        
        # Validate service is available
        service = data['service']
        if not service.is_available:
            raise serializers.ValidationError("This service is currently unavailable")
        
        # Calculate total price
        data['total_price'] = service.price * data['duration']
        
        return data
    
    def create(self, validated_data):
        validated_data['customer'] = self.context['request'].user
        return super().create(validated_data)

class ReviewSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.get_full_name', read_only=True)
    service_title = serializers.CharField(source='service.title', read_only=True)
    
    class Meta:
        model = Review
        fields = [
            'id', 'booking', 'customer', 'customer_name', 'service', 'service_title',
            'rating', 'comment', 'is_verified', 'created_at', 'updated_at'
        ]
        read_only_fields = ['customer', 'service', 'is_verified']
    
    def validate(self, data):
        booking = data['booking']
        
        # Check if booking belongs to user
        if booking.customer != self.context['request'].user:
            raise serializers.ValidationError("You can only review your own bookings")
        
        # Check if booking is completed
        if booking.status != 'completed':
            raise serializers.ValidationError("You can only review completed bookings")
        
        # Check if review already exists
        if Review.objects.filter(booking=booking).exists():
            raise serializers.ValidationError("You have already reviewed this booking")
        
        return data

class ServiceRequestSerializer(serializers.ModelSerializer):
    category = ServiceCategorySerializer(read_only=True)
    customer = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = ServiceRequest
        fields = [
            'id', 'title', 'description', 'category', 'preferred_budget',
            'location', 'customer', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['customer', 'is_active']

class SearchFilterSerializer(serializers.Serializer):
    q = serializers.CharField(required=False, allow_blank=True)
    search = serializers.CharField(required=False, allow_blank=True)  # Alias for q
    category = serializers.UUIDField(required=False)
    min_price = serializers.DecimalField(required=False, max_digits=10, decimal_places=2, min_value=0)
    max_price = serializers.DecimalField(required=False, max_digits=10, decimal_places=2, min_value=0)
    location = serializers.CharField(required=False)
    radius = serializers.IntegerField(required=False, min_value=1, max_value=100)
    sort_by = serializers.ChoiceField(
        required=False,
        choices=['newest', 'oldest', 'price_low', 'price_high', 'rating']
    )
    ordering = serializers.CharField(required=False)  # Alias for sort_by
    min_rating = serializers.IntegerField(required=False, min_value=1, max_value=5)
    verified_only = serializers.BooleanField(required=False, default=False)
    page = serializers.IntegerField(required=False, min_value=1, default=1)
    page_size = serializers.IntegerField(required=False, min_value=1, max_value=100, default=20)

class DashboardStatsSerializer(serializers.Serializer):
    total_services = serializers.IntegerField()
    active_bookings = serializers.IntegerField()
    total_earnings = serializers.DecimalField(max_digits=10, decimal_places=2)
    average_rating = serializers.DecimalField(max_digits=3, decimal_places=2)