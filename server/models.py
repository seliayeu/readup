from enum import Enum
from django.db import models 
from django.urls import reverse
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password, display_name="Reader", profile_picture=None):
        if not email:
            raise ValueError("Email address must be set.")
        if not password:
            raise ValueError("Password must be set.")
        
        user = self.model(
            display_name=display_name, 
            email=self.normalize_email(email),
            profile_picture=profile_picture,
            experience=0
        )
        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_superuser(self, email, password, display_name="Admin Reader", profile_picture=None):
        user = self.create_user(email, password, display_name, profile_picture)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        
        return user

class User(AbstractBaseUser, PermissionsMixin):
    
    display_name = models.CharField(max_length=16)
    email = models.EmailField(unique=True, verbose_name="email address", max_length=255)
    profile_picture = models.BinaryField()

    # experience = LongField(required=True)
    # goals = ListField(Goal())
    # read_list = ListField(ReadItem())

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['display_name', 'experience']

    objects = UserManager()
    
