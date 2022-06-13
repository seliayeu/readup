from django.contrib import admin
from .models import User, ReadItem, Goal

class UserAdmin(admin.ModelAdmin):
    pass
class ReadItemAdmin(admin.ModelAdmin):
    pass
class GoalAdmin(admin.ModelAdmin):
    pass

admin.site.register(User, UserAdmin)
admin.site.register(ReadItem, ReadItemAdmin)
admin.site.register(Goal, GoalAdmin)
