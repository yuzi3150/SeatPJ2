from rest_framework.serializers import ModelSerializer
from mysite.django_app.racelist.models import RaceList

class RaceListSerializer(ModelSerializer):
    class Meta:
        model = RaceList
        fields = ('id', 'full_name','raceTitle','shiba','da','itemTitle','itemTime','itemLong','itemNumber','itemLink')
