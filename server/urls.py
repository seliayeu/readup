from django.urls import path
from . import views
from rest_framework.authtoken import views as restviews

app_name = 'server'
urlpatterns = [
    path('register/', views.RegisterView.as_view(), name="register"),
    path('login/', views.LoginView.as_view(), name="login"),
    #path('users/<int:user_id>/', views.UserView.as_view(), name="user"),
    path('users/<int:user_id>/items/', views.ReadItemsView.as_view(), name="readitems"),
    path('users/<int:user_id>/goals/', views.GoalsView.as_view(), name="goals"),
    #path('users/<int:user_id>/goals/<int:goal_id>/', views.goal, name="goal"),
]