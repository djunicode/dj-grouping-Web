from django.db import models
from datetime import datetime
from accounts.models import MyUser

# Create your models here.

# Create Groups(Tanish), Events(Tanish)

#post_save
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

# Create Groups(Tanish), Events(Tanish)

class Group(models.Model):
    group_individual=models.ManyToManyField(MyUser)
    group_id= models.AutoField(primary_key=True)
    group_name= models.CharField(max_length=255,blank=False, unique=True)
    group_desc=models.CharField(max_length=255,blank=False)
    group_members=models.IntegerField(default=4)
    #group_picture=models.ImageField (upload_to='images/')
    def __str__(self):
        return self.group_name


class Events(models.Model):
    event_id= models.AutoField(primary_key=True)
    event_name= models.CharField(max_length=255, blank=False, unique= True)
    event_desc= models.CharField(max_length=255, blank=False)
    event_start_date= models.DateField(auto_now_add=False)
    event_end_date =models.DateField(auto_now_add=False)
    event_commitee =models.CharField(max_length=255, blank=False)
    
    event_groups = models.ManyToManyField(Group ,blank= True)

    def __str__(self):
        return self.event_name

    """
    def sendmail(self):
        if(0<datetime.date-self.event_start_date<1):
            send_mail()
    """

class EventRegisterations(models.Model):
    er_id=models.AutoField(primary_key=True)
    us_id=models.IntegerField(blank=True)
    user=models.ForeignKey(MyUser,null=True,blank=True,on_delete=models.CASCADE)
    grp_name=models.CharField(max_length=255,blank=True)
    group=models.ForeignKey(Group,null=True, blank=True,on_delete=models.CASCADE)
    eve_id=models.IntegerField(blank=True)
    event= models.ForeignKey(Events,null=True,blank=True,on_delete=models.CASCADE)

    def __str__(self):
        return self.grp_name

class AllEventsForGroup(models.Model):
    AEFG_id= models.AutoField(primary_key=True)
    group_name= models.OneToOneField(Group, on_delete=models.CASCADE)
    group_events= models.ManyToManyField(Events)

    def __str__(self):
        return self.group_name.group_name

class AllEventsForUser(models.Model):
    AEFU_id= models.AutoField(primary_key=True)
    user_name= models.OneToOneField(MyUser, on_delete=models.CASCADE)
    group_events= models.ManyToManyField(Events)

    def __str__(self):
        return self.user_name.email




@receiver(post_save, sender =Group)
def create_AEFG(sender,instance = None, created = False, **kwargs):
    if created:
        AllEventsForGroup.objects.create(group_name=instance)


@receiver(post_save, sender =MyUser)
def create_AEFU(sender,instance = None, created = False, **kwargs):
    if created:
        AllEventsForUser.objects.create(user_name=instance)