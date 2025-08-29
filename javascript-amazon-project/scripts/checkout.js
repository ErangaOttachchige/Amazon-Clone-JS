import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-class.js'; // this is another syntax we can use for imports, this just runs all the code inside this file
//import '../data/cart-oop.js';
//import '../data/backend-practice.js'


//***********************************************************************************************************************************************************************

// Async Await ---> which is an even better way to handle asynchronous code
// Async Await = is a shortcut for promises
// async = ** makes a function returns a promise **  ( So when we put "async" in front of a function, it makes this function return a promise )

// What is the point of this feature? = "async" lets us use the second feature, "await"

// "await" = lets us **wait** for a promise to finish, before going to the next line.


// ******************************************* we can only use "await", when we are inside an "async" function *************************************

// ******************************************* also "async await" can only be used with promises. it doesnt do anything with callbacks *************************************


async function loadPage() {        // async = makes a function returns a promise 
  
  try {
    // we gonna put the code that could cause an error in to this try{} block

    // Also we can manually create errors,
    // to manually create an error in try catch() {}. we use --> throw
   //  throw 'error1';   // --> this will manually create an error
    // when we get an error it is going to skip the rest of the code inside the try block, and it is going to go straight into catch block

    await loadProductsFetch();      // await ----> lets us write asynchronous code like normal code --->  **wait** for a promise to finish, before going to the next line.

    // "async await" can only be used with promises
    const value = await new Promise((resolve, reject) => {      // reject() is a function, - it lets us create an error in the future
      // throw 'error2';
      loadCart(() => { 
        // reject('error3');                 // after we load the cart (loadCart()), in the future lets create an error using --> reject()
        resolve('value3');                // If we use "await", this value just gets return and, can be saved in a variable
      });
    });

  } catch(error) {
    // if any of the code inside the try{} gets an error, it is gonna run the code inside this catch() {} block
    console.log('Unexpected error. Please try again later.');
  }

  renderOrderSummary();
  renderPaymentSummary(); 

  /*
  return 'value2';                // if we return something from this function, this gets converted into "resolve('value2')"
                                  // this value "value2" is going to be saved in a parameter in the next step
  */
}

loadPage();                      // call the function


//  As mentioned before, we can only use "await", inside an "async" function,
//  Also the closest function has to be "async" .
// async await = shortcut for promises
//             = lets us write asynchronous code like normal code 

// For best practice, use 'async await' over 'promises and callbacks'


//************************************************************************************************************************************************************************ 
// now lets create our first promise(in here we gonna practice promises)
/*
"Promise" is a class
*/

// Creating a new "Promise" object, inisde the constructor we gonna give it a function --> that is just how promises are designed
// "Promise" is a built in class and when we create a "promise", we need to give it a function
// When we create this promise, it is going to run this function **Immediately**
// So when we create a promise, it runs the inner function *Immediately**
// This inner function gets a parameter called "resolve", and also "resolve" is a function
// "resolve" function - similar to Jasmine's done() function
// "resolve" function - lets us control when to go to the next step
// for eg: lets add some asynchronous code in to this promise

// we can run multiple Promises at the same time. To do that we can use a feature called "Promise.all()"
// "Promise.all()" - lets us run multiple promises at the same time.
//                 - and wait for *all* of them to finish.


/*
Promise.all([
  //inside this array we can give it multiple promises to wait for


  // 
  // new Promise((resolve) => {
  //   loadProducts(() => {            
  //     resolve('value1');
  //   });
  // }),
  // 


  loadProductsFetch(),          // Remember that in here we must need to give this a "Promise" to "Promise.all()" and also remember that ""loadProductsFetch()"" returns a "Promise", therefore we can directly use this function in here.
  new Promise((resolve) => {
    loadCart(() => {    
      resolve();
    });
  })
  // So we basically created an array of promises and then we gonna give this array to "Promise.all()", and it is gonna wait for all of the promises to finish before going to the next step

  // So as usual .then() adds a next step to a Promise.
]).then((values) => {
  console.log(values);          // values that we give to relove() are gonna be saved inside here --> ( values = ['value1', undefined] )
  renderOrderSummary();
  renderPaymentSummary(); 
});
// Prmises are better way to wait for asynchronous code to finish vs Callback
*/




