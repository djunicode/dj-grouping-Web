from django.shortcuts import render

# Create your views here.

from .serializers import *

from .models import *
# Create your views here.
#FOR API AND REST_FRAMEWORK
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics


class GroupApi(generics.ListCreateAPIView):
    queryset=Group.objects.all()
    serializer_class=GroupSerializer


class EventsApi(generics.ListCreateAPIView):
    queryset=Events.objects.all()
    serializer_class=EventsSerializer
    def post(self,request):
        serializer= EventsSerializer(data=request.data)
        if serializer.is_valid():
            # get user form request.user
            # get user group from group field of user model
            # after getting that add that group to event field
            serializer.save()
            print(serializer.data['event_id'])
            # get current event
            event= Events.objects.get(event_id=serializer.data['event_id'])
            # THIS IS FOR ALL THE EVENTS REGISTERED BY THE GROUP
            # for all the groups in particular event
            for group in  event.event_groups.all():
                # get the individual group which have registered in the event
                curr_group=AllEventsForGroup.objects.get(group_name=group)
                # adding the event in that particular group
                curr_group.group_events.add(*[event])
            #print(curr_event.event_groups)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response("OP")
class EventsChangeAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset=Events.objects.all()
    serializer_class=EventsSerializer

class AllEventsForGroupAPI(generics.ListCreateAPIView):
    queryset=AllEventsForGroup.objects.all()
    serializer_class=AllEventsForGroupSerializer