from django.contrib import admin

# Register your models here.
from .models import Keiba

@admin.register(Keiba)
class Keiba(admin.ModelAdmin):
    pass