from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit

from random import choice


# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("Users must have an username")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)

        user.set_password(password)

        user.save()

        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields["is_staff"] = True
        extra_fields["is_superuser"] = True

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=125)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField()
    date_joined = models.DateTimeField(auto_now_add=True)

    avatar = ProcessedImageField(upload_to='avatar', processors=[ResizeToFit(100, 100)], format='JPEG',
                             options={'quality': 60}, blank=True)

    objects = UserManager()

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "name"]

    def __str__(self):
        return self.username
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        print(self.pk)
        if not self.avatar:
            random_image_path = f"/default/avatar/default_avatar_{self.id % 3}.svg"
            self.avatar = random_image_path
        super().save(*args, **kwargs)
