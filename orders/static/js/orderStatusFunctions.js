//if you are not the user, you can't look at there orders, bounces to a 401 error
function noPeeking(loggedInUser, orderUser) {
  if (loggedInUser != orderUser) {
    window.location.href = '/unauthorized/'
  }
}
//renders the table with all order functions
function renderOrderStatus(order) {
  for (var i = 0; i < order.length; i++) {
    createOrderTableEntry(order[i].fields.orderItems, order[i].fields.totalPrice, order[i].fields.orderTime, order[i].fields.orderComplete);
  }

}

//builds table
function createOrderTableEntry(order, total, submitTime, status) {

  var table = document.getElementById('orderStatusTable')
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  cell1.innerHTML = buildOrderString(order)
  cell2.innerHTML = "$" + total;
  cell3.innerHTML = submitTime;
  cell4.innerHTML = returnStatusMessage(status);


}
//takes the order status and returns a nice(r) message
function returnStatusMessage(status){
  if(status) {
    return "Order Complete"
  } else {
    return "Order Pending"
  }
}
//transforms the order json blob I store in the db to a human readable string
function buildOrderString(orders) {
  var jsonOrders = JSON.parse(orders);
  var orderString = "";
  var toppingString = "";

  for (var i = 0; i < jsonOrders.length; i++) {
    var localOrder = jsonOrders[i];
    for (var i = 0; i < localOrder.toppings.length; i++) {
      toppingString = toppingString + localOrder.toppings[i] + ", "
    }
    toppingString = toppingString.substring(0, toppingString.length - 2);
    if (toppingString) {
      orderString = orderString + localOrder.size + " " + localOrder.name + " " + localOrder.category +  " with " + toppingString + "<br>"
    }
    else {
        orderString = orderString + localOrder.size + " " + localOrder.name + " " + localOrder.category + "<br>";
    }
  }
  return orderString
}
