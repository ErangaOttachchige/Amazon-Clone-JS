// Now we gonna choose which variables can be accessed outside of this file using "export" keyword


export let cart;

loadFromStorage(); // when we load this file, we need to run this function at least once

export function loadFromStorage() {
  // make it easier for us to develop we are just going to add some default values into this array
  cart = JSON.parse(localStorage.getItem('cart'));

  // when we first use the webiste we might not have a cart in localStorage, So if we do not have a cart saved in localStorage, localStorage will give us **null** 

  // So in this situation if the *cart* value is null, we want to give the *cart* a default value which is the value below 


  // if we don't have a cart in localStorage cart--> will give us --> null, then "!null" will become truthy

  //  Condition	                                         Result
  //  localStorage.getItem() returns null	               cart = null →  default values used
  //  localStorage.getItem() returns "[]"	               cart = []   →  default values NOT used


  if(!cart){
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
}
 

// A problem with just using a variable to save our cart. It gets reset when we refresh the page or we go to a different page. 
// To solve this problem we are going to use localStorage to save our 'cart'


// function for saving the 'cart' to localStorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); 
  // 1. key: name of whatever we want to save(just a random name)
  // 2. second string is the **data** that we want to save
  // Remember, localStorage can only ***save data as strings***
}

// so now this variable can be used outside of cart.js

export function addToCart(productId) {
  let matchingItem; // This variable will hold the item that matches the product id

  // 1. Check if the product is already in the cart
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  // 2. If it is in the cart, increase the quantity
  if(matchingItem) {
    // we can just type matchingItem here, because if we did find a matchingItem, it will be an object, which is a ***truthy value***
    matchingItem.quantity = matchingItem.quantity + 1
  }
  // 3. If it is not in the cart, add it to the cart.
  else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}


//functin for removing a product from the cart
export function removeFromCart(productId) {

  // How to Remove Product from the cart
  // 1. Create a new array
  // 2. Loop through the cart
  // 3. Add each product(cartItem) to the new array, except for this productId

  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  // last step is we are going to  take our new cart --> "newCart" and replace it with the exsisting cart above --> "cart"

  cart = newCart;

  saveToStorage();
}

// Update deliveryOptionId in the 'cart' array
export function updateDeliveryOption(productId, deliveryOptionId) {
  // So when we update a delivery Option, we need to now the 
  // 1. "product", that we want to update
  // 2. as well as the "Delivery option" that we chose
  // So we are going to need 2 things for this function(1.productId, 2.deliveryOptionId)

  // Steps to do this
  // 1. Loop thorugh the cart and find the product
  // 2. Then Update the deliveryOptionId of that product

  let matchingItem; // This variable will hold the item that matches the productId

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) { // this will give us the "cartItem" that matches the productId(that put as a parameter), and save it in the variable called "matchingItem"
      matchingItem = cartItem;
    }
  });

  // Each "cart" item has a property called "deliveryOptionId", So we are just going to update that property(in here we are doing the updation of deliveryOptionId)
  matchingItem.deliveryOptionId = deliveryOptionId;

  // lastly because we updated the cart,  we should save it to local storage
  saveToStorage();

}




// This style of programming that we have been using throughout this course is called "Procedural Programming"

// Procedure = a set of step-by-step instructions
//           = this is basically a function 
// So In Procedural Programming, we organize our code into seperate functions

// In Object-Oriented Programming (OOP) = we organize our code into objects


//************************************************************************************************************************************************************************
// lets create a function to load the cart from the backend
export function loadCart(fun) {

  const xhr = new XMLHttpRequest();                                                                 // this will generate a new request object

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun(); 
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart')                            
  xhr.send();                                                                         
}