from django.urls import path
from .views import SeatViewSet
from .import views
from rest_framework import routers

# urlpatterns = [
#     path('retrieveAllSeat', views.retrieveAllSeat, name='retrieveAllSeat'),
# ]
router = routers.DefaultRouter()
router.register(r'', SeatViewSet,basename='seat')

