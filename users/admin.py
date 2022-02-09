from django.contrib import admin
from .models import NewUser
from django.contrib.auth.admin import UserAdmin

class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('email', 'user_name')
    list_filter = ('email', 'user_name', 'operator_id' , 'is_active', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('email', 'id', 'operator_id', 'user_name',
                    'is_active', 'is_staff', 'is_operator')
    fieldsets = (
        (None, {'fields': ('email', 'user_name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_operator')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name',  'password1', 'password2', 'is_active', 'is_staff', 'is_operator')}
         ),
    )


admin.site.register(NewUser, UserAdminConfig)