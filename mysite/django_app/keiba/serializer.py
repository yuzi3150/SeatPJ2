from rest_framework.serializers import ModelSerializer
from .models import Keiba

class KeibaSerializer(ModelSerializer):
    class Meta:
        model = Keiba
        fields = ('id', 'full_name')

