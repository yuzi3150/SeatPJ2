from rest_framework import serializers
from .models import Todo

# Serializerは「Modelをどのようにシリアライズ(・デシリアライズ)するかを決めるためのもの」
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'created_at')