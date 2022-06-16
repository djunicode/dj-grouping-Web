from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(UserProfile)
admin.site.register(OceanAnswer)
admin.site.register(OceanQuestion)
admin.site.register(Group)
admin.site.register(Event)
admin.site.register(EventRegisteration)
admin.site.register(AllEventsForGroup)
admin.site.register(AllEventsForUser)
admin.site.register(Interest)
admin.site.register(UserGroupRequest)
