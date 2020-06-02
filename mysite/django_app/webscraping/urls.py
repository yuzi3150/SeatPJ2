from django.urls import path
from rest_framework import routers
# from .views import WebScrapingViewSet
from . import views
# router = routers.DefaultRouter()
# router.register(r'', WebScrapingViewSet,basename='webscraping')

urlpatterns = [
    path('', views.execute, name='execute'),
]

