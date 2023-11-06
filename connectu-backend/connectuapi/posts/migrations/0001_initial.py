# Generated by Django 4.1 on 2023-11-05 08:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=255)),
                ('timestamp', models.DateTimeField(default=datetime.datetime(2023, 11, 5, 14, 13, 5, 876053))),
            ],
            options={
                'verbose_name': 'Posts',
                'verbose_name_plural': 'Posts',
            },
        ),
        migrations.CreateModel(
            name='PostImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(upload_to='posts/')),
            ],
            options={
                'verbose_name': 'Post Images',
                'verbose_name_plural': 'Post Images',
            },
        ),
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('timestamp', models.DateTimeField(default=datetime.datetime(2023, 11, 5, 14, 13, 5, 876053))),
                ('description', models.TextField(blank=True, null=True)),
                ('is_deleted', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Posts',
                'verbose_name_plural': 'Posts',
            },
        ),
    ]