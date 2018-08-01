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


function createOrderTableEntry(order,total, submitTime, status) {

  var table = document.getElementById('orderStatusTable')
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  cell1.innerHTML = buildOrderString(order)
  cell2.innerHTML = total;
  cell3.innerHTML = submitTime;
  cell4.innerHTML = status;


}


function buildOrderString(orders) {
var jsonOrders = JSON.parse(orders);
var orderString = "";

for (var i =0; i < jsonOrders.length; i ++) {
  var localOrder = jsonOrders[i];
  for (var i=0; i < localOrder[i].toppings.length; i++) {
    toppings = toppings + localOrders[i].toppings[i] + ","
  }
  console.log(toppings);
  orderString = orderString + localOrder.size + " " + localOrder.name + " " + localOrder.category + "<br>"

}
console.log(orderString);

  return orderString
}
