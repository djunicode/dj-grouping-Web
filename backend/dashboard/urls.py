from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('group/',views.GroupApi.as_view()),
    path('events/',views.EventsApi.as_view()),
    path('groupevents/',views.AllEventsForGroupAPI.as_view()),
    path('changeevent/<str:pk>',views.EventsChangeAPI.as_view()),
]
