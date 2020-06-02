from rest_framework.serializers import ModelSerializer
from .models import WebScraping

class WebScrapingSerializer(ModelSerializer):
    class Meta:
        model = WebScraping
        fields = ('id', 'full_name')

