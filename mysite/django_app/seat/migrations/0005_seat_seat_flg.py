# Generated by Django 2.0.1 on 2020-05-31 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seat', '0004_auto_20200531_0329'),
    ]

    operations = [
        migrations.AddField(
            model_name='seat',
            name='seat_flg',
            field=models.BooleanField(default=False),
        ),
    ]
