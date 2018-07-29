from django.http import HttpResponse
from django.shortcuts import render, redirect, render_to_response
from django.template import loader
from django.utils.safestring import mark_safe
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
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

def access(request):
    template = loader.get_template('orders/access.html')
    userCreationForm = UserCreationForm()
    loginForm = AuthenticationForm()
    context = {'userCreationForm': userCreationForm,
               'loginForm': loginForm
               }
    return HttpResponse(template.render(context,request))

def register(request):
    print("This shit is working")
    if request.method == 'POST':
        print("This shit is POST")
        form = UserCreationForm(request.POST)
        if (form.is_valid()):
            print("this shit form is valid")
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            print("this shit is attempting to redirect")
            return menu(request)
        else:
            template = loader.get_template('orders/access.html')
            loginForm = AuthenticationForm()
            print('Form was not valid')
            context = { 'userCreationForm': form,
                        'loginForm': loginForm

            }
            return HttpResponse(template.render(context,request))

