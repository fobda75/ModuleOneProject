let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

$(document).ready(function () {
    // event handlers always go here
    $("#tabs a").on("click", showTab);
    $("#createSubmit").on("click", submitPizza);
    $("#addressSubmit").on("click", submitAddress);
    $("#submitOrder").on("click", submitOrder);
});

// This function is required by Bootstrap to show/hide the selected tab
function showTab(event) {
    event.preventDefault();
    $(this).tab("show");
}

function submitPizza(event){
    event.preventDefault();

    // Check selected pizza size and
    let selected = $("input[name=pieSize]:checked")
    let pizzaPrice =0;
    let perToppingPrice=0;
    $("#outputPizzaSize").text(`One ${selected.data("size")} pizza`)
    switch (selected.data("size")){
        case "Wee":
            pizzaPrice =10;
            perToppingPrice =1;
            break;

        case "Not So Wee":
            pizzaPrice =12;
            perToppingPrice =2;
            break;

        case "Freakin' Huge":
            pizzaPrice =15;
            perToppingPrice =3;
            break;
    }
    $("#outputPizzaPrice").text(formatter.format(pizzaPrice));

    let toppingsPrice=0;
    let toppingMessage ="";
    if($("#meatSausage").prop("checked")){
        toppingsPrice += perToppingPrice;
        if (toppingMessage.length===0){
            toppingMessage = "with sausage"
        }
        else{
            toppingMessage += ", sausage"
        }
    }
    if($("#meatPepperoni").prop("checked")){
        toppingsPrice += perToppingPrice;
        if (toppingMessage.length===0){
            toppingMessage = "with pepperoni"
        }
        else{
            toppingMessage += ", pepperoni"
        }
    }
    if($("#meatHaggis").prop("checked")){
        toppingsPrice += perToppingPrice;
        if (toppingMessage.length===0){
            toppingMessage = "with haggis"
        }
        else{
            toppingMessage += ", haggis"
        }
    }
    if($("#veggiesGarlic").prop("checked")){
        toppingsPrice += perToppingPrice;
        if (toppingMessage.length===0){
            toppingMessage = "with garlic"
        }
        else{
            toppingMessage += ", garlic"
        }
    }
    if($("#veggiesPeppers").prop("checked")){
        toppingsPrice += perToppingPrice;
        if (toppingMessage.length===0){
            toppingMessage = "with green peppers"
        }
        else{
            toppingMessage += ", green peppers"
        }
    }
    if($("#veggiesOnion").prop("checked")){
        toppingsPrice += perToppingPrice;
        if (toppingMessage.length===0){
            toppingMessage = "with onion"
        }
        else{
            toppingMessage += ", onion"
        }
    }
    $("#outputPizzaToppings").text(toppingMessage);
    $("#outputToppingsPrice").text(formatter.format(toppingsPrice));

    let subTotal = pizzaPrice + toppingsPrice;
    $("#outputSubtotal").text(formatter.format(subTotal));

    let tax = subTotal * 0.051;
    $("#outputTax").text(formatter.format(tax));

    let deliveryFee = 2;
    $("#outputDelivery").text(formatter.format(deliveryFee));

    let total = subTotal + tax + deliveryFee;
    $("#outputTotal").text(formatter.format(total));

    $('.nav-tabs a[href="#' + "address" + '"]').tab('show');
}

function submitAddress(event){
    let valid1=false;
    let valid2=false;
    let valid3=false;
    let valid4=false;
    let valid5=false;
    event.preventDefault();

    //validate that address fields are not blank
    if ($("#streetAddress").val()===""){
        $("#streetAddressCorrection").text("Street address may not be left blank")
        valid1=false;
    }
    else{
        $("#streetAddressCorrection").text("")
        valid1=true;
    }

    if ($("#cityAddress").val()===""){
        $("#cityAddressCorrection").text("The city may not be left blank")
        valid2=false;
    }
    else{
        $("#cityAddressCorrection").text("")
        valid2=true;
    }

    if ($("#stateAddress").val()===""){
        $("#stateAddressCorrection").text("The state may not be left blank")
        valid3=false;
    }
    else{
        $("#stateAddressCorrection").text("")
        valid3=true;
    }

    if ($("#zipAddress").val()===""){
        $("#zipAddressCorrection").text("The zip code may not be left blank")
        valid4=false;
    }
    else {
        $("#zipAddressCorrection").text("")
        valid4 = true;
    }

    if ($("#phoneNumber").val()===""){
        $("#phoneNumberCorrection").text("Phone number may not be left blank")
        valid5=false;
    }
    else {
        $("#phoneNumberCorrection").text("")
        valid5 = true;
    }

    //if all data is valid then procede to verify screen
    if (valid1 && valid2 && valid3 && valid4 && valid5){
        let address1 = $("#streetAddress").val();
        let address2 =`${$("#cityAddress").val()}, ${$("#stateAddress").val()} ${$("#zipAddress").val()}`;
        let phone = $("#phoneNumber").val();

        $("#outputAddress1").text(address1);
        $("#outputAddress2").text(address2);
        $("#outputPhone").text(phone);

        //move to verify tab
        $('.nav-tabs a[href="#' + "verify" + '"]').tab('show');
    }

}

function submitOrder(){
    if($("#outputPizzaSize").text()=== ""){
        $('.nav-tabs a[href="#' + "create" + '"]').tab('show');
        alert("You must submit your pizza choices before you can submit your order");
    }
    else if($("#outputAddress1").text() ===""){
        $('.nav-tabs a[href="#' + "address" + '"]').tab('show');
        alert("You must submit your delivery information before you can submit your order");
    }
    else{
        alert("Thank you for your order. We will deliver it soon")
    }
}