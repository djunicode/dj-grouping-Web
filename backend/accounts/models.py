from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
# Create User (Arpit), Profile(Arpit), Interests(Om), Ocean(Om)

class UserManager(BaseUserManager):
    use_in_migrations = True

    #For creating user
    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email, and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    #For adding perms to created user
    def create_user(self, email, password=None, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)
    #For creating superuser and adding perms
    def create_superuser(self, email, password, **extra_fields):
        user = self.model(email=email, **extra_fields)
        user.is_active=True
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class MyUser(AbstractUser):
    user_id   = models.AutoField(primary_key=True)
    username  = None
    email     = models.EmailField(max_length=255,unique=True)
    is_active = models.BooleanField(default=True)

    objects  = UserManager()
    
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]
    
    def __str__(self):
        return self.email
