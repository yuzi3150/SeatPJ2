from django.contrib import admin

# Register your models here.
from .models import RaceList

@admin.register(RaceList)
class RaceLists(admin.ModelAdmin):
    pass
