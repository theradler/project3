import json
from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.utils.safestring import mark_safe
from django.core import serializers
from orders import models

# Create your views here.
def index(request):
    template = loader.get_template('orders/index.html')
    context = {}
    return HttpResponse(template.render(context, request))

def menu(request):
    template = loader.get_template('orders/menu.html')
    menuData = serializers.serialize("json", models.Menu.objects.all())
    menuData = mark_safe(menuData)
    context = {
        'menu': menuData,
    }
    return HttpResponse(template.render(context, request))