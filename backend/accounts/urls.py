from django.urls import path
from . import views

urlpatterns=[
    path('register/',views.Registration.as_view(), name = "registration-view"),
    path('login/',views.LoginView.as_view(), name = "login"),
    path('email-verify/',views.verifyEmail, name = "verifyEmail"),
]