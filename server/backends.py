from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.core.exceptions import ValidationError

User = get_user_model()

class UserModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if not username:
            username = kwargs.get(User.USERNAME_FIELD)
        if username is None or password is None:
            return
        try:
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            raise ValidationError("Failed to log in: user does not exist or password is invalid.")
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
            else:
                raise ValidationError("Failed to log in: user does not exist or password is invalid.")