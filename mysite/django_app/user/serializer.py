from rest_framework.serializers import ModelSerializer



from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name')

    # def create(self, validated_data):
    #     user = User.objects.create_user(
    #         name=validated_data['name']
    #     )
    #     return user