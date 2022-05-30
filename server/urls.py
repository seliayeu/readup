from django.urls import path
from . import views
from rest_framework.authtoken import views as restviews

app_name = 'server'
urlpatterns = [
    path('register/', views.RegisterView.as_view(), name="register"),
    path('login/', views.LoginView.as_view()),
    #path('<int:user_id>/', views.user, name="user"),
    #path('<int:user_id>/items/', views.readitems, name="readitems"),
    #path('<int:user_id>/goals/', views.goals, name="goals"),
    #path('<int:user_id>/goals/<int:goal_id>/', views.goal, name="goal"),
]