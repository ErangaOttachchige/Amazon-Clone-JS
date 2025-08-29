// Now we are going to convert this code into object oriented programming
// So we are going to group all the data and the functions together into an object

// As a reminder (export let cart;) --> shortcut for: (export let cart = undefined;)

// lets create an object
const cart = {
  //cart: undefined,  // this is the same thing as "cart = undefined;" , but we moved that value into an object
  
  // now one problem here is if we access this "cart" property above, we are going to do "cart.cart" , which can be a bit confusing
  // so lets actually rename this property(cart) to "cartItems" instead
  cartItems: undefined,

  // Next we are going to group all of our functions into this object as well
  // we cant use words like "export", "let" inside an object as well
  // also inside an abject, these functions, we are going to convert these also into properties and values as well


  // function inside an object => method
  loadFromStorage() {                            // JavaScript has a shortcut for methods called Shorthand Method Syntax. 
  // We used Shortcut for  ==>    loadFromStorage: function() { },  that we had before
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));

    if(!this.cartItems){
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  },
  // that's how we move a function into an object 

  // however we have a small problem here. If we change the name of the object(cart) up here, this code(ex: cart.cartItems) will no longer work.
  // to solve this problem, JavaScript has a feature called "this".
  // "this" gives us the object that contains this above function, that means it gives us this outer object(cart) up here
  // So to improve our code we are going to change from using the variable name "cart" to "this" --> (ex: cart.cartItems --> this.cartItems)

  // "this" will give us the outer object of this function and now this above function code will always work and it doesn't matter the object variable name is.



  // lets move the other functions into this object as well.
  saveToStorage() {                                                // shortcut for --> saveToStorage: function() { 
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems)); 
  },


  addToCart(productId) {                                          //  shortcut for --> addToCart: function(productId) {    
    let matchingItem; 

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if(matchingItem) {
      matchingItem.quantity = matchingItem.quantity + 1
    }
    else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();  // also the function saveToStorage() was moved inside the object. 
    // so now to access this function, we are going to get the outer object again using "this"(refers to the "cart" object) and then .saveToStorage() --> this.saveToStorage()
  },


  removeFromCart(productId) {  //Shorthand Method Syntax
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  },
  
  
  updateDeliveryOption(productId, deliveryOptionId) {  //Shorthand Method Syntax
    let matchingItem; 

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

};


// loadFromStorage() was moved inisde the "cart" object
cart.loadFromStorage();





// **************************************************************************************************************************************************************************************
// another reason we use oop is it's Easy to create multiple objects

const businessCart = {
  //cart: undefined,  // this is the same thing as "cart = undefined;" , but we moved that value into an object
  
  // now one problem here is if we access this "cart" property above, we are going to do "cart.cart" , which can be a bit confusing
  // so lets actually rename this property(cart) to "cartItems" instead
  cartItems: undefined,

  // Next we are going to group all of our functions into this object as well
  // we cant use words like "export", "let" inside an object as well
  // also inside an abject, these functions, we are going to convert these also into properties and values as well


  // function inside an object => method
  loadFromStorage() {                            // JavaScript has a shortcut for methods called Shorthand Method Syntax. 
  // We used Shortcut for  ==>    loadFromStorage: function() { },  that we had before
    this.cartItems = JSON.parse(localStorage.getItem('cart-business'));

    if(!this.cartItems){
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  },
  // that's how we move a function into an object 

  // however we have a small problem here. If we change the name of the object(cart) up here, this code(ex: cart.cartItems) will no longer work.
  // to solve this problem, JavaScript has a feature called "this".
  // "this" gives us the object that contains this above function, that means it gives us this outer object(cart) up here
  // So to improve our code we are going to change from using the variable name "cart" to "this" --> (ex: cart.cartItems --> this.cartItems)

  // "this" will give us the outer object of this function and now this above function code will always work and it doesn't matter the object variable name is.



  // lets move the other functions into this object as well.
  saveToStorage() {                                                // shortcut for --> saveToStorage: function() { 
    localStorage.setItem('cart-business', JSON.stringify(this.cartItems)); 
  },


  addToCart(productId) {                                          //  shortcut for --> addToCart: function(productId) {    
    let matchingItem; 

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if(matchingItem) {
      matchingItem.quantity = matchingItem.quantity + 1
    }
    else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();  // also the function saveToStorage() was moved inside the object. 
    // so now to access this function, we are going to get the outer object again using "this"(refers to the "cart" object) and then .saveToStorage() --> this.saveToStorage()
  },


  removeFromCart(productId) {  //Shorthand Method Syntax
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  },
  
  
  updateDeliveryOption(productId, deliveryOptionId) {  //Shorthand Method Syntax
    let matchingItem; 

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

};


// loadFromStorage() was moved inisde the "cart" object
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);



// currently there is an obvious problem with how we are creating mutiple objects which is we are copy pasting lot of code

// Therefore we are Using a function to create mutiple objects