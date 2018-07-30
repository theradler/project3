function populateShoppingCart(orders) {

var order = createOrderEntry('pizza', 'large','12.50')
var orderTable = document.getElementById('orderBody');
orderTable.appendChild(order);
}

function createOrderEntry(item, size, price) {
  console.log(item)
  var tr = document.createElement('tr');

  var item = document.createElement('td')
  console.log(tr);
  item.innerHTML = item.toString();
  console.log(item);
  tr.appendChild(item);

  var size = document.createElement('td');
  size.appendChild(document.createTextNode(size));
  tr.appendChild(size);

  var price = document.createElement('td');
  price.appendChild(document.createTextNode(price));
  tr.appendChild(price);

  console.log(tr);
  return tr;
}
