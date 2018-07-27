from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Menu(models.Model):
    category = models.CharField(max_length=30)
    name = models.CharField(max_length=30, unique=True)
    modifiable = models.BooleanField()
    cost = models.DecimalField(max_digits=6, decimal_places=2)


