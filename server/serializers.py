from server.models import Book, Goal, User
from rest_framework import serializers
from django.utils import timezone

class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password', 'placeholder': 'Password'})
    created = serializers.DateField(required=False)
    updated = serializers.DateField(required=False)
    experience = serializers.IntegerField(required=False)
    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['id', 'email', 'created', 'experience', 'updated', 'password']
        read_only_field = ['created', 'updated']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class BookSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=100)
    author = serializers.CharField(max_length=100)
    thumbnail_link = serializers.URLField(max_length=200)
    user = serializers.ReadOnlyField(source="user.id")
    created = serializers.DateTimeField(required=False)
    isbn = serializers.CharField(max_length=100)
    id = serializers.ReadOnlyField()

    class Meta:
        model = Book 
        fields = ('id', 'isbn', 'title', 'author', 'user','created', 'thumbnail_link')
    
    def create(self, validated_data):
        validated_data["created"] = timezone.now()
        print(validated_data.user)
        return Book.objects.create(**validated_data)


class GoalSerializer(serializers.ModelSerializer):
    goal = serializers.IntegerField()
    count = serializers.IntegerField()
    user = serializers.ReadOnlyField(source="user.id")
    created = serializers.DateTimeField()
    id = serializers.ReadOnlyField()

    class Meta:
        model = Goal
        fields = ['id', 'goal', 'count', 'user', 'created']