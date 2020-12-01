from django.contrib import admin

from .models import Regular_Pizza, Sicilian_Pizza, Salad, Sub, Topping, Dinner_Platter, Pasta

# Register your models here.
admin.site.register(Regular_Pizza)
admin.site.register(Sicilian_Pizza)
admin.site.register(Salad)
admin.site.register(Sub)
admin.site.register(Topping)
admin.site.register(Dinner_Platter)
admin.site.register(Pasta)