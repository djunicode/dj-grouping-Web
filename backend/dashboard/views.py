from wsgiref.util import request_uri
from django.shortcuts import render

# Create your views here.
from accounts.models import MyUser

from .serializers import *
from django.http import Http404, JsonResponse
from rest_framework import mixins

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
    queryset=Event.objects.all()
    serializer_class=EventsSerializer
    
class EventsChangeAPI(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    
    queryset = Event.objects.all()
    serializer_class = EventsSerializer

    def get(self, request, *args, **kwargs):
        
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        #print(request.user)
        
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    

class AllEventsForGroupAPI(generics.ListCreateAPIView):
    queryset=AllEventsForGroup.objects.all()
    serializer_class=AllEventsForGroupSerializer
    
class AllEventsForUserAPI(generics.ListCreateAPIView):
    queryset=AllEventsForUser.objects.all()
    serializer_class=AllEventsForUserSerializer

class EventRegisterationsAPI(generics.ListCreateAPIView):
    queryset=EventRegisteration.objects.all()
    serializer_class=EventRegisterationsSerializer
    def post(self,request):
        serializer=EventRegisterationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            # TO GET CURRENT EVENT REGISTERATION
            curr_er=EventRegisteration.objects.get(er_id=serializer.data['er_id'])
            # TO GET CURRENT USER
            curr_user_id=serializer.data['us_id']
            curr_user=MyUser.objects.get(user_id=int(curr_user_id))
            # SETTING USER IN THE MODEL
            curr_er.user=curr_user
            # TO GET THE GRP NAME
            curr_grp_name=serializer.data['grp_name']
            # TO GET CURRENT GROUP OBJECT
            curr_grp=Group.objects.get(group_name=curr_grp_name)
            # SETTING IT
            curr_er.group=curr_grp
            # TO GET CURRENT EVENT 
            curr_eve_id=serializer.data['eve_id']
            curr_eve=Event.objects.get(event_id=int(curr_eve_id))
            # SETTING IN THAT EVENT THAT PARTICULAR GROUP
            curr_eve.event_groups.add(*[curr_grp])
            curr_er.event=curr_eve
            # TO ADD THAT EVENT IN THAT PARTICULAR GROUP
            curr_aefg=AllEventsForGroup.objects.get(group_name=curr_grp)
            curr_aefg.group_events.add(*[curr_eve])
            # TO ADD EVENT IN THAT INDIVIDUAL 
            for each_individual in curr_grp.group_individual.all():
                AllEventsForUser.objects.get(user_name=each_individual).group_events.add(*[curr_eve])
            curr_er.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)




### OCEAN APIS

class OceanQuestionsView(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = OceanQuestion.objects.all()
    serializer_class = OceanQuestionSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request,*args,**kwargs)

class OceanAnswersView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = OceanAnswerSerializer

    def get_queryset(self):
        user_pro = UserProfile.objects.get(sap_id=self.kwargs['sap'])
        return OceanAnswer.objects.filter(user=user_pro)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    

class UserProfileAPI(generics.ListCreateAPIView):
    queryset=UserProfile.objects.all()
    serializer_class=UserProfileSerializer

class UserProfileUpdateAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset=UserProfile.objects.all()
    serializer_class=UserProfileSerializer

class InterestAPI(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = InterestSerializer
    
    def get_queryset(self):
        user_pro = UserProfile.objects.get(sap_id=self.kwargs['sap'])
        return Interest.objects.filter(user = user_pro)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        names = request.data['name']
        user_pro = UserProfile.objects.get(sap_id=self.kwargs['sap'])
        for name in names:
            interest = Interest(user=user_pro, name=name)
            interest.save()
        return JsonResponse({'status':'created'}, status=status.HTTP_201_CREATED)

class UserRequestsView(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = UserRequestSerializer

    def get_queryset(self):
        return UserGroupRequest.objects.filter(user = self.kwargs['user_id'])
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class UserGroupRequestView(mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = UserGroupRequestSerializer
    queryset = UserGroupRequest.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = UserGroupRequestSerializer(data = request.data)
        if serializer.is_valid():
            temp = dict(serializer.validated_data)
            if temp['join']:
                serializer.accept(serializer.validated_data)
                return JsonResponse({'status':'Group request accepted'}, status=status.HTTP_200_OK)
            else:
                serializer.reject(serializer.validated_data)
                return JsonResponse({'status':'Group request rejected'}, status=status.HTTP_200_OK)
        return JsonResponse({'error':'Server Problem'}, status=status.HTTP_400_BAD_REQUEST)