# Generated by Django 5.1 on 2024-09-26 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_doctor',
            field=models.BooleanField(default=False),
        ),
    ]
