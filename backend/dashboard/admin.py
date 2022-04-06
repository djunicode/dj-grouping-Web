from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Group)
admin.site.register(Events)
admin.site.register(EventRegisterations)
admin.site.register(AllEventsForGroup)
admin.site.register(AllEventsForUser)