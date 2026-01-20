from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.ServiceCategoryViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'bookings', views.BookingViewSet, basename='booking')
router.register(r'reviews', views.ReviewViewSet, basename='review')
router.register(r'service-requests', views.ServiceRequestViewSet, basename='service-request')

urlpatterns = [
    path('', include(router.urls)),
    
    # Additional endpoints
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
    path('filter-options/', views.filter_options, name='filter-options'),
    
    # Service actions
    path('services/search/', views.ServiceViewSet.as_view({'get': 'search'}), name='service-search'),
    path('services/featured/', views.ServiceViewSet.as_view({'get': 'featured'}), name='featured-services'),
    path('services/nearby/', views.ServiceViewSet.as_view({'get': 'nearby'}), name='nearby-services'),
    
    # Booking actions
    path('bookings/upcoming/', views.BookingViewSet.as_view({'get': 'upcoming'}), name='upcoming-bookings'),
    path('bookings/provider/', views.BookingViewSet.as_view({'get': 'provider_bookings'}), name='provider-bookings'),
]