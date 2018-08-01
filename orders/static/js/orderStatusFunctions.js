function noPeeking(loggedInUser, orderUser) {
  if (loggedInUser != orderUser) {
    window.location.href = '/unauthorized/'
  }
}

function renderOrderStatus(order) {
  order = order[0].fields;
  console.log(order.orderTime);
  createOrderTableEntry(order.orderItems, order.totalPrice, order.orderTime, order.orderComplete);
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
  console.log(orders.slice(1, -1));
var jsonOrders = JSON.parse(orders.slice(1, -1));
console.log(jsonOrders);

  return 'order'
}
