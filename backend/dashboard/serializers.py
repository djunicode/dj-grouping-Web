from dataclasses import field
from rest_framework import serializers
from .models import *

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields='__all__'
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields=['first_name','last_name','branch','year_of_passing',
        'sap_id','mobile_no','bio','profile_pic']
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Group
        fields=["group_id","group_individual","group_name",
        "group_desc","group_members","joining_sap",
        "group_picture"]


class EventsSerializer(serializers.ModelSerializer):
    #event_groups=GroupSerializer( read_only=False, many=True)
    class Meta:
        model=Event
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
        model=EventRegisteration
        fields="__all__"


class AllEventsForUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=AllEventsForUser
        fields="__all__"


class OceanQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=OceanQuestion
        fields='__all__'

class OceanAnswerSerializer(serializers.ModelSerializer):
    # quesinst = OceanQuestionSerializer()
    class Meta:
        model=OceanAnswer
        fields='__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserProfile
        fields='__all__'

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model=Interest
        fields=['name']

class GroupSuggestedSerializer(serializers.ModelSerializer):
    class Meta:
        model=GroupSuggestions
        fields="__all__"

class UserSuggestedSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserSuggested
        fields="__all__"

class UserJoinedSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserJoined
        fields="__all__"