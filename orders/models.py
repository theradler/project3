from django.db import models
from django.utils.translation import ugettext_lazy as _

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
    category = models.CharField(max_length=30, null=False, blank=False)
    item_name = models.CharField(max_length=30, null=True, default=None, blank=True)
    name = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)

    class Meta:
        verbose_name = _("Toppings")
        verbose_name_plural = _("Toppings")


class submitedOrder(models.Model):
    orderItems = models.CharField(max_length=1000, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=12, decimal_places=2, null=False, blank=False)
    orderedBy = models.CharField(max_length=100, null=True, blank=True)
    orderTime = models.DateTimeField(auto_now_add=True)
    orderComplete = models.NullBooleanField(default=False);