/*
new Promise((resolve) => {
  loadProducts(() => {            // asynchronous code
    // this inner function will run after the loadProducts() function is finished.
    // once loadProducts() is finished we wanna go to the next step. So therefore we gonna call resolve() after loadProducts() function
    resolve('value1');      // So you can see that syntax here id very similar to Jasmine's done() function
    // we can give resolve() a value as well [ eg: resolve('value1'); ]. So whatever we give to resolve, is going to be saved in a parameter inside the next ".then()"
    // So this lets us share a value between 2 steps of a Promise
  });

}).then((value) => {                  // this promises does the same thing as a callback that we had before, (but Promises Helps us avoid nesting and keep our code relatively flat)
  console.log(value);

  // we have a prblem here, we want to wait for loadCart() to finish as well and then go to the next step. However we usually do this using "resolve", but we dont have reolve inisde this function --> (.then() function)
  // ******** To solve this problem inside ".then()", we can also return a "new Promise" as well. It will solve the problem and then we can use "resolve" function in this as well.
  // So inside .then(), if you want to use "resolve" to wait for some code to finish, you can return a new "Promise".
  return new Promise((resolve) => {
    loadCart(() => {                // we can give loadCart() a inner function to run, once loadCart() is finished. So in that inner function we run "resolve()".    
      resolve();  // this will go to te next step
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary(); 
})
*/




// Up above we run some asynchronous code --> loadProducts() --> and then we wait for it to finish and then we call "resolve()" to go to the next step 
// However "Promise" actually creates a seperate line of code or a seperate thread of code. 
// So a mutiple groups of code can be running at the same time using threads by using "Promises"
// The reason "Promises" are designed this way is, it allows JS to do multiple things at the same time.

// SO when the "Promise" finishes it can do a next step. 
// But this next step is gonna be seperate from the rest of the code. It sort of does the next step on the side.

// So right now this promise creates a seperate thread of code, but this seperate thread doesnt actaully have a next step
// (new Promise((resolve) => { ---> loadProducts(() => { --->  resolve(); ---> //Next step )
// So we are going to add one, to add a next step to a promise, at the end we are gonna use a method called, ** .then() **
// we need to give ".then()" a inner function as well.

// resolve() lets us cotrol when to go to the next step

//************************************************************************************************************************************************************************ 

// in here also we gonna give loadProducts() a callback or a function that we want to run in the future

/*
loadProducts(() => {              // Anonymous function (function without a name)
  loadCart(() => {                // this inner function is gonna run after the cart has loaded
    renderOrderSummary();
    renderPaymentSummary();      // Now lets say that we want to wait for the products and the cart to load before we render the page (order summary and payment summary). To do that we need to move these codes inside this inner function of loadCart()
  });
});
*/


// renderOrderSummary();
// renderPaymentSummary();



//************************************************************************************************************************************************************************ 
/*
Promises
- better way to handle asynchronous code / better way to wait for asynchronous code to finish compare to Callbacks(Helps us avoid nesting and keep our code relatively flat)
- similar to Jasmine's done() function
- let us wait for some asynchronous code to finish before going to the next step

Why do we use promises?
- callbacks have a big problem, which is, multiple callbacks cause a lot of nesting 


*/

//***********************************************************************************************************************************************************************

// Async Await ---> which is an even better way to handle asynchronous code
/*
Async Await is a shortcut for promises

*/

//***********************************************************************************************************************************************************************

// Error Handling

// When we are sending HTTP requests, we could get unexpected errors.

/*
why dont we use try/catch everywhere? because -

- error handling is meant to handle **unexpected errors**
- that means our code is correct, but something outside of our control caused the error

*/