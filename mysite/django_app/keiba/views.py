from rest_framework import viewsets

from .serializer import KeibaSerializer
from .models import Keiba


class KeibaViewSet(viewsets.ModelViewSet):
    # ModelViewSetの実装
    queryset = Keiba.objects.all()
    serializer_class = KeibaSerializer
