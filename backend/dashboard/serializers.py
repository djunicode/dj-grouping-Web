from rest_framework import serializers
from .models import *



class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Group
        fields="__all__"


class EventsSerializer(serializers.ModelSerializer):
    event_groups=GroupSerializer(read_only=True, many=True)
    class Meta:
        model=Events
        fields="__all__"


class AllEventsForGroupSerializer(serializers.ModelSerializer):
    group_name=GroupSerializer()
    group_events=EventsSerializer(read_only=True, many=True)
    class Meta:
        model=AllEventsForGroup
        fields="__all__"

