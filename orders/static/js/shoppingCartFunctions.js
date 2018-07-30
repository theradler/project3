function populateShoppingCart(orders) {
  for (var i = 0; i < orders.length; i++) {
    var localOrder = orders[i]
    var toppings = presentToppings(localOrder.toppings);
    createOrderTableEntry((localOrder.category + " " + localOrder.name), localOrder.size, localOrder.cost, toppings, localOrder.id, localOrder.menu_id)
  }
}

function createOrderTableEntry(item, size, price, toppings, id, menu_id) {
  if (!toppings) {
    toppings = " ";
  }
  if (!size) {
    size = " ";
  }
  var table = document.getElementById('orderTable')
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  //set value
  cell1.innerHTML = item;
  cell2.innerHTML = size;
  cell3.innerHTML = toppings;
  cell4.innerHTML = ("$" + price);
  cell5.innerHTML = '<a href="/editOrder/' + id + "/" + menu_id + '">edit</a>';

}

function presentToppings(toppings) {
 var toppingString ="";
 if (toppings.length == 0) {
   return null;
 }
 for (var i=0; i < toppings.length; i++) {
   toppingString  = toppingString + toCamelCase(toppings[i]) + ", ";
 }
 toppingString = toppingString.substring(0, toppingString.length -2);
 return toppingString;
}


function getTotal(orders) {
  var totalCost = 0;
  for (var i = 0; i < orders.length; i++) {
    totalCost = parseFloat(totalCost) + parseFloat(orders[i].cost)
  }
   renderTotal(totalCost);
}

function renderTotal(totalCost) {
  var totalField = document.getElementById('totalField')
  var total = document.createElement('h3');
  total.innerHTML = ("Total: $" + totalCost.toFixed(2));
  totalField.appendChild(total);
}

function toCamelCase(str) {
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}

function LinkFormatter(value, row, index) {
  return "<a href='"+row.url+"'>"+value+"</a>";
}
