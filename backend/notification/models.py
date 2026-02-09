from django.db import models
from authentication.models importKW CustomUser

class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ('booking_status', 'Booking Status Update'),
        ('new_message', 'New Message'),
        ('system_alert', 'System Alert'),
        ('promotion', 'Promotion'),
    )

    recipient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='sent_notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES, default='system_alert')
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    related_link = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']
        app_label = 'notification'

    def __str__(self):
        return f"{self.title} - {self.recipient.username}"
