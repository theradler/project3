function renderItem(item) {
  var itemSection = document.getElementById('itemContainerSection');
  renderPizzaItemTitle(item, itemSection);
  renderSizeForm(item, itemSection);
}


function renderPizzaItemTitle(item, itemToAppend) {
  var title = document.createElement('h2');
  title.appendChild(document.createTextNode(toCamelCase(item.name) + " " + toCamelCase(item.category)));
  itemToAppend.appendChild(title);
}

function renderSizeForm(item, itemToAppend) {

  if (item.largePrice == null) {
    return
  };
  console.log("render size form")
  var formDiv = document.createElement('form');
  formDiv.id = 'orderForm'

  //create Subtitle

  formDiv.appendChild(buildSizeForm(item.largePrice, "Large"));
  formDiv.appendChild(buildSizeForm(item.smallPrice, "Small"))

  //attach to form
  var subTitle = document.createElement('h4');
  var hr = document.createElement('hr');
  subTitle.appendChild(document.createTextNode("Select a Size"));
  itemToAppend.appendChild(subTitle);
  itemToAppend.appendChild(hr);
  itemToAppend.appendChild(formDiv);
}

function renderToppingsForm(item) {
  if (item.length == 0) {
    return
  }
  var itemSection = document.getElementById('itemContainerSection');
  var subTitle = document.createElement('h4');
  var hr = document.createElement('hr');
  subTitle.appendChild(document.createTextNode("Select Toppings"));
  itemSection.appendChild(subTitle);
  itemSection.appendChild(hr)
  var div = document.createElement('form');
  div.setAttribute('class', 'form-check');

  //loop through all toppings delived to page and render them
  for (i = 0; i < item.length; i++) {
    div = renderToppingsOption(item[i].fields.name, div)
  }
  itemSection.appendChild(div);
  itemSection.appendChild(hr);
}

function buildSizeForm(cost, nameOfOption) {
  var div = document.createElement('div');
  div.setAttribute('class', "form-check form-check-inline");
  var input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('name', nameOfOption);
  input.setAttribute('value', cost);
  input.setAttribute('class', "sizeForm");
  input.setAttribute('id', ('radio' + nameOfOption));
  input.setAttribute('onclick', 'onClickSize(' + nameOfOption + ')');

  var label = document.createElement('label');
  label.setAttribute('class', 'form-check-label');
  label.setAttribute('for', nameOfOption);
  label.appendChild(document.createTextNode((nameOfOption + " $" + cost)));

  //combine and return div object
  div.appendChild(input);
  div.appendChild(label);
  return div
}

function onClickSize(optionSelected) {
  var sizeOptions = document.getElementsByClassName('sizeForm');
  for (var i = 0; i < sizeOptions.length; i++) {
    if (sizeOptions[i].name != optionSelected.name) {
      sizeOptions[i].checked = false;
    }
  }

}

function toppingsValidator() {
  resetError();
    document.getElementById('submitOrderButton').disabled=false;
  var toppingsSelector = document.getElementsByClassName('form-check-input');
  var numberOfToppings = 0;
  var allowedToppings = itemData[0].fields.numberOfToppings;
  for (var i = 0; i < toppingsSelector.length; i++) {
    if (toppingsSelector[i].checked) {
      numberOfToppings++
    }
  }
  if (numberOfToppings > allowedToppings) {
    var errorMessage = "You have selected too many options, you can have a total of " + allowedToppings;
    raiseError(errorMessage);
    document.getElementById('submitOrderButton').disabled=true;
  }
};

function raiseError(errorMessage) {
  var errorDiv = document.getElementById('orderError')
  errorDiv.innerHTML = ''
  errorDiv.innerHTML = errorMessage;
  errorDiv.style.display = 'block';
}

function resetError() {
  var errorSection = document.getElementById('orderError');
  errorSection.innerHTML = ''
  errorSection.style.display='none';
}

function renderToppingsOption(nameOfOption, div) {
  // var div = document.createElement('div');
  // div.setAttribute('class', 'form-check');

  var input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'form-check-input')
  input.setAttribute('name', nameOfOption);
  input.setAttribute('onclick', 'toppingsValidator()');

  var label = document.createElement('label');
  label.setAttribute('class', 'form-check-label');
  label.setAttribute('for', nameOfOption);
  label.appendChild(document.createTextNode(nameOfOption));

  //combine and return div
  div.appendChild(input);
  div.appendChild(label);

  return div

}

