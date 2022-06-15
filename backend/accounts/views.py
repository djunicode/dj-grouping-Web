from django.http import JsonResponse
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.sites.shortcuts import get_current_site
from .models import MyUser
from .serializers import *
from .utils import Util
from django.urls import reverse
from django.contrib.auth.models import update_last_login
# from utils.barcodescan import BarcodeScan ###Refer to the utils folder and you'll understand for more info visit this https://www.youtube.com/watch?v=IOhZqmSrjlE

class Registration(generics.CreateAPIView):
    serializer_class=RegistrationSerializer
    def post(self,request,*args,**kwargs):
        if request.method == 'POST':
            serializer = RegistrationSerializer(data = request.data)
            data={}
            if serializer.is_valid():
                my_user = serializer.save()
                # Creating a token which will be changed after E-Mail Verification
                token = Token.objects.get(user = my_user).key
                data['old_token']=token
                # Creating a link to send it to users on E-mail
                current_site = get_current_site(request).domain
                relative_link = reverse('verifyEmail')          
                absurl = current_site + relative_link + "?token="+str(token) 
                #Creation of E-Mail
                email_body = 'Hi ' + 'Use link below to verify your email \n' + absurl  
                data_email = {'email_body': email_body, 'to_email': my_user.email, 'email_subject':'Verify your email'}     
                Util.send_email(data_email)
                return JsonResponse(data=data,status=status.HTTP_201_CREATED)         
            else:
                data=serializer.errors
                return JsonResponse(data=data,status=status.HTTP_400_BAD_REQUEST)

#E-Mail Verification
@api_view(['GET'])
@permission_classes(())
def verifyEmail(request): 
    data = {}
    token = request.GET.get('token')#Fetching the token from request
    try:
        user = MyUser.objects.get(auth_token = token)#Fetching the user based on the fetched token
    except:
        content = {'detail': 'User already activated!'}#If user tries to verify the email again
        return Response(content, status = status.HTTP_200_OK)
    token = request.GET.get('token')
    #Passing the data in Response
    data['response'] = "successfully registered a new user"
    data['email'] = user.email
    data['user_id']=user.user_id
    #Switching the is_active field from false(set as false when user is created) to true after e-mail verification
    if user.is_active == False:
        user.is_active = True
        user.save()
        Token.objects.get(user = user).delete()# Deleting the token created earlier
        Token.objects.create(user = user)#Creaating new token
        new_token = Token.objects.get(user = user).key#Fetching that token
        data['new_token'] = new_token#Passing it in Response
        return Response(data, status=status.HTTP_200_OK)
    else:
        data={'status':'Email is Verified'}#If user has not verified the email
        return Response(data, status=status.HTTP_200_OK)

#View for logging in
class LoginView(generics.CreateAPIView):
    serializer_class=loginSerializer
    def post(self,request):
        if request.method == 'POST':
            serializer = loginSerializer(data = request.data)
            serializer.is_valid(raise_exception = True)#Checking validation of serializer
            user = MyUser.objects.get(email = serializer.data['email'])#Fetching the user from entered email
            token = Token.objects.get(user = user).key#Fetching the token from the fetched user
            update_last_login(None, user) #update last login
            data = {}#Passing the data in Response
            data['email'] = user.email
            data['token'] = token
            data['user_id']=user.user_id
            return Response(data, status = status.HTTP_200_OK)
