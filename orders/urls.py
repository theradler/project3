from django.urls import path
from django.contrib import admin
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('admin/', admin.site.urls),
    path('menu/', views.menu, name="menu"),
    path('access/', views.access, name="access"),
    path('register/', views.register, name="register"),
    path('login/', views.login, name="login"),
    path('customizeOrder/<int:item_id>/', views.customizeOrder, name="customizeOrder"),
    path('shoppingCart/', views.shoppingCart, name="shopping cart"),
    path('logout/', views.signout, name="logout"),

]
