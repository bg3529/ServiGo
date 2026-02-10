import os
import django
from django.utils import timezone
import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from services.models import Booking, Service
from django.contrib.auth import get_user_model

User = get_user_model()

try:
    derek = User.objects.get(username='derek') # Or email 'derekredblack@mail.com'
    print(f"Found user: {derek.username}")
    
    # Get a service
    service = Service.objects.first()
    if not service:
        print("No services found to book.")
        exit()
        
    print(f"Booking service: {service.title}")
    
    booking = Booking.objects.create(
        customer=derek,
        service=service,
        booking_date=timezone.now() + datetime.timedelta(days=2),
        duration=2,
        total_price=service.price * 2,
        status='pending',
        notes="Test booking created via script"
    )
    print(f"Created booking ID: {booking.id}")

except User.DoesNotExist:
    print("User 'derek' not found.")
except Exception as e:
    print(f"Error: {e}")
