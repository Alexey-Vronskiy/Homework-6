
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');
var Order = require('./Order');



//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({
            pizza: pizza
        });

        var $node = $(html_code);

        $node.find("#buy-big").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find("#buy-small").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }
    var $container = $(".container");

    $container.find("#all").click(function () {
        initialiseMenu();
    })
    $container.find("#meat").click(function () {
        filterPizza("М’ясна піца");
    })
    $container.find("#pineapple").click(function () {
        filterPizza("ананаси");
    })
    $container.find("#tomato").click(function () {
        filterPizza("помідори");
    })
    $container.find("#seafood").click(function () {
        filterPizza("Морська піца");
    })
    $container.find("#vega").click(function () {
        filterPizza("Вега піца");
    })
    list.forEach(showOnePizza);
    //     выводим каждую пиццу с листа переданого в маленьком 
    //      main js , в который мы положили пиццы с пицца_лист
}

//Order.send();

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    Pizza_List.forEach(function (pizza) {
        //Якщо піка відповідає фільтру
        if (pizza.type == filter)
            pizza_shown.push(pizza);

        if (pizza.content.pineapple == filter)
            pizza_shown.push(pizza);

        if (pizza.content.tomato == filter)
            pizza_shown.push(pizza);

        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
