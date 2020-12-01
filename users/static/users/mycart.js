var cartUL = document.querySelector(".list-group");
var products = JSON.parse(localStorage.getItem("products"));
var prices = JSON.parse(localStorage.getItem("prices"));
var checkoutButton = document.querySelector(".btn-primary");
checkoutButton.disabled = true;

//Fetching the badge which indicates count of items in cart
document.querySelector(".badge").textContent = "0";
var itemCount = parseInt(document.querySelector(".badge").textContent);

//Variable to store total amount(USD)
var total = 0;

for(let i=0; i<products.length; i++) {
    var regex = /[+-]?\d+(\.\d+)?/g;
    var str = prices[i];
    var floats = parseFloat(str.match(regex));
    total = total + floats;
    var desc = str.slice(str.length - 7);
    // console.log(desc);

    var cartLI = document.createElement("li");
    if(desc == "(small)" || desc == "(large)"){
        cartLI.innerHTML = "<div><h6 class='my-0'>"+products[i]+"</h6><small class='text-muted'>"+desc+"</small></div><span class='text-muted'>$"+floats+"</span>";
    } else {
        cartLI.innerHTML = "<div><h6 class='my-0'>"+products[i]+"</h6></div><span class='text-muted'>$"+floats+"</span>";
    }
    cartLI.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed");
    cartUL.append(cartLI);
    itemCount += 1;
    document.querySelector(".badge").textContent = itemCount;
}

//Display topping items in "desc" part of the li
var toppings = JSON.parse(localStorage.getItem("toppings"));
var h6 = document.querySelectorAll("h6");
for(let j=0; j<h6.length; j++) {
    var itemwithtoppingName = h6[j].innerHTML;
    // console.log(itemwithtoppingName);
    if(typeof toppings[itemwithtoppingName] !== "undefined") {
        var demo = toppings[itemwithtoppingName];
        var div_ofitemwithtopping = h6[j].parentElement;
        var small = div_ofitemwithtopping.querySelector("small");
        var previousinnerHtml_of_small = small.innerHTML;
        if(demo.length > 0) {
            small.innerHTML = previousinnerHtml_of_small + "<br>Toppings: " + demo;
        } else {
            small.innerHTML = previousinnerHtml_of_small + "<br>Toppings: none";
        }

        //Changing price of item according to the number of toppings added
        var parentofthatDiv = div_ofitemwithtopping.parentElement;
        var spanofprice = parentofthatDiv.querySelector("span");
        var actualPrice = parseFloat(spanofprice.innerHTML.match(regex));
        spanofprice.innerHTML =  "$" + (actualPrice + 0.5*(demo.length)).toString();
        total = total + 0.5*(demo.length);
    } else {
        // console.log("");
    }

}

//Adding the Total li
var totalLI = document.createElement("li");
totalLI.innerHTML = "<span>Total (USD)</span><strong>$"+total.toFixed(2)+"</strong>";
totalLI.classList.add("list-group-item", "list-group-item-secondary", "d-flex", "justify-content-between");
cartUL.append(totalLI);

//Print total amount on Checkout Button
if(total > 0) {
    checkoutButton.textContent = "Checkout $" + total.toFixed(2);
    checkoutButton.disabled = false;
}
