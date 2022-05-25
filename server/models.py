from enum import Enum
from django.db import models 
from mongoengine import StringField, ImageField, LongField, ListField, EnumField, IntField
from django.urls import reverse


class Goal(models.Model):
    goal_name = StringField(required=True, max_length=16)
    book_goal = IntField(required=True)
    site_goal = IntField(required=True)
    book_curr = IntField(required=True, default=0)
    site_curr = IntField(required=True, default=0)

class ItemType(Enum):
    BOOK = 'book'
    WEBSITE = 'website'

class ReadItem(models.Model):
    item_type = EnumField(ItemType, required=True)
    identifier = StringField(required=True)

class UserData(models.Model):
    display_name = StringField(required=True, max_length=16)
    profile_picture = ImageField(size=(1000,1000,True))
    experience = LongField(required=True)
    goals = ListField(Goal())
    read_list = ListField(ReadItem())