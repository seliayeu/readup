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
    def create_user(self, email, password):
        if not email:
            raise ValueError("Email address must be set.")
        if not password:
            raise ValueError("Password must be set.")
        
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name="email address", max_length=255)
    created = models.DateField(default=timezone.now)
    updated = models.DateField(default=timezone.now)
    experience = models.IntegerField(default=0)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    objects = UserManager()
    
class Book(models.Model):
    isbn = models.CharField(max_length=100)
    created = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    thumbnail_link = models.URLField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Goal(models.Model):
    goal = models.IntegerField()
    count = models.IntegerField()
    created = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)