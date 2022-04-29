from rest_framework import serializers
from .models import *



class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Group
        fields="__all__"


class EventsSerializer(serializers.ModelSerializer):
    #event_groups=GroupSerializer( read_only=False, many=True)
    class Meta:
        model=Events
        fields=['event_id','event_name','event_desc','event_start_date'
        ,'event_end_date','event_commitee']


class AllEventsForGroupSerializer(serializers.ModelSerializer):
    group_name=GroupSerializer()
    group_events=EventsSerializer( read_only=False ,many=True)
    class Meta:
        model=AllEventsForGroup
        fields="__all__"

class EventRegisterationsSerializer(serializers.ModelSerializer):
    class Meta:
        model=EventRegisterations
        fields="__all__"


class AllEventsForUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=AllEventsForUser
        fields="__all__"
