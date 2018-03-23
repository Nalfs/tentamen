// JavaScript för att implementera kraven A-E.

let root = $("#root");
let current = $("#current");
let cart = $("#cart");
let price = $("#price");

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


$( document ).ready(function (product) {
    let getData;
    let container = $('<div>');
    $.get('http://demo.edument.se/api/products', function (data) {
        for (let i in data) {
            let image = $('<img>');
            image.attr('src', data[i].Image);
            let namn = $('<h3></h3>');
            namn.text(data[i].Name);
            let paragraph = $('<p></p>');
            paragraph.text(data[i].Description);
            let id = $('<p></p>');
            id.text(data[i].Id);
            let url = $('<p></p>');
            url.text(data[i].Url);
            let button = $('<button></button>');
            let status = $("<p></p>");
            let stock = calcStatus(product);
            status.text("Stock: " + stock);
            button.text('Add to cart');
            button.attr("id", "add-to-cart");
            button.click(() => {
                displayCartProduct(data[i]);
                cartItems.push(data[i]);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                console.log(cartItems);
                displayTotalPrice();
                stock = stock - 1;
                status.text("Stock: " + stock);
                if(stock < 1){
                        $(button).prop("disabled",true);
                }
                displayItems();
            });
            container.append(id);
            container.append(namn);
            container.append(image);
            container.append(paragraph);
            container.append(status);
            container.append(button);
            container.append(url);
            $('#root').append(container);
        }

    });
});

function calcStatus(product) {
    return status =  Math.floor((Math.random() * 10) + 1);

};

function displayItems() {
    $('#current').text(String("Current number of items in basket: " + cartItems.length));
    console.log(cartItems);

}



cartItems.forEach(function(item){
    displayCartProduct(item);

});


function displayTotalPrice(){
    let sum = 0;
    cartItems.forEach(function(value, index, arry){
        sum += parseFloat(value.Price);
    });
    $('#price').text('Total price is:  (SEK)' + sum);
}


function displayCartProduct(item) {
    let card = $('<article></article>');
        let heading = $('<p></p>');
        heading.text(item.Name);
        let price = $('<span></span>');
        price.text(item.Price + "SEK");
        card.append(heading);
        card.append(price);
        $("#cart").append(card);
    }

    //Set items from shoppingcart with .name, .price and quantity.

$("#order").click(() => {
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/orders",
        data: {
            Name: "",
            Price: "",
            Quantity: "",

        }
    })
        .done(function (msg) {
            alert("Order sent" + msg);
            localStorage.clear();
        });
});

