from rest_framework import generics, permissions
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Return the profile of the current authenticated user
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile

    def perform_update(self, serializer):
        # Handle email update if provided
        email = self.request.data.get('email')
        username = self.request.data.get('username')
        user = self.request.user
        
        from django.contrib.auth import get_user_model
        User = get_user_model()
        
        if email:
            # Check if email is already taken by another user
            if User.objects.filter(email=email).exclude(id=user.id).exists():
                from rest_framework.exceptions import ValidationError
                raise ValidationError({"email": ["This email is already in use by another account."]})
            user.email = email
            
        if username:
            # Check if username is already taken by another user
            if User.objects.filter(username=username).exclude(id=user.id).exists():
                from rest_framework.exceptions import ValidationError
                raise ValidationError({"username": ["This username is already taken."]})
            user.username = username
            
        if email or username:
            user.save()
            
        serializer.save()
