from .models import User, UserManager
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(default="Reader")
    email = serializers.CharField()
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password', 'placeholder': 'Password'})
    created = serializers.DateField(required=False)
    updated = serializers.DateField(required=False)

    class Meta:
        model = User
        fields = ['id', 'display_name', 'email', 'created', 'experience', 'updated', 'password']
        read_only_field = ['created', 'updated']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)