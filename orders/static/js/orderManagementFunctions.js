function renderOrderStatus(order) {
  for (var i = 0; i < order.length; i++) {
    console.log(order);
    createOrderTableEntry(order[i].fields.orderItems, order[i].fields.totalPrice, order[i].fields.orderTime, order[i].fields.orderComplete, order[i].pk);
  }

}


function createOrderTableEntry(order, total, submitTime, status, orderPK) {

  var table = document.getElementById('orderStatusTable')
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = buildOrderString(order)
  cell2.innerHTML = "$" + total;
  cell3.innerHTML = submitTime;
  cell4.innerHTML = status;
  cell5.innerHTML = markOrderAsCompleteButton(orderPK);


}


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

function markOrderAsCompleteButton(orderPK) {
  var button = '<button onclick="mrkOrderAsComplete(' + orderPK + ')">Mark Order as Complete</button>'
  return button
}

function markOrderAsComplete() {

}
