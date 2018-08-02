//at page load we generate the category sections based on infro from server
function loadCategory(menuData) {
  var tempCategoryArray = [];
  for (i = 0; i < menuData.length; i++) {
    categoryName = menuData[i].fields.category
    if (!tempCategoryArray.includes(categoryName)) {
      tempCategoryArray.push(categoryName);
      createMenuElement(categoryName);
    }
  }
}
//creates the html element in which all the order items sit
function createMenuElement(categoryName) {
  var element = document.getElementById('bodyMenuSection');
  var title = document.createElement('h3');
  var divider = document.createElement('hr');
  var menuItemSection = document.createElement('div');

  //create header div
  var headerDiv = document.createElement('div')
  headerDiv.setAttribute('class', "col-12 mt-4");
  headerDiv.id = categoryName;
  //creatre divider element
  divider.id = "menuDivider"
  divider.setAttribute('class', 'accent my-5')
  //create title elemenet
  title.setAttribute('class', "text-center");
  title.appendChild(document.createTextNode(toCamelCase(categoryName)));

  //createMenuSection
  menuItemSection.id = (categoryName.replace(/ /g, '') + "ItemSection");
  menuItemSection.setAttribute('class', "card-columns");

  //createLoadElement
  headerDiv.appendChild(title);
  headerDiv.appendChild(divider);
  element.appendChild(headerDiv);
  element.appendChild(menuItemSection);
}
//this beast of function is mostly to generate the complex html necessary for the card based menu. Instead of hardcoding automatically generate these elements so
//that any item added into the menu table will automatically be generated
function loadMenuItems(menuData) {
  for (i = 0; i < menuData.length; i++) {
    var tempItem = menuData[i].fields;
    var itemId = menuData[i].pk;
    //get correct meny div
    var menuDiv = document.getElementById((tempItem.category.replace(/ /g, '') + "ItemSection"));

    //create col body menu item
    cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card card-body')


    //create Price element
    var smallPriceSpan = document.createElement('span');
    var smallPriceValue = document.createElement('h6');
    smallPriceSpan.setAttribute("class", "float-right font-weight-bold");
    smallPriceSpan.appendChild(document.createTextNode("$" + tempItem.smallPrice));

    smallPriceValue.setAttribute("class", "text-truncate");
    smallPriceValue.appendChild(document.createTextNode("Small " + toCamelCase(tempItem.name)));


    //create Price
    if (!tempItem.defaultPrice) {
      var largePriceSpan = document.createElement('span');
      var largePriceValue = document.createElement('h6');
      largePriceSpan.setAttribute("class", "float-right font-weight-bold");
      largePriceSpan.appendChild(document.createTextNode("$" + tempItem.largePrice));

      largePriceValue.setAttribute("class", "text-truncate");
      largePriceValue.appendChild(document.createTextNode("Large " + toCamelCase(tempItem.name)));
            } else {
      var defaultPriceSpan = document.createElement('span');
      var defaultPriceValue =  document.createElement('h6');
      defaultPriceSpan.setAttribute("class", "float-right font-weight-bold");
      defaultPriceSpan.appendChild(document.createTextNode("$" + tempItem.defaultPrice));

      defaultPriceValue.setAttribute("class", "text-truncate");
      defaultPriceValue.appendChild(document.createTextNode(toCamelCase(tempItem.name)));
    };
      //CreateAddToOrderButton
      var addToOrderForm = document.createElement('form');
      var addToOrderButton = document.createElement('button');
      //create form that will redirect to customizeOrder page
      addToOrderForm.setAttribute('method', 'get')
      addToOrderForm.setAttribute('action', ("/customizeOrder/" + itemId));


      //create button and add it form
      addToOrderButton.setAttribute('type', 'submit');
      addToOrderButton.setAttribute('class','btn btn-danger');
      addToOrderButton.appendChild(document.createTextNode('Add to Order'))
      addToOrderForm.appendChild(addToOrderButton);

      //append Price object to col body, adjusts for single price options
      if (!tempItem.defaultPrice) {
      cardBody.appendChild(smallPriceSpan);
      cardBody.appendChild(smallPriceValue);
      cardBody.appendChild(largePriceSpan);
      cardBody.appendChild(largePriceValue);
    } else {
      cardBody.appendChild(defaultPriceSpan);
      cardBody.appendChild(defaultPriceValue);
    }
      cardBody.appendChild(addToOrderForm);
      menuDiv.appendChild(cardBody);

  }
};

//utility function for camelCase, really should have made a generic js utils folder cause I use this everywhere 
function toCamelCase(str) {
  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}
