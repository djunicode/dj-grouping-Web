from django.urls import path
from .views import *

urlpatterns=[
    path('register/',Registration.as_view(), name = "registration-view"),
    path('login/',LoginView.as_view(), name = "login"),
    path('email-verify/',verifyEmail, name = "verifyEmail"),
]