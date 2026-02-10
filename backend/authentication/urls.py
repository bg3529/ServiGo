from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns=[
    path("register/",UserRegistrationAPIView.as_view(),name="register-user"),
    path("login/",UserLoginAPIView.as_view(),name="login-user"),
    path("logout/",UserLogoutAPIView.as_view(),name="logout-user"),
    path("token/refresh/",TokenRefreshView.as_view(), name="token-refresh"),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('get-security-question/', GetSecurityQuestionAPIView.as_view(), name="get-security-question"),
    path('verify-security-answer/', VerifySecurityAnswerAPIView.as_view(), name="verify-security-answer"),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
    path('become-provider/', BecomeProviderAPIView.as_view(), name='become-provider'),
]
