from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'dpslay_name', 'email', 'profile_picture', 'created', 'updated']
        read_only_field = ['created', 'updated']