function addAddToOrderButton() {
  var itemSection = document.getElementById('itemContainerSection');

  //create button
  var button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.setAttribute('class', "btn");
  button.appendChild(document.createTextNode("Add to Order"));
  button.setAttribute('onclick', "addToOrder()");
  button.setAttribute('id', 'submitOrderButton');

  itemSection.appendChild(button);
}

function getNumberOfToppingsSelected() {
  var selections = document.getElementsByClassName("form-check-input")
  var count = 0;
  for (var i = 0; i < selections.length; i++) {
    if (selections[i].type === "checkbox" && selections[i].checked === true) {
      count++;
    }
  }
  return count;
}

function addToOrder() {
  var cost;
  var itemProperties = itemData[0].fields;
  resetError();
  if (itemData[0].fields.defaultPrice) {
    cost = itemData[0].fields.defaultPrice;
    var size = " ";
  } else {
    var size = getSize();
    if (!size) {
      raiseError('You Must Select a Size')
      return;
    }
    cost = size.cost;
    size = size.name;

  }

  var toppings = getToppings();
  var orderItem = buildOrderItem(itemData[0].pk, size, cost, itemProperties.category, itemProperties.name, toppings);
  updateShoppingCart(orderItem);
  console.log(orderItem);
  window.location.href = '/shoppingCart';

}

function buildOrderItem(menu_id, size, cost, category, name, toppings) {
  var orderItem = {
    'id': guid(),
    'menu_id': menu_id,
    'size': size,
    'cost': cost,
    'category': category,
    'name': name,
    'toppings': toppings
  }
  return orderItem;

}


function getSize() {
  var size = document.getElementsByClassName('sizeForm');
  for (i = 0; i < size.length; i++) {
    if (size[i].checked) {
      var size = {
        'cost': size[i].value,
        'name': size[i].name
      };
      console.log(size);
      return size;
    }
  }
}

function getToppings() {
  var toppingsList = [];
  var toppingSelection = document.getElementsByClassName('form-check-input');
  for (i = 0; i < toppingSelection.length; i++) {
    if (toppingSelection[i].checked) {
      toppingsList.push(toppingSelection[i].name);
    }
  }
  return toppingsList;
}

function updateShoppingCart(orderItem) {
  var shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  if (!shoppingCart) {
    shoppingCart = [];
  }
  shoppingCart.push(orderItem);
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
}

function loadOrderForEdit() {
  var orderForEdit = localShoppingCart.find(obj => {
    return obj.id == orderId
  })
  for (var i = 0; i < orderForEdit.toppings.length; i++) {
    var checkBox = document.getElementsByName(orderForEdit.toppings[i])
    checkBox[0].checked = true;
  }
  console.log(orderForEdit.size);
  if (orderForEdit.size.toLowerCase() == 'large') {
    var sizeSelector = document.getElementsByName('Large')
    sizeSelector[0].checked = true;
  } else if (orderForEdit.size.toLowerCase() == 'small') {
    var sizeSelector = document.getElementsByName('Small');
    sizeSelector[0].checked = true;
  }

}

function removeItemFromOrder() {
  removeItem();
  window.location.href = '/shoppingCart';
}

function removeItem() {
  var updatedLocalShoppingCart = [];
  updatedLocalShoppingCart = localShoppingCart;
  updatedLocalShoppingCart = updatedLocalShoppingCart.filter(obj => {
    if (obj.id !== orderId) {
      return obj;
    }
  })
  localStorage.setItem('shoppingCart', JSON.stringify(updatedLocalShoppingCart));
}

function updateOrder() {
  removeItem();
  var itemProperties = itemData[0].fields;
  if (itemData[0].fields.defaultPrice) {
    cost = itemData[0].fields.defaultPrice;
    var size = " ";
  } else {
    var size = getSize();
    cost = size.cost;
    size = size.name;
  }
  var toppings = getToppings();
  var orderItem = buildOrderItem(itemData[0].pk, size, cost, itemProperties.category, itemProperties.name, toppings);
  updateShoppingCart(orderItem);
  window.location.href = '/shoppingCart';
}


function toCamelCase(str) {
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
