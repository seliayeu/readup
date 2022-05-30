from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authentication import authenticate


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
        return Response({'token': token.key})