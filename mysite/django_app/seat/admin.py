from django.contrib import admin

# Register your models here.
from .models import Seat

@admin.register(Seat)
class Seats(admin.ModelAdmin):
    pass

