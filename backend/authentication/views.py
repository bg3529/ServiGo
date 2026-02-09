from django.shortcuts import render
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
# from rest_framework.generics import 

class UserRegistrationAPIView(GenericAPIView):
    permission_classes= (AllowAny,)
    authentication_classes = []
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user =serializer.save()
        token=RefreshToken.for_user(user)
        data=serializer.data
        data["tokens"]= {"refresh":str(token),
                         "access":str(token.access_token)}
        
        return Response(data, status=status.HTTP_201_CREATED)

# workings
# POST /register
#    ↓
# Permission check (AllowAny)
#    ↓
# Serializer validation
#    ↓
# User creation (hashed password)
#    ↓
# JWT token generation
#    ↓
# 201 response + tokens
 

class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    authentication_classes = []
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = CustomUserSerializer(user)
        token = RefreshToken.for_user(user)

        data= serializer.data
        data["tokens"]={"refresh":str(token),
                        "access":str(token.access_token)}

        return Response(data, status=status.HTTP_200_OK)


class UserLogoutAPIView(GenericAPIView):
    permission_classes= (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)

            token.blacklist()
            

            return Response(status=status.HTTP_205_RESET_CONTENT)
        
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetEmail(GenericAPIView):
    authentication_classes = []
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        data = {'request': request, 'data': request.data}
        serializer = self.serializer_class(data=request.data)

        # Check if email exists
        if serializer.is_valid(raise_exception=True):
            email = request.data['email']
            if CustomUser.objects.filter(email=email).exists():
                user = CustomUser.objects.get(email=email)
                uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
                token = PasswordResetTokenGenerator().make_token(user)
                
                # In production, use environment variables for domain
                current_site = 'localhost:5173' # Frontend URL // get_current_site(request).domain
                relativeLink = f'/reset-password/{uidb64}/{token}' # Frontend route
                absurl = 'http://'+current_site + relativeLink
                
                email_body = 'Hello, \n Use link below to reset your password  \n' + absurl
                data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Reset your passsword'}

                # Using Django's send_mail for simplicity, or a custom Util
                from django.core.mail import send_mail
                send_mail(
                    data['email_subject'],
                    data['email_body'],
                    'noreply@servigo.com',
                    [data['to_email']],
                    fail_silently=False,
                )
                
            return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)

class PasswordTokenCheckAPI(GenericAPIView):
    authentication_classes = []
    # This view is optionally used by frontend to verify token validity before showing the form
    def get(self, request, uidb64, token):
        try: 
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                 return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_401_UNAUTHORIZED)
            
            return Response({'success': True, 'message': 'Credentials Valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return Response({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_401_UNAUTHORIZED)

class SetNewPasswordAPIView(GenericAPIView):
    authentication_classes = []
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)

class BecomeProviderAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer

    def post(self, request):
        import re
        from services.models import Service, ServiceCategory
        
        user = request.user
        data = request.data
        
        # 1. Update User status
        user.is_provider = True
        user.save()
        
        # 2. Extract and parse data for Service
        category_name = data.get('category', 'Cleaning')
        category, _ = ServiceCategory.objects.get_or_create(name=category_name)
        
        # Parse price (e.g., "$50/hr" -> 50.0)
        price_str = str(data.get('price', '0'))
        price_match = re.search(r'(\d+(?:\.\d+)?)', price_str)
        price = float(price_match.group(1)) if price_match else 0.0
        
        # Determine price unit
        price_unit = 'per hour'
        if '/day' in price_str.lower():
            price_unit = 'per day'
        elif '/service' in price_str.lower():
            price_unit = 'per service'
        elif '/hr' in price_str.lower():
            price_unit = 'per hour'
            
        description = data.get('description', '')
        experience = data.get('experience', '')
        if experience:
            description = f"Experience: {experience}\n\n{description}"
            
        # Get location from profile if possible
        location = "Remote"
        if hasattr(user, 'profile') and user.profile.address:
            location = user.profile.address

        # 3. Create the Service listing
        Service.objects.create(
            provider=user,
            category=category,
            title=data.get('name', f"{user.username}'s Service"),
            description=description,
            price=price,
            price_unit=price_unit,
            location=location,
            is_available=True,
            is_verified=False
        )
        
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
