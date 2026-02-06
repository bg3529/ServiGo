from rest_framework import serializers
from services.serializers import ServiceCategorySerializer

class HomeDataSerializer(serializers.Serializer):
    categories = ServiceCategorySerializer(many=True)
    # can add featured_services or stats here later
