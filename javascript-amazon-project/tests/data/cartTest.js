import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

//Test the addToCart function

// Lets create a test suite for this function
describe('test suite: addToCart', () => {

  // A Best Practice in testing is to --> Test each condition of an if-statement (This is known as Test Coverage)

  // Test coverage = how much of the code is being tested --> (best practice is to, we try to maximize test coverage)

  it('adds an existing product to the cart', () => {

    // again we need to mock localStoarage.setItem()
    spyOn(localStorage, 'setItem');
    // because a mock only lasts for 1 test. So once that test is finished the method is no longer mocked
    // So thats why in this test too we also have to mock localStorage.setItem()

    // first we need to set up the cart so that it already contains the product that we want to add, to do that we gonna mock localStorage.getItem() again
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]); 
      // this time do set-up the test, we are going to put a product into the cart at the beginning and then we are going to add the same product to the cart
      // So now when we do localStorage.getItem(), it will give back this above array with the above object as the starting cart
    });
    // And then we need to make sure that we reload the cart from storage
    loadFromStorage();


    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    // if we add an existing product to the cart, the "cart.length" will still equal 1, because these productIDs are matched and we are just increasing the quantity
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

  });

  it('adds a new product to the cart', () => {

    // in here we are going to mock localStorage.setItem using the function spyOn()
    spyOn(localStorage, 'setItem');
    // remember here the order of the code matters, so we want to mock localstorage.setItem() first, and then we call addToCart() function below

    // So now 'localStorage.setItem' will be replaced with a fake version and 'addToCart()' function will no longer save the data to original localStorage

    // …is enough to: Disable the original 'setItem' so it doesn’t actually write to localStorage



    // at the top of this test we are going to create a mock using another function of Jasmine called "spyOn()", we will give "spyOn()" 2 parameters.
    // the 1st parameter is the object that we want to mock, and in our case it is 'localStorage'
    // the 2nd parameter we will give it a 'string', and this string will be the method that we want to mock, in our case we want to mock ".getItem" method 
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);  // return '[]' not null!
    });
    // So now this above code will repalce 'localStorage.getItem' with a fake version, and we can make this fake version do anything we want, to do that 'spyOn' gives us an object, and this object has a property we can use --> spyOn(localStorage, 'getItem').and...
    // spyOn(localStorage, 'getItem').and --> this result also an object, and this object has a method called '.callFake()'
    // next we are going to give a 'callFake()' a function --> 'callFake(() => {})'
    // And this function is what we want 'getItem' to do, so we are essentially overriding the original 'getItem' with whatever is inside this function, 'callFake(() => {})'
    // So earlier we said we wanted 'getItem' to return the [] empty array for this test
    // So inside this fake function lets make 'getItem' return the [] empty array
    /*
      .callFake(() => {
        return JSON.stringify([]);
      });
    */
    // Now remember that localStorage only supports strings, So we need to return this as a String
    // JSON.stringify() --> this will convert whatever in the brackets to a JSON String and thats what we need for localStorage

    // Now lets test out this mock to see if it works
    console.log(localStorage.getItem('cart')); // output --> []
    // So now we have mocked the 'getItem' method

    
    // After we mock lcalStorage.getItem(), we are going to reload the cart using loadFromStorage() function (--> inside cart.js)
    loadFromStorage();



    // ****************************************************************************************************************************************************
    // However you will also notice in the web page that our test is still failing, So how come it still fails

    // why --> in the very above we imported 'cart' at the top --> (import {addToCart, cart} from '../../data/cart.js';)

    // Reson is this --> So the order of this code matters, first we load the cart from localStorage, and after we are mocking localStorage.getItem()
    // So the cart is already loaded at this point from localStrorage, and this code doesnt have the effect that we want.
    /*
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    */

    // So one way to solve this problem is, after we mock localStorage here, we should reload the cart

    // to reload the cart after we mock we just need to rerun all of these code

    /*
    cart = JSON.parse(localStorage.getItem('cart'));

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
    */

    // So lets create a function in cart.js, so then we can rerun this above code

    // ****************************************************************************************************************************************************


    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    // first lets check if the 'cart.length' is correct
    // So if we assume that we start with an empty 'cart', and when we add a product, the 'cart.length' should be 1
    // So we can compare these 2 values (cart.lengh & 1)
    expect(cart.length).toEqual(1);
    // However the cart doesn't actually start as empty. In 'cart.js', at the top we are loading the cart from localStorage. if there is nothing in localStorage, we use the mentioned default cart.
    // So our starting cart depends on what is inside localStorage, and this is a big problem when testing because localStorage can change. 
    // If there is an empty cart saved in localStorage, our test will pass, but if there is not an empty cart in localStorage then the above test will fail. This is known as a 'Flaky Test'.

    // Now to solve this problem, we are going to use a feature of Jasmine called 'Mocks'.
    // A 'Mock', lets us replace a method with a fake version. 
    // And then we can make the fake version do anything we want.
    // For eg: when we load the 'cart' from 'localStorage', we are using 'localStorage.getItem()'. So we can use a 'mock' to create a fake version of 'getItem'. And then we can make this fake version do anything we want like return an empty array[]
    // So lets go ahead and create our first mock

    // ****************************************************************************************************************************************************
    // Next if we look at the addToCart() in cart.js, at the bottom of that function, you will notice that we are saving the cart to localStorage using saveToStorage() function. 
    // So that is gonna called localStorage.setItem() and, however we dont actually want to save to localStorage this, because this is just a test code
    // we dont want to test code to be modifying localStorage or affecting our real code.
    // Therefore to prevent that we are also going to mock localStorage.setItem() in the above of the code

    //****************************************************************************************************************************************************
    // spyOn() has another useful feature which is  --> it records every time a method is used
    //eg: what if we want to make sure that 'addToCart()' --> saves the 'cart' to 'localStirage' at the end. 
    // In our tests 'setItem' is mocked. So we cant really check what is inside the 'localStorage', instead we can just check if 'addToCart()' function calls 'setItem' at some point.
    // To check if 'setItem' is called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // this above method checks how many times 'localStorage.setItem' was cold in the above code snippet, so we expect it to be called once(inside addToCart() function), so we gonna give it the number 1

    // So keep in mind this above code line only works, (localStorage.setItem) --> only if this method has been mocked with spyOn().

    // also after we mocked a method we can check how many times that method was called, and we can even check what values this method received

    // also another thing you will notice here is that each test have multiple expectations(expect() ewa godayi), and the test only pass if all of its expectations pass

    // Now lets add a few more expectations to this test for practice
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    
  });
});

// Flaky Test = A test that sometimes passes and sometimes fails even if we dont change the code


// Mocks = lets us replace a method with a fake version
// A mock only lasts for 1 test