from django.http import HttpResponse, HttpResponseRedirect
from itertools import chain
import json
from django.template import loader
from django.utils.safestring import mark_safe
from django.contrib.auth import login as auth_login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required
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
    if request.method == 'POST':
        userCreationForm = UserCreationForm(request.POST)
        if (userCreationForm.is_valid()):
            userCreationForm.save()
            username = userCreationForm.cleaned_data.get('username')
            raw_password = userCreationForm.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            auth_login(request, user)
            return menu(request)
        else:
            template = loader.get_template('orders/access.html')
            loginForm = AuthenticationForm()
            context = { 'userCreationForm': userCreationForm,
                        'loginForm': loginForm

            }
            return HttpResponse(template.render(context,request))

def login(request):
    if request.method == 'POST':
        loginForm = AuthenticationForm(data=request.POST)
        if(loginForm.is_valid()):
            username = loginForm.cleaned_data.get('username')
            raw_password = loginForm.cleaned_data.get('password')
            user = authenticate(username=username,password=raw_password)
            auth_login(request, user)
            return menu(request)
        else:
            print("invalidRequest")
            print(loginForm.errors)
            template = loader.get_template('orders/access.html')
            userCreationForm = UserCreationForm()
            context = {'userCreationForm': userCreationForm,
                       'loginForm': loginForm

                       }
            return HttpResponse(template.render(context, request))

def signout(request):
    logout(request)
    return HttpResponseRedirect('/')



@login_required
def customizeOrder(request, item_id):
    baseItemDetails = models.Menu.objects.get(pk=item_id)
    category = baseItemDetails.category
    if("pizza" in baseItemDetails.category):
        category = "pizza"
    item = mark_safe(serializers.serialize("json", models.Menu.objects.filter(pk=item_id)))
    availableToppings = models.Toppings.objects.filter(category=category).filter(item_name=None)
    itemSpecificToppings = models.Toppings.objects.filter(item_name=baseItemDetails.name)
    availableToppings = list(chain(availableToppings,itemSpecificToppings));
    availableToppings = mark_safe(serializers.serialize("json",availableToppings));
    template = loader.get_template('orders/customizeOrder.html')
    context = {
        'item': item,
        'availableToppings': availableToppings
    }

    return HttpResponse(template.render(context, request))

@login_required
def shoppingCart(request):
    template = loader.get_template('orders/shoppingCart.html');
    context = {}
    return HttpResponse(template.render(context, request))

@login_required
def editOrder(request, order_id, item_id):
    baseItemDetails = models.Menu.objects.get(pk=item_id)
    category = baseItemDetails.category
    if ("pizza" in baseItemDetails.category):
        category = "pizza"
    item = mark_safe(serializers.serialize("json", models.Menu.objects.filter(pk=item_id)))
    availableToppings = models.Toppings.objects.filter(category=category).filter(item_name=None)
    itemSpecificToppings = models.Toppings.objects.filter(item_name=baseItemDetails.name)
    availableToppings = list(chain(availableToppings, itemSpecificToppings));
    availableToppings = mark_safe(serializers.serialize("json", availableToppings));
    template = loader.get_template('orders/editOrder.html')
    context = {'order_id': order_id,
               'item': item,
               'availableToppings': availableToppings}
    return HttpResponse(template.render(context, request))

@login_required
def submitOrder(request):
    body_unicode = request.body.decode('utf-8')
    orderData = json.loads(body_unicode)
    try:
        newOrder = models.submitedOrder(orderItems=orderData['order'], totalPrice=orderData['total'],orderedBy=orderData['user'])
        newOrder.save()
    except:
        return HttpResponse(0)
    return HttpResponse(1)

@login_required
def orderStatus(request, user):
    template = loader.get_template('orders/orderStatus.html')
    orders = mark_safe(serializers.serialize('json',models.submitedOrder.objects.filter(orderedBy=user)))
    context = {
        'orderer': user,
        'orders': orders
    }
    return HttpResponse(template.render(context, request))

@login_required
def getItemInfo(request):
    requestValue = request.body.decode('utf-8')
    item = models.Menu.objects.filter(pk=requestValue)
    item = serializers.serialize("json", item)
    return HttpResponse(item)

def unauthorized(request):
    return HttpResponse('Unauthorized', status=401)