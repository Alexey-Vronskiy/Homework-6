
//var Templates = require('../Templates');
var API = require('../API');
var validName = false;
var validNumber = false;
var validAddress = false;


   $(".input-name").focusout(function () {
       var name = $(".input-name").val();
       if ((/^[a-zA-Z ]+$/.test(name)) && /\S/.test(name)) {
           validName = true;
       }
       else
           validName = false;

       if(validName) {
           $(".input-name").css("background", "lightgreen");
           $(".help-name").css("visibility", "hidden");
       }
       else {
           $(".input-name").css("background", "red");
           $(".help-name").css("visibility", "visible");
       }
       check();
        });

 $(".input-tele").focusout(function () {
       var number = $(".input-tele").val();
       if ((/^[0-9+]+$/.test(number))) { 
           validNumber = true;
       }
     else validNumber = false;

       if(validNumber) {
           $(".input-tele").css("background", "lightgreen");
           $(".help-tele").css("visibility", "hidden");
       }
       else {
           $(".input-tele").css("background", "red");
           $(".help-tele").css("visibility", "visible");
       }
       check();
        });

 $(".input-address").focusout(function () {
     var address = $(".input-address").val();
       if (/\S/.test(address)) {
           validAddress = true;
       }
     else
         validAddress = false;

       if(validAddress) {
           $(".input-address").css("background", "lightgreen");
           $(".help-address").css("visibility", "hidden");
       }
       else {
           $(".input-address").css("background", "red");
           $(".help-address").css("visibility", "visible");
        }
     check();
});
function send() {  
    console.log("Order created 1");
    $(".go").click( function (){
        if(validNumber && validAddress && validName) {
    var order =
    {
        name: $(".input-name").val(),
        number: $(".input-tele").val(),
        address: $(".input-address").val(),
        cart: localStorage.getItem("Cart"),
        cash: localStorage.getItem("Sum")
    };
     
    $("#edit-order").click();
    $(".clear").click();


API.createOrder(order, function (err, data) {
   console.log("Order created");
   console.log(order);
});
        }
        else
        alert("Заповніть усі поля форми коректно")
});
}
exports.send = send;