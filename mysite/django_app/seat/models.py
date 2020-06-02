from django.db import models

class Seat(models.Model):
    user_name = models.CharField(max_length=70,blank=True,null=True)
    seat_id = models.CharField(max_length=100)
    seat_code= models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_name

