from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Menu(models.Model):
    category = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    modifiable = models.BooleanField()
    numberOfToppings = models.IntegerField(null=True)
    smallPrice = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    largePrice = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    defaultPrice = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)


class Toppings(models.Model):
    category = models.CharField(max_length=30)