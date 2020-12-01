var addItem = document.getElementsByClassName("btn-danger");
for(let i=0; i<addItem.length; i++) {
    addItem[i].addEventListener("click", function() {
        //Fetch the Parent Element of Add Item+ Button 
        var itemParentElement = addItem[i].parentElement;

        if(itemParentElement.querySelector("input") !== null) {
            // var item = $("input[type='radio']:checked");
            var item = document.querySelector("input[type='radio']:checked");
            var itemName = item.name.charAt(0).toUpperCase()+item.name.slice(1);
            console.log(itemName + "-" + item.value);

            if(!localStorage.getItem("products")) {
                let products = [itemName];
                localStorage.setItem("products", JSON.stringify(products));
            } else {
                let products = JSON.parse(localStorage.getItem("products"));
                products.push(itemName);
                localStorage.setItem("products", JSON.stringify(products));
            }
            if(!localStorage.getItem("prices")) {
                let prices = [item.value];
                localStorage.setItem("prices", JSON.stringify(prices));
            } else {
                let prices = JSON.parse(localStorage.getItem("prices"));
                prices.push(item.value);
                localStorage.setItem("prices", JSON.stringify(prices));
            }

            item.checked = false;
        }
        else {
            var item = itemParentElement.querySelector(".card-title");
            var price = itemParentElement.querySelector(".card-text");
            console.log(item.textContent + "-" + price.textContent);

            if(!localStorage.getItem("products")) {
                let products = [item.textContent];
                localStorage.setItem("products", JSON.stringify(products));
            } else {
                let products = JSON.parse(localStorage.getItem("products"));
                products.push(item.textContent);
                localStorage.setItem("products", JSON.stringify(products));
            }
            if(!localStorage.getItem("prices")) {
                let prices = [price.textContent];
                localStorage.setItem("prices", JSON.stringify(prices));
            } else {
                let prices = JSON.parse(localStorage.getItem("prices"));
                prices.push(price.textContent);
                localStorage.setItem("prices", JSON.stringify(prices));
            }
        }
    })
}

var addToppingbtn = document.querySelectorAll(".btn-warning");
var toppingNames = [];
for(var k=0; k < addToppingbtn.length; k++) {
    addToppingbtn[k].addEventListener("click", function() {
        // console.log("Warning buttons working");
        var selectedtoppings = document.querySelectorAll('input[type=checkbox]:checked');
        for (let j = 0; j < selectedtoppings.length; j++) {
            toppingNames.push(selectedtoppings[j].name);
        }
        var addedItems = JSON.parse(localStorage.getItem("products"));
        var recentlyAddedItem = addedItems[addedItems.length - 1];
        if(!localStorage.getItem("toppings")) {
            let toppings = {};
            toppings[recentlyAddedItem] = toppingNames;
            localStorage.setItem("toppings", JSON.stringify(toppings));
        } else {
            var toppings = JSON.parse(localStorage.getItem("toppings"));
            toppings[recentlyAddedItem] = toppingNames;
            localStorage.setItem("toppings", JSON.stringify(toppings));
        }
        toppingNames = [];
    });
}