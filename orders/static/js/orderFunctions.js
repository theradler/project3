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
  var formDiv = document.createElement('div');
  formDiv.id = 'orderForm'
  // renderlargeSize Option

  formDiv.appendChild(buildSizeForm(item.largePrice, "Large"));
  formDiv.appendChild(buildSizeForm(item.smallPrice, "Small"))

  //attach to form
  itemToAppend.appendChild(formDiv)
}

function renderToppingsForm(item) {
  var itemSection = document.getElementById('itemContainerSection');
  console.log(item.length);
  for (i = 0; i < item.length; i++) {
    console.log(item.length)
    var option = renderToppingsOption(item[i].fields.name)
    console.log(item[i]);
    itemSection.appendChild(option);
  }

}

function buildSizeForm(cost, nameOfOption) {
  var div = document.createElement('div');
  div.setAttribute('class', "form-check form-check-inline");
  var input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('name', nameOfOption);
  input.setAttribute('value', cost);
  var label = document.createElement('label');
  label.setAttribute('class', 'form-check-label');
  label.setAttribute('for', nameOfOption);
  label.appendChild(document.createTextNode((nameOfOption + " $" + cost)));

  //combine and return div object
  div.appendChild(input);
  div.appendChild(label);
  return div
}

function renderToppingsOption(nameOfOption) {
  var div = document.createElement('div');
  div.setAttribute('class', 'form-check');

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

function addAddToOrderButtion() {

}



function toCamelCase(str) {
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}
