import requests
import json
import os
import django
import sys

# Setup Django environment
sys.path.append('/home/derek/Desktop/devlopment-in-django/ServiGo/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from rest_framework.test import APIRequestFactory
from services.views import BookingViewSet
from services.models import Booking, Service
from django.contrib.auth import get_user_model

User = get_user_model()

def test_booking_response():
    # Get a user and booking
    user = User.objects.first()
    booking = Booking.objects.first()
    
    if not booking:
        print("No bookings found. Please create one first.")
        return

    print(f"Testing with user: {user.email}")
    print(f"Testing with booking: {booking.id}")

    # Create request
    factory = APIRequestFactory()
    request = factory.get('/services/bookings/')
    request.user = booking.customer
    
    # Get view
    view = BookingViewSet.as_view({'get': 'list'})
    response = view(request)
    
    print("\nStatus Code:", response.status_code)
    
    if response.status_code == 200:
        data = response.data
        results = data.get('results', data) if isinstance(data, dict) else data
        
        if not results:
            print("No results in response")
            return

        first_booking = results[0]
        print("\nBooking Data Structure:")
        print(json.dumps(first_booking, indent=2, default=str))
        
        # Verify required fields for MyBookings.jsx
        required_fields = [
            'id', 'status', 'total_price', 'booking_date', 'booking_time',
            'provider_name', 'service_details'
        ]
        
        print("\nVerifying required fields:")
        for field in required_fields:
            if field in first_booking:
                print(f"✅ {field}: Present")
            else:
                print(f"❌ {field}: MISSING")
                
        # Verify service_details fields
        if 'service_details' in first_booking:
            service_details = first_booking['service_details']
            print("\nVerifying service_details fields:")
            if 'title' in service_details:
                print("✅ title: Present")
            else:
                print("❌ title: MISSING")
                
            if 'primary_image' in service_details:
                print("✅ primary_image: Present")
            else:
                print("❌ primary_image: MISSING")

if __name__ == "__main__":
    test_booking_response()
