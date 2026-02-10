import os
import django
from django.utils import timezone
import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from services.models import Service, Booking, AvailabilitySlot
from django.contrib.auth import get_user_model

User = get_user_model()

# Get a test user (customer) and a service
try:
    # Assuming 'derek' or another user exists from previous check
    customer = User.objects.first() 
    if not customer:
        print("No users found to make a booking.")
        exit()
        
    # Get a service
    service = Service.objects.filter(is_available=True).first()
    if not service:
        print("No available services found.")
        exit()

    print(f"Attempting to book service '{service.title}' for user '{customer.username}'...")

    # Calculate a future time
    booking_time = timezone.now() + datetime.timedelta(days=1)
    
    # Create booking
    booking = Booking.objects.create(
        customer=customer,
        service=service,
        booking_date=booking_time,
        duration=2,
        total_price=service.price * 2,
        notes="Test booking from script",
        customer_address="123 Test St",
        contact_phone="1234567890",
        status='pending'
    )
    
    print(f"Booking created successfully! ID: {booking.id}")
    print(f"Status: {booking.status}")

except Exception as e:
    print(f"Error creating booking: {e}")
