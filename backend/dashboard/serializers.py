import re
from tokenize import group
from django.http import JsonResponse
from rest_framework import serializers
from .models import *

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields='__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Group
        fields="__all__"


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

class UserRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserGroupRequest
        fields='__all__'


class UserGroupRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=UserGroupRequest
        fields='__all__'
    
    def accept(self, validated_data):
        try:
            request = UserGroupRequest.objects.get(user = validated_data['user'].pk, group = validated_data['group'].group_id)
            group = Group.objects.get(group_id = validated_data['group'].group_id)
            user = UserProfile.objects.get(pk = validated_data['user'].pk)
            print(request.join)
            if not request.join:
                group.group_individual.add(user)
                group.save()
                request.delete()
                return group
            else:
                return {
                    "error": "Bad Request"
                }
        except:
            return {
                "error": "Requested User or Group is not present"
            }

    def reject(self, validated_data):
        try:
            request = UserGroupRequest.objects.get(user = validated_data['user'].pk, group = validated_data['group'].group_id)
            group = Group.objects.get(group_id = validated_data['group'].group_id)
            user = UserProfile.objects.get(pk = validated_data['user'].pk)
            if not request.join:
                request.delete()
                return group
            else:
                return {
                    "error": "Bad Request"
                }
        except:
            return {
                "error": "Requested User or Group is not present"
            }