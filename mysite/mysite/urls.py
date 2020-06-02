from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path

from mysite.to_do import urls

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
    # url(r'^api/', include(urls)),

]