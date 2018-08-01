function renderOrderStatus(order) {
  for (var i = 0; i < order.length; i++) {
    createOrderTableEntry(order[i].fields.orderItems, order[i].fields.totalPrice, order[i].fields.orderTime, order[i].fields.orderComplete, order[i].pk, order[i].fields.orderedBy);
  }

}


function createOrderTableEntry(order, total, submitTime, status, orderPK, orderedBy) {

  var table = document.getElementById('orderTableBody');
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);

  cell1.innerHTML = buildOrderString(order)
  cell2.innerHTML = "$" + total;
  cell3.innerHTML = orderedBy;
  cell4.innerHTML = submitTime;
  cell5.innerHTML = returnStatusMessage(status);
  cell6.innerHTML = markOrderAsCompleteButton(orderPK);


}

function returnStatusMessage(status){
  if(status) {
    return "Order Complete"
  } else {
    return "Order Pending"
  }
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
      orderString = orderString + localOrder.size + " " + localOrder.name + " " + localOrder.category + " with " + toppingString + "<br>"
    } else {
      orderString = orderString + localOrder.size + " " + localOrder.name + " " + localOrder.category + "<br>";
    }
  }
  return orderString
}

function markOrderAsCompleteButton(orderPK) {
  var button = '<button onclick="markOrderAsComplete(' + orderPK + ')">Mark Order as Complete</button>'
  return button
}

function markOrderAsComplete(orderPK) {
  var url = '/markOrderAsComplete/' + orderPK;
  var xHttp = new XMLHttpRequest();
  xHttp.onreadystatechange = function() {
    if (xHttp.readyState == xHttp.DONE && xHttp.status == 200) {
      var baseItem = JSON.parse(xHttp.responseText);
      document.getElementById('orderTableBody').innerHTML = '';
      renderOrderStatus(baseItem);


    }
  };
  xHttp.open("GET", url, true);
  xHttp.setRequestHeader("Content-Type", "application/json");
  xHttp.setRequestHeader("X-CSRFToken", csrfToken);
  xHttp.send();

}
