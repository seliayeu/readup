from server.models import Goal, ReadItem, User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(default="Reader")
    email = serializers.CharField()
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password', 'placeholder': 'Password'})
    created = serializers.DateField(required=False)
    updated = serializers.DateField(required=False)
    id = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['id', 'display_name', 'email', 'created', 'experience', 'updated', 'password']
        read_only_field = ['created', 'updated']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class ReadItemSerializer(serializers.ModelSerializer):
    item_type = serializers.ChoiceField([("BK", "Book"), ("WB", "Website")])
    address = serializers.CharField(max_length=100)
    user = serializers.ReadOnlyField(source="user.id")
    created = serializers.DateTimeField()
    id = serializers.ReadOnlyField()

    class Meta:
        model = ReadItem 
        fields = ('id', 'item_type','address','user','created')


class GoalSerializer(serializers.ModelSerializer):
    website_goal = serializers.IntegerField()
    website_count = serializers.IntegerField()
    book_goal = serializers.IntegerField()
    book_count = serializers.IntegerField()
    user = serializers.ReadOnlyField(source="user.id")
    created = serializers.DateTimeField()
    id = serializers.ReadOnlyField()

    class Meta:
        model = Goal
        fields = ['id', 'website_goal','website_count','book_goal', 'book_count', 'user', 'created']