from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid 

class CustomUser(AbstractUser):
    id = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)
    email=models.EmailField(unique=True) # prevents dupicate accounts
    USERNAME_FIELD="email"
    REQUIRED_FIELDS=["username"]

    def __str__(self)->str:
        return self.email