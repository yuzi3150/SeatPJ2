# Generated by Django 2.0.1 on 2020-03-29 12:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('racelist', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RaceList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=70)),
            ],
        ),
        migrations.DeleteModel(
            name='WebScraping',
        ),
    ]
