# Generated by Django 2.0.1 on 2020-05-30 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Seat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=70)),
                ('seat_id', models.CharField(max_length=100)),
            ],
        ),
    ]
