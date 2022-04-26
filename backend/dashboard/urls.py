from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path('group/',GroupApi.as_view()),
    path('events/',EventsApi.as_view()),
    path('groupevents/',AllEventsForGroupAPI.as_view()),
    path('individualevents/',AllEventsForUserAPI.as_view()),
    path('changeevent/<str:pk>/',EventsChangeAPI.as_view()),
    path('eventregisterations/',EventRegisterationsAPI.as_view()),
    path('oceanques/',OceanQuestionsView.as_view()),
    path('oceanans/<str:sap>/',OceanAnswersView.as_view()),
]
