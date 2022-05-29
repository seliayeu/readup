from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.shortcuts import redirect
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

class LoginView(APIView):
    def post(self, request):
        try:
            email = request.data["email"]
            password = request.data["password"]
        except KeyError:
            return Response("Missing email or password.", status=400)
        
        if not email or not password:
            return Response("Email or password isn't set.", status=400)

        user = authenticate(email=email, password=password)

class RegisterView(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]