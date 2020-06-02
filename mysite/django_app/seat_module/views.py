import json
import urllib3
from bs4 import BeautifulSoup
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
# from mysite.django_app.seat.models import Seat

@api_view(['GET'])
def retrieveSeat(request):
    pass
    # queryset = Seat.objects.all().order_by('seat_id')
