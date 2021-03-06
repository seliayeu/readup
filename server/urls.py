from django.urls import path
from . import views
from rest_framework.authtoken import views as restviews

app_name = 'server'
urlpatterns = [
    path('register/', views.RegisterView.as_view(), name="register"),
    path('login/', views.LoginView.as_view(), name="login"),
    path('users/<int:user_id>/', views.UserView.as_view(), name="user"),
    path('users/<int:user_id>/books/', views.BooksView.as_view(), name="books"),
    path('users/<int:user_id>/books/<int:book_id>/', views.BookView.as_view(), name="book"),
    path('users/<int:user_id>/goals/', views.GoalsView.as_view(), name="goals"),
    path('users/<int:user_id>/goals/<int:goal_id>/', views.GoalView.as_view(), name="goals"),
]