from django.urls import path
from .views import HomeView, ChatBotAPIView

urlpatterns = [
    path('home/', HomeView.as_view(), name='dashboard-home'),
    path('chat/', ChatBotAPIView.as_view(), name='dashboard-chat'),
    path('chat/', ChatBotAPIView.as_view(), name='dashboard-chat'),
]
