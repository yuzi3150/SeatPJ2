from rest_framework.serializers import ModelSerializer
from .models import Seat

class SeatSerializer(ModelSerializer):
    class Meta:
        model = Seat
        fields = ('id', 'seat_id','user_name','seat_code','created_at','updated_at')

