

//renders the title & size forms
function renderItem(item) {
  var itemSection = document.getElementById('itemContainerSection');
  renderTitle(item, itemSection);
  renderSizeForm(item, itemSection);
}

// renders title based on data from server
function renderTitle(item, itemToAppend) {
  var title = document.createElement('h2');
  title.appendChild(document.createTextNode(toCamelCase(item.name) + " " + toCamelCase(item.category)));
  itemToAppend.appendChild(title);
}
// creates size form, if item has not size it does not
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

//renders all the toppings
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
  for (var i = 0; i < item.length; i++) {
    div = renderToppingsOption(item[i].fields.name, div, i)
  }
  itemSection.appendChild(div);

  itemSection.appendChild(hr);
}
//builder function for the size form
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
//stops users from selecting two size, if one is selcted deslects the others
function onClickSize(optionSelected) {
  var sizeOptions = document.getElementsByClassName('sizeForm');
  for (var i = 0; i < sizeOptions.length; i++) {
    if (sizeOptions[i].name != optionSelected.name) {
      sizeOptions[i].checked = false;
    }
  }

}
//validates that they don't have too many toppings on their order and returns and error if they do, also locks down submit button
function toppingsValidator() {
  resetError();
  document.getElementById('submitOrderButton').disabled = false;
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
    document.getElementById('submitOrderButton').disabled = true;
  }
};
//utility function for raising erros
function raiseError(errorMessage) {
  var errorDiv = document.getElementById('orderError')
  errorDiv.innerHTML = ''
  errorDiv.innerHTML = errorMessage;
  errorDiv.style.display = 'block';
}

//utility function for dismissing errors
function resetError() {
  var errorSection = document.getElementById('orderError');
  errorSection.innerHTML = ''
  errorSection.style.display = 'none';
}
//builder function for toppings, every 5th topping it inserts a line break, first time using modulo!
function renderToppingsOption(nameOfOption, div, count) {
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
  console.log(parseInt(count % 5));
  if ((parseInt(count) % 5 == 0 && count != 0)){
    div.appendChild(document.createElement('br'));
  }

  return div

}
//builds the add to order button and places it on page
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
//returns the number of toppings selected at point of order submission
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
//acutally submits the order, does validation on size and adds the addon item cost to the total cost
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
    var addOnPrice = getAddOnTotal();
    if (addOnPrice) {
      cost = size.cost;
      cost = parseFloat(cost) + parseFloat(addOnPrice);
    } else {
      cost = size.cost;
    }
    size = size.name;

  }

  var toppings = getToppings();
  var orderItem = buildOrderItem(itemData[0].pk, size, cost, itemProperties.category, itemProperties.name, toppings);
  updateShoppingCart(orderItem);
  window.location.href = '/shoppingCart';

}
//calcualtes the cost of add ons selected
function getAddOnTotal() {
  var toppingsOption = document.getElementsByClassName("form-check-input")
  var toppingCost = 0;
  for (var i = 0; i < toppingsOption.length; i++) {
    if (toppingsOption[i].checked == true) {
      for (var x = 0; x < availableToppings.length; x++) {
        if (toppingsOption[i].name == availableToppings[x].fields.name) {
          toppingCost = parseFloat(toppingCost) + parseFloat(availableToppings[x].fields.price);
        }
      }
    }

  }
  return toppingCost;
}

//builder function that returns a json order item
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

// returns the users selected size and the cost of that size. used at checkout point
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
// adds selected toppings to list, that is then returned to build the order item
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
//submits the order item to updatad shopping cart, given more time would have liked this to submit to the server instead of local memory
function updateShoppingCart(orderItem) {
  var shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  if (!shoppingCart) {
    shoppingCart = [];
  }
  shoppingCart.push(orderItem);
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
}

//this is used on the edit order, loads the configured order so user can make changes
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
//removes the current order in context from the local shopping cart
function removeItemFromOrder() {
  removeItem();
  window.location.href = '/shoppingCart';
}
//utility function that does the acutal removing, used in multiple places
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
//removes current iteration of the order and then inserts updated one
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

//utility for formatting
function toCamelCase(str) {
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}
//generates guids
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
