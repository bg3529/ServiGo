import django_filters
from django.db.models import *
from .models import Service, ServiceCategory

class ServiceFilter(django_filters.FilterSet):
    category = django_filters.UUIDFilter(field_name='category__id')
    category_name = django_filters.CharFilter(field_name='category__name')
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    location = django_filters.CharFilter(field_name='location', lookup_expr='icontains')
    verified_only = django_filters.BooleanFilter(field_name='is_verified')
    provider = django_filters.CharFilter(field_name='provider__username')
    search = django_filters.CharFilter(method='filter_search')
    
    class Meta:
        model = Service
        fields = ['category', 'min_price', 'max_price', 'location', 'is_available']
    
    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value) |
            Q(description__icontains=value) |
            Q(location__icontains=value) |
            Q(category__name__icontains=value) |
            Q(tags__name__icontains=value)
        ).distinct()

class ServiceSearchFilter(django_filters.FilterSet):
    q = django_filters.CharFilter(method='filter_search')
    category = django_filters.UUIDFilter(field_name='category__id')
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    location = django_filters.CharFilter(field_name='location', lookup_expr='icontains')
    verified_only = django_filters.BooleanFilter(field_name='is_verified')
    min_rating = django_filters.NumberFilter(field_name='rating', lookup_expr='gte')
    sort_by = django_filters.OrderingFilter(
        fields=(
            ('price', 'price'),
            ('created_at', 'created_at'),
            ('rating', 'rating'),
        ),
        field_labels={
            'price': 'Price',
            'created_at': 'Date',
            'rating': 'Rating',
        }
    )
    
    class Meta:
        model = Service
        fields = ['q', 'category', 'min_price', 'max_price', 'location', 'verified_only', 'min_rating']
    
    def filter_search(self, queryset, name, value):
        if not value:
            return queryset
        
        return queryset.filter(
            Q(title__icontains=value) |
            Q(description__icontains=value) |
            Q(location__icontains=value) |
            Q(category__name__icontains=value) |
            Q(tags__name__icontains=value)
        ).distinct()