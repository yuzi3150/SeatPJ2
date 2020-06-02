from django.urls import path
from . import views

urlpatterns = [
    path('', views.retrieveRaceList, name='retrieveRaceList'),
]

