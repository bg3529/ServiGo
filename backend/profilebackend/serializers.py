from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField(source='user.email')
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = UserProfile
        fields = ('id', 'full_name', 'phone', 'address', 'profile_image', 'email', 'username')
        read_only_fields = ('id', 'email', 'username')

    def validate_full_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Full name cannot be empty.")
        if len(value) < 2:
            raise serializers.ValidationError("Full name must be at least 2 characters long.")
        return value

    def validate_phone(self, value):
        if value and not value.strip():
            return "" # Allow empty if it was already empty but don't allow just whitespace
        if value and not any(char.isdigit() for char in value):
            raise serializers.ValidationError("Phone number must contain digits.")
        return value
