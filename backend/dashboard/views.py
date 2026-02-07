from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from services.models import ServiceCategory
from services.serializers import ServiceCategorySerializer
from rest_framework import status, permissions
from django.conf import settings
import google.generativeai as genai

class HomeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        categories = ServiceCategory.objects.all()
        serializer = ServiceCategorySerializer(categories, many=True)
        return Response({
            "categories": serializer.data,
            "user": {
                "username": request.user.username,
                "email": request.user.email,
            }
        })

class ChatBotAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_message = request.data.get('message', '')
        
        if not user_message:
            return Response({"response": "Please enter a message."})

        try:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel('gemini-1.5-flash')
            
            prompt = f"""
            You are ServiGo Assistant, a friendly and helpful AI assistant for a home services marketplace.
            
            User message: "{user_message}"
            
            Please respond helpfully and professionally. If the user is looking for a service, 
            suggest relevant categories or services. If they have a general question, answer it.
            Keep responses concise (2-3 sentences max).
            """
            
            response = model.generate_content(prompt)
            return Response({"response": response.text})
            
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return Response({"response": "Sorry, I'm having trouble connecting right now. Please try again later."})
