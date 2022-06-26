from django.contrib import admin
from .models import User, Book, Goal

class UserAdmin(admin.ModelAdmin):
    pass
class BookAdmin(admin.ModelAdmin):
    pass
class GoalAdmin(admin.ModelAdmin):
    pass

admin.site.register(User, UserAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Goal, GoalAdmin)
