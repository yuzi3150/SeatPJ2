from rest_framework import routers

from .views import KeibaViewSet

router = routers.DefaultRouter()
router.register(r'', KeibaViewSet,basename='keiba')


