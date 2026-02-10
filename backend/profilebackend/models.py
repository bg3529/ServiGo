from django.db import models
from django.conf import settings

class UserProfile(models.Model):
    SECURITY_QUESTIONS = [
        ('mother_maiden', "What is your mother's maiden name?"),
        ('first_pet', "What was the name of your first pet?"),
        ('first_school', "What was the name of your first school?"),
        ('birth_city', "In what city were you born?"),
        ('favorite_book', "What is your favorite book?"),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    security_question = models.CharField(max_length=50, choices=SECURITY_QUESTIONS, blank=True, null=True)
    security_answer = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.user.email}'s profile"
