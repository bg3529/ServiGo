#!/usr/bin/env python
"""
Test the bookings API endpoint to verify it returns data correctly
"""

import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.test import RequestFactory
from rest_framework.test import force_authenticate
from services.views import BookingViewSet

User = get_user_model()

def test_api_endpoint():
    print("=" * 80)
    print("TESTING BOOKINGS API ENDPOINT")
    print("=" * 80)
    
    # Get a user with bookings
    user = User.objects.get(email='derekredblack@gmail.com')
    print(f"\nTesting with user: {user.email}")
    
    # Create a mock request
    factory = RequestFactory()
    request = factory.get('/services/bookings/')
    force_authenticate(request, user=user)
    
    # Create viewset and get response
    view = BookingViewSet.as_view({'get': 'list'})
    response = view(request)
    
    print(f"\nResponse Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.data
        print(f"✅ API call successful!")
        print(f"\nNumber of bookings returned: {len(data)}")
        
        if len(data) > 0:
            print(f"\nFirst booking sample:")
            print(json.dumps(data[0], indent=2, default=str))
    else:
        print(f"❌ API call failed!")
        print(f"Response: {response.data}")

if __name__ == "__main__":
    test_api_endpoint()
