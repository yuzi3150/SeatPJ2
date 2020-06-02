from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.decorators import action

from mysite.django_app.webscraping.modules.main_web_scraping import MainWebScraping
from .models import WebScraping
from .serializer import WebScrapingSerializer

def execute(request):
    return HttpResponse("Hello, world. You're at the polls execute.")

class WebScrapingViewSet(viewsets.ModelViewSet):
    # ModelViewSetの実装
    queryset = WebScraping.objects.all()
    serializer_class = WebScrapingSerializer

    @action(methods=['get'], detail=True)
    def execute(self, request, pk):
        mainWebScraping=MainWebScraping()

        mainWebScraping.execute('','','')

