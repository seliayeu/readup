# Generated by Django 4.0.4 on 2022-05-29 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0005_alter_user_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.BinaryField(default=b''),
        ),
    ]