from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from orders.models import Dinner_Platter, Pasta, Regular_Pizza, Salad, Sicilian_Pizza, Sub, Topping
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse


# Create your views here.
def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    context = {
        "username": request.user.first_name
    }
    return render(request, "users/index.html", context)

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            messages.error(request, "Invalid Username or Password")
            return render(request, "users/login.html")
    if not request.user.is_authenticated:     
        return render(request, "users/login.html")
    else: 
        return HttpResponseRedirect(reverse("index"))

def signup_view(request):
    if request.method == "POST":
        firstname = request.POST["firstname"]
        lastname = request.POST["lastname"]
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        user = User.objects.create_user(username, email, password)
        user.first_name = firstname
        user.last_name = lastname
        user.save()
        messages.success(request, "Account Created")
        return HttpResponseRedirect(reverse("login"))
    if not request.user.is_authenticated:   
        return render(request, "users/signup.html")
    else:
        return HttpResponseRedirect(reverse("index"))

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))

def order_view(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    context = {
        "username": request.user.first_name,
        "dp_gardensalad": Dinner_Platter.objects.get(platter="Garden Salad"),
        "dp_greeksalad": Dinner_Platter.objects.get(platter="Greek Salad"),
        "dp_antipasto": Dinner_Platter.objects.get(platter="Antipasto"),
        "dp_bakedziti": Dinner_Platter.objects.get(platter="Baked Ziti"),
        "dp_meatballparm": Dinner_Platter.objects.get(platter="Meatball Parm"),
        "dp_chickenparm": Dinner_Platter.objects.get(platter="Chicken Parm"),
        "pasta_mozz": Pasta.objects.get(pasta="Baked Ziti w/Mozzarella"),
        "pasta_meatballs": Pasta.objects.get(pasta="Baked Ziti w/Meatballs"),
        "pasta_chicken": Pasta.objects.get(pasta="Baked Ziti w/Chicken"),
        "salad_gardensalad": Salad.objects.get(salad="Garden Salad"),
        "salad_greeksalad": Salad.objects.get(salad="Greek Salad"),
        "salad_antipasto": Salad.objects.get(salad="Antipasto"),
        "salad_tuna": Salad.objects.get(salad="Salad w/Tuna"),
        "sub_cheese":Sub.objects.get(sub="Cheese"),
        "sub_italian": Sub.objects.get(sub="Italian"),
        "sub_hamcheese": Sub.objects.get(sub="Ham and Cheese"),
        "sub_meatball": Sub.objects.get(sub="Meatball"),
        "sub_tuna": Sub.objects.get(sub="Tuna"),
        "sub_turkey": Sub.objects.get(sub="Turkey"),
        "sub_chickenparm": Sub.objects.get(sub="Chicken Parmigiana"),
        "sub_eggplantparm": Sub.objects.get(sub="Eggplant Parmigiana"),
        "sub_steak": Sub.objects.get(sub="Steak"),
        "sub_steakcheese": Sub.objects.get(sub="Steak and Cheese"),
        "sub_spo": Sub.objects.get(sub="Sausage, Peppers and Onions"),
        "sub_hamburger": Sub.objects.get(sub="Hamburger"),
        "sub_cheeseburger": Sub.objects.get(sub="Cheeseburger"),
        "sub_friedchicken": Sub.objects.get(sub="Fried Chicken"),
        "sub_veggie": Sub.objects.get(sub="Veggie"),
        "reg_pizza": Regular_Pizza.objects.get(pizza="Cheese"),
        "sic_pizza": Sicilian_Pizza.objects.get(pizza="Cheese"),
    }
    return render(request, "users/order_online.html", context)

def mycart_view(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    context = {
        "username": request.user.first_name
    }
    return render(request, "users/mycart.html", context)

@login_required
def myorders_view(request):
    # if request.user.is_superuser:
        context = {
            "username": request.user.first_name
        }
        return render(request, "users/myorders.html", context)
