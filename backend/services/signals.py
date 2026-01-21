from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Review, Service

@receiver(post_save, sender=Review)
def update_service_rating(sender, instance, created, **kwargs):
    """
    Update service rating when a review is saved
    """
    if created:
        service = instance.service
        reviews = service.reviews.all()
        
        if reviews.exists():
            avg_rating = reviews.aggregate(avg=models.Avg('rating'))['avg']
            service.rating = round(avg_rating, 2)
            service.total_reviews = reviews.count()
            service.save()

@receiver(post_delete, sender=Review)
def update_service_rating_on_delete(sender, instance, **kwargs):
    """
    Update service rating when a review is deleted
    """
    service = instance.service
    reviews = service.reviews.all()
    
    if reviews.exists():
        avg_rating = reviews.aggregate(avg=models.Avg('rating'))['avg']
        service.rating = round(avg_rating, 2)
    else:
        service.rating = 0.0
    
    service.total_reviews = reviews.count()
    service.save()