#!/usr/bin/env python
"""
Debug script to check bookings API and serialization
"""

import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from services.models import Booking, Service
from services.serializers import BookingSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

def debug_bookings():
    print("=" * 80)
    print("DEBUGGING BOOKINGS API")
    print("=" * 80)
    
    # Get all bookings
    all_bookings = Booking.objects.all()
    print(f"\nTotal bookings in database: {all_bookings.count()}")
    
    if all_bookings.count() == 0:
        print("\n⚠️  No bookings found!")
        return
    
    # Check each booking
    print("\n" + "-" * 80)
    print("BOOKING DETAILS:")
    print("-" * 80)
    
    for booking in all_bookings:
        print(f"\nBooking ID: {booking.id}")
        print(f"  Customer: {booking.customer.email} (ID: {booking.customer.id})")
        print(f"  Service: {booking.service.title}")
        print(f"  Provider: {booking.service.provider.email}")
        print(f"  Status: {booking.status}")
        print(f"  Date: {booking.booking_date}")
        print(f"  Price: Rs. {booking.total_price}")
        
        # Try to serialize
        try:
            serializer = BookingSerializer(booking)
            print(f"  ✅ Serialization successful")
            # print(f"  Data: {json.dumps(serializer.data, indent=2, default=str)}")
        except Exception as e:
            print(f"  ❌ Serialization failed: {e}")
    
    # Test the queryset filtering
    print("\n" + "=" * 80)
    print("TESTING QUERYSET FILTERING:")
    print("=" * 80)
    
    users = User.objects.all()
    for user in users:
        from django.db.models import Q
        user_bookings = Booking.objects.filter(
            Q(customer=user) | Q(service__provider=user)
        ).select_related('service', 'customer', 'service__provider')
        
        if user_bookings.count() > 0:
            print(f"\nUser: {user.email}")
            print(f"  Bookings as customer: {Booking.objects.filter(customer=user).count()}")
            print(f"  Bookings as provider: {Booking.objects.filter(service__provider=user).count()}")
            print(f"  Total bookings: {user_bookings.count()}")
            
            # Try to serialize all
            try:
                serializer = BookingSerializer(user_bookings, many=True)
                data = serializer.data
                print(f"  ✅ Serialized {len(data)} bookings successfully")
                print(f"  Sample booking keys: {list(data[0].keys()) if data else 'N/A'}")
            except Exception as e:
                print(f"  ❌ Serialization failed: {e}")
                import traceback
                traceback.print_exc()

if __name__ == "__main__":
    debug_bookings()
