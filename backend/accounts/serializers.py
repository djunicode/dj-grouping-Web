from rest_framework import serializers
from .models import *
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate, login
#Create your serializers here
#Serializer of MyUser Model
class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = MyUser
        fields = ['user_id','email',]
        
#Serializer for RegistrationView
class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = MyUser
        fields = ['email','password']
        extra_kwargs = {'password': {'write_only': True}}#Added for Password Hashing

    #For creating a user with this entered data
    def create(self, validated_data):
        user = MyUser(
            email = validated_data['email'],
        )
        user.set_password(validated_data['password'])#For setting a password
        user.save()#For saving a user
        return user

#Serializer for LoginView
class loginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    class Meta:
        model = MyUser
        fields = ['email', 'password','user_id',]
    #Checking the credentials while logging in
    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        user = authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        #If user has not verified the email 
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        return {'email': user.email}
