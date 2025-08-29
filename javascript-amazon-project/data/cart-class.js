// Class = object generator (help us generate the objects)

// Use PascalCase, for things that generate objects
class Cart {
  //inside the class we're going to put the properties and methods that we want for each object that we generate
  cartItems;           //shortcut for --> cartItems = undefined;            <-- Public Property (it can be accessed anywhere)
  #localStorageKey;     //shortcut for --> localStorageKey = undefined;     <-- Private Property (it can only be used inside the class)

  // private = it can only be accessed inside the class --> #



  // Constructor = lets us run some setup code after creating an object
  // When we generate an object, it will run this constructor automatically and setup the object
  constructor(localStorageKey) {
    // setup code has 2 steps. we set the "localStorageKey" and then we "loadFromStorage" 
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();     // as a reminder "this" points to the object that we generate
  }

  // More details about constructor
  // 1. Has to be named "constructor", we cant just use any name that we want
  // 2. should not return anthing from a constructor



  #loadFromStorage() {    // loadFromStorage() method should also only be used inside this class. there is really no reason for this code outside to be calling. therefore we made this method also private --> #

    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));  // "this" is going to point to the object that we generate 

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
  }


  saveToStorage() {                                                // shortcut for --> saveToStorage: function() { 
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems)); 
  }


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
    this.saveToStorage();
  }


  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }


  updateDeliveryOption(productId, deliveryOptionId) { 
    let matchingItem; 

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }



}


// Now that we have this class. lets use it to generate these 2 objects again



const cart = new Cart('cart-oop');                               // class uses a similar syntax as a function except we use the word "new" in front of it. 
// This generates a new object using the class
const businessCart = new Cart('cart-business');                       // generate another object using the class


console.log(cart);
console.log(businessCart);

// Each object that we generate from a class is called an "instance" of the class
console.log(businessCart instanceof Cart); // this will check if this object was generated from this class

