# Generated by Django 2.0.1 on 2020-06-01 02:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('seat', '0008_seat_seat_test'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seat',
            name='seat_test',
        ),
    ]
