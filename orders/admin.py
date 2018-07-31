from django.contrib import admin

# Register your models here.
from .models import Menu, Toppings, submitedOrder

admin.site.register(Menu)
admin.site.register(Toppings)
admin.site.register(submitedOrder)
