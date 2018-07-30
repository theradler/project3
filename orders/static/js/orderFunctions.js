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
  input.setAttribute('value',cost);
  input.setAttribute('class',"sizeForm");
  var label = document.createElement('label');
  label.setAttribute('class', 'form-check-label');
  label.setAttribute('for', nameOfOption);
  label.appendChild(document.createTextNode((nameOfOption + " $" + cost)));

  //combine and return div object
  div.appendChild(input);
  div.appendChild(label);
  return div
}

function renderToppingsOption(nameOfOption,div) {
  // var div = document.createElement('div');
  // div.setAttribute('class', 'form-check');

  var input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('class', 'form-check-input')
  input.setAttribute('name', nameOfOption);

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
button.setAttribute('type','submit');
button.setAttribute('class',"btn btn-primary");
button.appendChild(document.createTextNode("Add to Order"));
button.setAttribute('onclick',"addToOrder()")

itemSection.appendChild(button);
}

function toppingsSelectionValidator() {

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

function addToOrder(){
  var itemProperties = itemData[0].fields;
  var size = getSize();
  var toppings = getToppings();
  var orderItem = {
                   'id': guid(),
                   'menu_id': itemData[0].pk,
                   'size' : size.name,
                   'cost': size.cost,
                   'category': itemProperties.category,
                   'name': itemProperties.name,
                   'toppings': toppings
                  }
updateShoppingCart(orderItem);
window.location.href = '/shoppingCart';

}
function getSize() {
  var size = document.getElementsByClassName('sizeForm');
  for(i=0; i < size.length; i++) {
    if(size[i].checked) {
      var size =  {'cost': size[i].value,
                     'name': size[i].name
                   };
      return size;
    }
  }
}

function getToppings() {
  var toppingsList = [];
  var toppingSelection = document.getElementsByClassName('form-check-input');
  for (i=0; i < toppingSelection.length; i++) {
    if(toppingSelection[i].checked) {
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
  localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart))
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
