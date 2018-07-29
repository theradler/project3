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

function createMenuElement(categoryName) {
var element = document.getElementById('bodyMenuSection');
var title = document.createElement('h3');
var divider = document.createElement('hr');
var menuItemSection = document.createElement('div');

//create header div
var headerDiv = document.createElement('div')
headerDiv.setAttribute('class',"col-12 mt-4");
headerDiv.id = categoryName;
   //creatre divider element
divider.id = "menuDivider"
divider.setAttribute('class','accent my-5')
//create title elemenet
title.setAttribute('class', "text-center");
title.appendChild(document.createTextNode(toCamelCase(categoryName)));

//createMenuSection
menuItemSection.id = (categoryName.replace(/ /g,'') + "ItemSection");
menuItemSection.setAttribute('class',"card-columns");


//createLoadElement
headerDiv.appendChild(title);
headerDiv.appendChild(divider);
element.appendChild(headerDiv);
element.appendChild(menuItemSection);
}

function loadMenuItems(menuData) {
for (i = 0; i < menuData.length; i++) {
  var tempItem = menuData[i].fields;
  //get correct meny div
  var menuDiv = document.getElementById((tempItem.category.replace(/ /g,'') + "ItemSection"));

  //create col body menu item
  cardBody = document.createElement('div');
  cardBody.setAttribute('class', 'card card-body')

  //createSmallTitleElement
  var smallPriceSpan = document.createElement('span');
  var smallPriceValue = document.createElement('h6');
  smallPriceSpan.setAttribute("class", "float-right font-weight-bold");
  smallPriceSpan.appendChild(document.createTextNode("$" + tempItem.smallPrice));

  smallPriceValue.setAttribute("class","text-truncate");
  smallPriceValue.appendChild(document.createTextNode("Small " + toCamelCase(tempItem.name)));


   //createLargeTitleElement
   var largePriceSpan = document.createElement('span');
   var largePriceValue = document.createElement('h6');
   largePriceSpan.setAttribute("class", "float-right font-weight-bold");
   largePriceSpan.appendChild(document.createTextNode("$" + tempItem.largePrice));

   largePriceValue.setAttribute("class","text-truncate");
   largePriceValue.appendChild(document.createTextNode("Large " + toCamelCase(tempItem.name)));

  //append Price object to col body
  cardBody.appendChild(smallPriceSpan);
  cardBody.appendChild(smallPriceValue);
  cardBody.appendChild(largePriceSpan);
  cardBody.appendChild(largePriceValue);

  menuDiv.appendChild(cardBody);
}
}


function renderMenu() {
  console.log("");
  document.getElementById("menu").innerHTML = "on page load worked";
}

function toCamelCase(str)
{
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}
