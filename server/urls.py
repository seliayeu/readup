from django.urls import path

from . import views

app_name = 'server'
urlpatterns = [
    path('register/', views.login, name="login"),
    path('login/', views.register, name="register"),
    path('<int:user_id>/', views.user, name="user"),
    path('<int:user_id>/items/', views.readitems, name="readitems"),
    path('<int:user_id>/goals/', views.goals, name="goals"),
    path('<int:user_id>/goals/<int:goal_id>/', views.goal, name="goal"),
]