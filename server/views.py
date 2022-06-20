from django.http import HttpResponse
import json
from decouple import config
import requests
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import GoalSerializer, ReadItemSerializer, UserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authentication import authenticate, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from server.models import Goal, ReadItem

class RegisterView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        if not email or not password:
            return Response("Email or password missing.", status=400)

        serializer = UserSerializer(data=request.data, context=request)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        Token.objects.create(user=user)

        #return Response(reverse("/"))
        return Response(status=200)

class LoginView(APIView):
    def post(self, request):
        print(request)
        serializer = UserSerializer(data=request.data, context=request)
        serializer.is_valid(raise_exception=True)
        print(serializer.data)
        try:
            email = request.data["email"]
            password = request.data["password"]
        except Exception as e:
            return Response("Email or password missing.", status=400)
        if not email or not password:
            return Response("Email or password missing.", status=400)
        user = authenticate(email=email, password=password)
        print(user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'id': user.id })

class UserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = request.user
        if user.id != user_id:
            return Response("You don't have access to this information.", status=400)

        return Response({ user })

class ReadItemsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = request.user
        if user.id != user_id:
            return Response("You don't have access to this information.", status=400)

        serializer = ReadItemSerializer(list(ReadItem.objects.filter(user__pk=user_id)), many=True)
        return Response(serializer.data)

    def post(self, request, user_id):
        user = request.user
        if user.id != user_id:
            return Response("You don't have access to this information.", status=400)
        data = json.loads(request.body)
        book_resp = requests.get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + str(data["isbn"]) + "&key=" + config("API_KEY"))
        book_data = book_resp.json()["items"][0]

        print(book_data["volumeInfo"]["title"])
        print(book_data["volumeInfo"]["authors"][0])
        return Response()


class ReadItemView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id, item_id):
        user = request.user
        if user.id != user_id:
            return Response("You don't have access to this information.", status=400)
        serializer = ReadItemSerializer(ReadItem.objects.filter(pk=item_id))
        return Response(serializer.data)

    def delete(self, request, user_id, item_id):
        user = request.user
        if user.id != user_id:
            return Response("You don't have access to this information.", status=400)
            
        ReadItem.objects.filter(pk=item_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class GoalsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = request.user
        if user.id != user_id:
            return Response("You don't have access to this information.", status=400)

        serializer = GoalSerializer(list(Goal.objects.filter(user__pk=user_id)), many=True)
        return Response(serializer.data)


class GoalView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id, goal_id):
        user = request.user
        if user.id != user_id:
            return Response("You don't have access to this information.", status=400)

        serializer = GoalSerializer(Goal.objects.filter(pk=goal_id))
        return Response(serializer.data)

    def delete(self, request, user_id, goal_id):
        user = request.user
        if user.id != user_id:
            return Response("You don't have access to this information.", status=400)
            
        Goal.objects.filter(pk=goal_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)