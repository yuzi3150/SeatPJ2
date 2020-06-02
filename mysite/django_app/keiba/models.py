from django.db import models

class Keiba(models.Model):
    full_name = models.CharField(max_length=70)

    def __str__(self):
        return self.full_name