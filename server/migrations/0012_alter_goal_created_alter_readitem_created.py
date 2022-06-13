# Generated by Django 4.0.4 on 2022-06-13 20:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0011_goal_created_readitem_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goal',
            name='created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='readitem',
            name='created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
