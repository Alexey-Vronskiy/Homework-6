/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Order = require('./Order');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

var $cart = $(".container-for-orders"); // область для ордеров
var $cartup = $(".cart"); // вся часть заказа

function addToCart(pizza, size) {

    var enable = false;
    //Додавання однієї піци в кошик покупок
    for (var i = 0; i < Cart.length; i++) {
        if (Cart[i].pizza.id == pizza.id && Cart[i].size == size) {
            ++Cart[i].quantity;
            enable = true;
            break;
        }
    }
    //Приклад реалізації, можна робити будь-яким іншим способом
    if (!enable) {
        Cart.push({ // затолкали в массив кошика пиццы 
            pizza: pizza,
            size: size, // big_size or small_size
            quantity: 1
        });
    }

    var order = $cartup.find(".quantity").text();
    var price = $cartup.find(".sum").text();
    order = parseInt(order) + 1;


    if (size == "small_size")
        price = parseInt(price) + parseInt(pizza.small_size.price);
    else
        price = parseInt(price) + parseInt(pizza.big_size.price);


    $(".quantity").text(order);
    $cartup.find(".sum").text(price);
    //Оновити вміст кошика на сторінці
    updateCart();
}
//var cart_item = $cart.find(".raw-of-offer");
function removeFromCart(cart_item, index) {
    //Видалити піцу з кошика
    //    var pizza_name = cart_item.pizza;
    //    var pizza_size = cart_item.size;
    var newCart = [];
    for (var i = 0, j = 0; j < Cart.length; i++, j++) {
        if (j != index)
            newCart[i] = Cart[j];
        else {
            --i;
        }
    }
    Cart = newCart;
    //Після видалення оновити відображення
    updateCart();
}

function storage() {
    var JSONCart = JSON.stringify(Cart);
    var JSONNumber = $(".quantity").text();
    var JSONSum = $(".sum").text();

    localStorage.setItem("Quantity", JSONNumber);
    localStorage.setItem("Cart", JSONCart);
    localStorage.setItem("Sum", JSONSum);
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    var savedGoods = JSON.parse(localStorage.getItem("Cart"));
    if (savedGoods) {
        Cart = savedGoods;
        $(".quantity").text(localStorage.getItem("Quantity"));
        $(".sum").text(localStorage.getItem("Sum"));
    } else {
        $(".quantity").text(0);
        $(".sum").text(0);
    }
    

    updateCart();
}

function removeAll() {
    //Видалити все з кошика
    var newCart = [];
    Cart = newCart;
    //Після видалення оновити відображення
    updateCart();
}

function getPizzasInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    storage();
    removeAllInCart();
    Order.send();
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function () {
            //Збільшуємо кількість замовлених піц
            var order = $cartup.find(".quantity").text(); // количество пицц вверху
            var price = $cartup.find(".sum").text(); // общая сумма внизу
            var pizza_price = $node.find(".price-order").text(); //забираю цену пиццы 

            // var quant = $cartup.find(".quantity-in").text();

            //var pizza_quantity = cart_item.quantity; //$node.find(".quantity-in").text();
            console.log(cart_item.quantity);

            cart_item.quantity += 1;

            order = parseInt(order) + 1;
            price = parseInt(price) + parseInt(pizza_price);
            $(".quantity").text(order);
            $(".sum").text(price);
            // $(".quantity-in").text(quant);
            //  console.log(quant);
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function () {

            if (cart_item.quantity == 1) {
                removeFromCart(cart_item, Cart.indexOf(cart_item,0));
                $node.remove();
            }
            var order = $cartup.find(".quantity").text();
            var orderPrice = $cartup.find(".sum").text();
            var pizza_price = $node.find(".price-order").text();

            order = parseInt(order) - 1;
            cart_item.quantity -= 1;
            orderPrice = parseInt(orderPrice) - parseInt(pizza_price);

            $(".quantity").text(order);
            $(".sum").text(orderPrice);

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".remove").click(function () {
            var order = $cartup.find(".quantity").text();
            var orderPrice = $cartup.find(".sum").text();
            var pizza_price = $node.find(".price-order").text();
            console.log("index of cart_item" + Cart.indexOf(cart_item, 0));

            order = parseInt(order) - cart_item.quantity;
            orderPrice = parseInt(orderPrice) - cart_item.quantity * parseInt(pizza_price);
            removeFromCart(cart_item, Cart.indexOf(cart_item, 0));

            $node.remove();
            $(".sum").text(orderPrice);
            $(".quantity").text(order);
            updateCart();
        })
        //localstorage();
        $cart.append($node);

    }

    function removeAllInCart() {
        $cartup.find(".clear").click(function () {
            $(".quantity").text("0");
            $(".sum").text("0");
            removeAll();

            updateCart();
        });
    }
    $cartup.find("#check").click(function(){
            
        if(window.location.pathname != "/order.html") {
            window.location.href = "order.html";
        }
        else {
            window.location.href = "";
        }
    });

    $cartup.find("#edit-order").click(function(){
            
        if(window.location.pathname != "/") {
            window.location.href = "/";
        }
        else {
            window.location.href = "order.html";
        }
    });


    Cart.forEach(showOnePizzaInCart);
    //   с помощью фор ич забираем каждый элемент массива и передаем в showOnePizzaInCart

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzasInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
