from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from services.models import ServiceCategory
from services.serializers import ServiceCategorySerializer

class HomeView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = ServiceCategory.objects.filter(is_active=True).order_by('name')
        serializer = ServiceCategorySerializer(categories, many=True)
        
        return Response({
            'categories': serializer.data,
            'hero_title': 'Quality services, on demand',
            'hero_subtitle': 'Find the best student housing, tutors, and professionals in Dhulikhel.'
        })
