from .models import CustomUser
from profilebackend.models import UserProfile
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

class CustomUserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='profile.full_name', read_only=True)
    phone = serializers.CharField(source='profile.phone', read_only=True)
    address = serializers.CharField(source='profile.address', read_only=True)
    profile_image = serializers.ImageField(source='profile.profile_image', read_only=True)

    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "is_provider", "full_name", "phone", "address", "profile_image")

class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    full_name = serializers.CharField(required=False, allow_blank=True, write_only=True)
    phone = serializers.CharField(required=False, allow_blank=True, write_only=True)
    address = serializers.CharField(required=False, allow_blank=True, write_only=True)
    security_question = serializers.ChoiceField(choices=UserProfile.SECURITY_QUESTIONS, required=True, write_only=True)
    security_answer = serializers.CharField(required=True, write_only=True)

    class Meta:
        model=CustomUser
        fields = ("id","username","email","password1","password2", "is_provider", "full_name", "phone", "address", "security_question", "security_answer")
        extra_kwargs={"password":{"write_only":True}}


    def validate(self, attrs):
        if attrs['password1']!=attrs['password2']:
            raise serializers.ValidationError("Password do not match!")
        password= attrs.get("password1","")
        if len(password)<8:
            raise serializers.ValidationError("Password must be at least 8 characters")
        return attrs
    
    def create(self, validate_data):
        password=validate_data.pop("password1")
        validate_data.pop("password2")
        
        full_name = validate_data.pop("full_name", "")
        phone = validate_data.pop("phone", "")
        address = validate_data.pop("address", "")
        security_question = validate_data.pop("security_question", "")
        security_answer = validate_data.pop("security_answer", "")

        user = CustomUser.objects.create_user(password=password,**validate_data)
        
        # Create profile for the new user
        UserProfile.objects.create(
            user=user,
            full_name=full_name,
            phone=phone,
            address=address,
            security_question=security_question,
            security_answer=security_answer
        )
        
        return user


class UserLoginSerializer(serializers.Serializer):
    email=serializers.CharField()
    password=serializers.CharField(write_only=True)


    def validate(self, data):
        user = authenticate(**data)
        
        if user and user.is_active:
            return user

        raise serializers.ValidationError("Incorrect Credentials!")

class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ['email']

class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        password = attrs.get('password')
        token = attrs.get('token')
        uidb64 = attrs.get('uidb64')

        try:
            id = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(id=id)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            raise serializers.ValidationError({'message': 'Invalid reset link or user not found'})

        if not PasswordResetTokenGenerator().check_token(user, token):
            raise serializers.ValidationError({'message': 'The reset link is invalid or has expired'})

        user.set_password(password)
        user.save()

        return user
        