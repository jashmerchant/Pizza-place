from django.db import models

# Create your models here.

class Orders(models.Model):
    orderid = models.CharField(max_length=64)
    date = models.CharField(max_length=64)
    amount = models.FloatField()
