from django.contrib import admin

# Register your models here.
from .models import Menu, Toppings

admin.site.register(Menu)
admin.site.register(Toppings)