# Project 3

Web Programming with Python and JavaScript

This project was incredibly large and scope and if I were to do again I would do the following differently
* price validation and topping validation on both the server and client
* not used local storage for shopping cart, realize now that this would make it extremely easy to tamper with order, worth a point off design for sure


//Style//
Implemented a template for styling on this project in an *attempt* to save time. while the landing page looks great, many components were not compatible with bootstrap 4 and there was a good deal of wrangling to get everything to work. Also my color scheme is imperial germany for an italian restraunt so questionable UZ

//Access//
used the built in DJANGO forms for auth and register but choose to handle errors on my own. Implemented the @login_required bootstrap to gate off portions of the app that require login. Invalid request automatically redirect to the access page

//Menu//
Used these really cool looking card elements with links, everything on this page generates based on menu data from server. Admin could seamlessly add new items and categories and they would just work

//Order Customization//
Nothing spectacular, but it works, was heck to get those checkboxes to align properly, does validation to prevent illegal orders and submits to the local shopping cart

//shopping Cart//
Allows users access to checkout or the edit page. Does validation as well on order legality

//editOrder//
Essentially a clone of the Order Customization page. In hindsight should have had one page for both and generated the buttons, only key difference, in the code, but here we are

//orderStatus//
allows users to see if there orders are complete, has a refresh button that allows them to see updates

//order mangement//
gated to staff users only, allows them to mark orders as complete

//database//
could have had a better structure for sure, not a huge fan on django does primary keys so next project will attempt to supplement with my own logic 
