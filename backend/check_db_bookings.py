import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from services.models import Booking
from django.contrib.auth import get_user_model

User = get_user_model()

print("Checking users and bookings...")
for user in User.objects.all():
    print(f"User: {user.username} (ID: {user.id})")
    bookings = Booking.objects.filter(customer=user)
    count = bookings.count()
    print(f"  Bookings count: {count}")
    for booking in bookings:
        print(f"    - ID: {booking.id}, Service: {booking.service.title}, Status: {booking.status}")
