from django.contrib import admin

# Register your models here.
from .models import WebScraping

@admin.register(WebScraping)
class WebScraping(admin.ModelAdmin):
    pass