# Generated by Django 4.0.4 on 2022-06-26 02:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0013_book_remove_goal_website_count_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='goal',
            old_name='book_count',
            new_name='count',
        ),
        migrations.RenameField(
            model_name='goal',
            old_name='book_goal',
            new_name='goal',
        ),
    ]
