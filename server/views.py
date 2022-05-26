from django.http import HttpResponse
from django.shortcuts import redirect
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm

def register(request):
    if request.method == 'POST':
        return HttpResponse(request)
        