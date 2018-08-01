function noPeeking(loggedInUser, orderUser) {
  if (loggedInUser != orderUser) {
    window.location.href = '/unauthorized/'
  }
}

function renderOrderStatus(order) {
  for (var i = 0; i < order.length; i++) {
    createOrderTableEntry(order[i].fields.orderItems, order[i].fields.totalPrice, order[i].fields.orderTime, order[i].fields.orderComplete);
  }

}


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
  cell4.innerHTML = status;


}


function buildOrderString(orders) {
  var jsonOrders = JSON.parse(orders);
  var orderString = "";
  var toppingString = "";

  for (var i = 0; i < jsonOrders.length; i++) {
    var localOrder = jsonOrders[i];
    console.log(localOrder.toppings.length);
    for (var i = 0; i < localOrder.toppings.length; i++) {
      console.log(localOrder.toppings[i]);
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
  console.log(orderString);
  console.log(toppingString);

  return orderString
}
