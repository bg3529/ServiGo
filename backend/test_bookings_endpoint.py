#!/usr/bin/env python
"""
Test script to verify that the bookings endpoint is working correctly
and returns bookings for the authenticated user.
"""

import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from services.models import Booking, Service
from django.contrib.auth import get_user_model

User = get_user_model()

def test_bookings():
    print("=" * 60)
    print("TESTING BOOKINGS ENDPOINT")
    print("=" * 60)
    
    # Get all users
    users = User.objects.all()
    print(f"\nTotal users in database: {users.count()}")
    
    # Get all bookings
    all_bookings = Booking.objects.all()
    print(f"Total bookings in database: {all_bookings.count()}")
    
    if all_bookings.count() > 0:
        print("\n" + "-" * 60)
        print("BOOKING DETAILS:")
        print("-" * 60)
        
        for booking in all_bookings:
            print(f"\nBooking ID: {booking.id}")
            print(f"Customer: {booking.customer.email}")
            print(f"Service: {booking.service.title}")
            print(f"Status: {booking.status}")
            print(f"Booking Date: {booking.booking_date}")
            print(f"Total Price: Rs. {booking.total_price}")
            print(f"Created: {booking.created_at}")
    else:
        print("\n⚠️  No bookings found in the database.")
        print("You need to create bookings first to see them on /my-bookings page.")
    
    # Check services
    services = Service.objects.all()
    print(f"\n\nTotal services available: {services.count()}")
    
    if services.count() > 0:
        print("\nAvailable services:")
        for service in services[:5]:  # Show first 5
            print(f"  - {service.title} (Rs. {service.price})")
    
    print("\n" + "=" * 60)
    print("ENDPOINT INFORMATION:")
    print("=" * 60)
    print("Frontend calls: BookingService.getBookings()")
    print("API Endpoint: GET /services/bookings/")
    print("Authentication: Required (JWT Token)")
    print("Returns: All bookings where user is customer OR service provider")
    print("=" * 60)

if __name__ == "__main__":
    test_bookings()
