from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id","username","email")

class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model=CustomUser
        fields = ("id","username","email","password1","password2")
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

        return CustomUser.objects.create_user(password=password,**validate_data)


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
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise serializers.ValidationError('The reset link is invalid', 401)
        