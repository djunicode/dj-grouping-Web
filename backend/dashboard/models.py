
from asyncio.windows_events import NULL
from enum import Enum
from django.db import models
from datetime import datetime
from accounts.models import MyUser
from phonenumber_field.modelfields import PhoneNumberField
from PIL import Image
from pyzbar.pyzbar import decode
from django.db.models.signals import post_save, pre_save
###Imports for auth Token
from django.conf import settings
from rest_framework.authtoken.models import Token
import os
from PIL import Image
# Create your models here.

# Create Groups(Tanish), Events(Tanish)

#post_save
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

from django.utils.deconstruct import deconstructible

@deconstructible
class PathAndRename(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        filename = '{}{}{}.{}'.format(instance.first_name,instance.last_name,instance.year_of_passing,ext)
        return os.path.join(self.path, filename)



class UserProfile(models.Model):
    user            = models.OneToOneField(MyUser,on_delete=models.CASCADE)
    first_name      = models.CharField(max_length=250)
    last_name       = models.CharField(max_length=250 )
    branch          = models.CharField(max_length=250)
    year_of_passing = models.IntegerField()
    sap_id          = models.CharField(max_length=12,blank=True,null=True)
    mobile_no       = PhoneNumberField(null=False,blank=False,unique=True)
    profile_pic     = models.ImageField(upload_to=PathAndRename('profile/'),default='profile/default.jpg')
    barcode         = models.ImageField(upload_to=PathAndRename('barcode/'),blank=True,null=True)
    bio             = models.TextField()

    def __str__(self):
        return self.first_name+self.last_name


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

@receiver(post_save, sender = UserProfile)
def verify_student(sender,instance,created,*args,**kwargs):
    img = Image.open("media/barcode/{}{}{}.jpeg".format(instance.first_name,instance.last_name,instance.year_of_passing))
    b=str(decode(img)[0][0])[3:14]
    if instance.sap_id!=b:
        instance.sap_id=b
        instance.save()


class Interest(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    name = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class OceanQuestion(models.Model):
    traits = (
        ('Open', "Openness"),
        ('Agg', "Agreeableness"),
        ('Ext', "Extraversion")
    )
    persontrait = models.TextField(choices=traits)
    weight = models.IntegerField()
    question = models.TextField()

    def __str__(self):
        return (self.persontrait + str(self.pk))

class OceanAnswer(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    answer = models.IntegerField()
    quesinst = models.OneToOneField(OceanQuestion, on_delete=models.CASCADE)



class Group(models.Model):
    group_individual=models.ManyToManyField(UserProfile,blank=True)
    group_id= models.AutoField(primary_key=True)
    group_name= models.CharField(max_length=255,blank=False, unique=True)
    group_desc=models.CharField(max_length=255)
    group_members=models.IntegerField(default=4)
    joining_sap=models.IntegerField(default=100)
    group_picture=models.ImageField (upload_to=PathAndRename('images/'),default='images/default.jpg')
    def __str__(self):
        return self.group_name

class GroupSuggestions(models.Model):
    group_sugges_id=models.AutoField(primary_key=True)
    group=models.OneToOneField(Group,on_delete=models.CASCADE)
    users=models.ManyToManyField(UserProfile,blank=True)
    def __str__(self):
        return self.group.group_name
@receiver(post_save, sender =Group)
def create_GroupSuggestions(sender,instance = None, created = False, **kwargs):
    if created:
        GroupSuggestions.objects.create(group=instance)


class UserSuggested(models.Model):
    user=models.OneToOneField(UserProfile,on_delete=models.CASCADE)
    suggested_groups=models.ManyToManyField(Group, blank=True)
    def __str__(self):
        return self.user.first_name
@receiver(post_save, sender =UserProfile)
def create_UserSuggestion(sender,instance = None, created = False, **kwargs):
    if created:
        up_inst = UserProfile.objects.get(user=instance)
        UserSuggested.objects.create(user=up_inst)

class UserJoined(models.Model):
    user=models.OneToOneField(UserProfile,on_delete=models.CASCADE)
    groups=models.ManyToManyField(Group, blank=True)
    def __str__(self):
        return self.user.first_name
def create_UserJoined(sender,instance = None, created = False, **kwargs):
    if created:
        up_inst = UserProfile.objects.get(user=instance)
        UserSuggested.objects.create(user=up_inst)


class Event(models.Model):
    event_id= models.AutoField(primary_key=True)
    event_name= models.CharField(max_length=255, blank=False, unique= True)
    event_desc= models.CharField(max_length=255, blank=False)
    event_start_date= models.DateField(auto_now_add=False)
    event_end_date =models.DateField(auto_now_add=False)
    event_commitee =models.CharField(max_length=255, blank=False)
    event_picture=models.ImageField (upload_to=PathAndRename('events/'),default='events/uicode.png')
    event_groups = models.ManyToManyField(Group ,blank= True)
    def __str__(self):
        return self.event_name

    """
    def sendmail(self):
        if(0<datetime.date-self.event_start_date<1):
            send_mail()
    """

class EventRegisteration(models.Model):
    er_id=models.AutoField(primary_key=True)
    sap_id=models.IntegerField(blank=True)
    user=models.ForeignKey(UserProfile,null=True,blank=True,on_delete=models.CASCADE)
    grp_id=models.IntegerField(blank=True)
    group=models.ForeignKey(Group,null=True, blank=True,on_delete=models.CASCADE)
    eve_id=models.IntegerField(blank=True)
    event= models.ForeignKey(Event,null=True,blank=True,on_delete=models.CASCADE)

    def __str__(self):
        return self.grp_name


class AllEventsForGroup(models.Model):
    AEFG_id= models.AutoField(primary_key=True)
    group_name= models.OneToOneField(Group, on_delete=models.CASCADE)
    group_events= models.ManyToManyField(Event)
    def __str__(self):
        return self.group_name.group_name

class AllEventsForUser(models.Model):
    AEFU_id= models.AutoField(primary_key=True)
    user_name= models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    group_events= models.ManyToManyField(Event)

    def __str__(self):
        return self.user_name.email

class AllGroupsForUser(models.Model):
    AGFU_id=models.AutoField(primary_key=True)
    user=models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    groups=models.ManyToManyField(Group)


@receiver(post_save, sender =Group)
def create_AEFG(sender,instance = None, created = False, **kwargs):
     if created:
        AllEventsForGroup.objects.create(group_name=instance)



@receiver(post_save, sender =UserProfile)
def create_AEFU(sender,instance = None, created = False, **kwargs):
    if created:
        up_inst = UserProfile.objects.get(user=instance)
        AllEventsForUser.objects.create(user_name=up_inst)

