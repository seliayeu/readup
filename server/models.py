from email.policy import default
import validators
from enum import Enum
from django.utils import timezone
from django.db import models
from django.forms import IntegerField 
from django.urls import reverse
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def create_user(self, email, password, display_name="Reader", profile_picture=bytes(0)):
        if not email:
            raise ValueError("Email address must be set.")
        if not password:
            raise ValueError("Password must be set.")
        
        user = self.model(
            display_name=display_name, 
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_superuser(self, email, password, display_name="Admin Reader"):
        user = self.create_user(email, password, display_name)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        
        return user

class User(AbstractBaseUser, PermissionsMixin):
    display_name = models.CharField(max_length=16)
    email = models.EmailField(unique=True, verbose_name="email address", max_length=255)
    # profile_picture = models.CharField()
    created = models.DateField(default=timezone.now)
    updated = models.DateField(default=timezone.now)
    experience = models.IntegerField(default=0)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['display_name']

    objects = UserManager()
    
class ReadItem(models.Model):
    class ItemType(models.TextChoices):
        BOOK = 'BK', _("Book")
        WEBSITE = 'WB', _("Website")

    item_type = models.CharField(max_length=2, choices=ItemType.choices)
    address = models.CharField(max_length=100)
    created = models.DateTimeField(default=timezone.now)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def is_valid_isbn10(self, isbn):
        isbn = isbn.replace("-", "")

        if len(isbn) != 10: return False
        if not (isbn[:9].isnumeric() and isbn[9] == "X" or isbn[9].isnumeric()):
            return False

        res = 0

        for i in range(9):
            res += int(isbn[i]) * (10 - i)
        res += 10 if isbn[9] == "X" else int(isbn[9])
        return (res % 11) == 0

    def is_valid_url(self, url):
        return validators.url(url) is True

class Goal(models.Model):
    website_goal = models.IntegerField()
    website_count = models.IntegerField()
    book_goal = models.IntegerField()
    book_count = models.IntegerField()
    created = models.DateTimeField(default=timezone.now)

    user = models.ForeignKey(User, on_delete=models.CASCADE)