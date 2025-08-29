import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

// Lets start by creating a test suite
describe("test suite: renderOrderSummary", () => {
  // renderOrderSummary() creates a part of the web page, so when we are testing a web page, 2 things we need to test:
  // 1. How the page looks
  // 2. How the page behaves

  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  // ********************************************************************************************************************************************************************************************************
  // To Create a Hook we are going to use another function provided by Jasmine (beforeEach hook)
  // beforeEach hook will run its inside function before each of outr tests

  // Hooks = lets us run some code for each test
  // eg: notice that before each of our tests we do bunch of a setup code to evry test in the beginning
  // So we can actually share all of this code, between our two tests using a 'Hook'

  // Hooks in Jasmine
  // beforeEach() = runs code before each test
  // afterEach() = runs code after each test
  // beforeAll() = runs code before all tests
  // afterAll() = runs code after all tests

  /*
  we could call loadProducts() inside beforeEach() hook, but it will load the products before each of the tests, 
  so it will loaded multiple times and we dont really need to do that, we only need to load the products once for all of our test
  to do that we gonna use another hook provided by jasmine called "beforeAll()"
  */

  // this will run a function before all of the tests
  beforeAll((done) => {
    // remember that "loadProductsFetch()" returns a Promise and we can attach more steps to this Promise
    loadProductsFetch().then(() => {
      done();
    });
  });

  /*
  remember that "loadProducts()" is asynchronous, that means it just sends a request to the backend but it doesnt wait for the resoponse to come back,
  so it would just send a request and then continue with the rest of the test code, 
  and unfortunately at this point the response has not come back yet, and products is still an empty array.

  To fix this issue, we need to wait for  "loadProducts()" to finish first, and then continue with the rest of the test.
  To do that **Jasmine has a feature for waiting for some code to finish called a "done()" funcion**

  ** So "done()" is a function and it is provided by Jasmine 
  When we add this "done" parameter to the inner function of beforeAll() hook, it will not automatically go to the next step and now it is just gonna wait,
  and it will only go to the next step, when we call this "done()" function. Then it will go to the next step.
  If we dont call "done()" function, then "beforeAll()" hook will just keep waiting forever.

  ** done() function lets us to control when to go to the next step

  */



  beforeEach(() => {
    // it's recommended not to modify local storage in our tests, so we should also need to mock localStorage.setItem()
    spyOn(localStorage, "setItem");

    // Lets do the same setup as the first test
    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadFromStorage();
    //so above this will setup the HTML element that we need for the js-order-summary, as well as the cart.

    // after this lets render the order summary
    renderOrderSummary();
  });

  // ********************************************************************************************************************************************************************************************************

  // 1. How the page looks
  it("displays the cart", () => {
    // So renderOrderSummary usually displays the cart on the web page
    // However in our tests, where does this cart get displayed?

    // So if we look at the code in renderOrderSummary() function, we generated the HTML for the cart and then after we generate the HTML, we put the HTML inside an element with the calss 'js-order-summary'.

    // However we dont have this 'js-order-summary' element in our test files. So to fix this we are just going to create an element with the class 'js-order-summary'

    // to do that we are going to test.html file --> (check 'test.html')

    // //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    // // from test.html file -->
    // document.querySelector(".js-test-container").innerHTML = `
    //   <div class="js-order-summary"></div>
    // `;
    // // And then inside this container [document.querySelector('.js-test-container')],  we gonna create an element with the class 'js-order-summary'

    // /*
    // document.querySelector('.js-test-container').innerHTML = `
    //   <div class="js-order-summary"></div>
    // `;

    // so this --> [ <div class="js-order-summary"></div> ] basically takes the HTML and put it inside our test container [js-test-container], so that means it will put inside test.html <div> element (<div class="js-test-container"></div>).
    // */

    // // And now we have the element (<div class="js-order-summary"></div>)), that we need for 'renderOrderSummary()', so when we call this function, it is going to create the cart and display it in this element here (<div class="js-order-summary"></div>)

    // // **************************************************************************************************************************************************************************************
    // // Next if we look at the code for renderOrderSummary() function, you will notice that it takes the 'cart' and displays it on the web page. But remember that by default we load this 'cart' from localStorage and this can cause problems in our test, depending on what is inside localStorage. So to fix this we are going to mock localStorage.getItem() again, to contorl exactly what is inside this 'cart'.

    // const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    // const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    // spyOn(localStorage, "getItem").and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: productId1,
    //       quantity: 2,
    //       deliveryOptionId: "1",
    //     },
    //     {
    //       productId: productId2,
    //       quantity: 1,
    //       deliveryOptionId: "2",
    //     },
    //   ]);
    //   // this time do set-up the test, we are going to put a product into the cart at the beginning and then we are going to add the same product to the cart
    //   // So now when we do localStorage.getItem(), it will give back this above array with the above object as the starting cart
    // });
    // // And then we need to make sure that we reload the cart from storage
    // loadFromStorage();

    // // **************************************************************************************************************************************************************************************

    // // and now that the HTML "<div class="js-order-summary"></div>", and the 'cart' details are set up for the function and so at the bottom we can call the function
    // renderOrderSummary();
    // //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    // So now lets run this test file in test.html and then you can see that the cart was rendered fully detailed onto that jasmine test (web)page in the web, (also the other jasmine reults from previous tests are at the bottom of the web page as usual)

    // you will notice that when we render the cart in web page using test.html file, it didnt load any CSS or images, and that is okay because we cant really use code to check if the page visually looks correct, however we can use this to check the contents of the page like if the products and quantities are correct.

    // When we render the order summary in orderSummary.js file, for each product in the cart, we created an element with the class "js-cart-item-container". Since we have 2 products in the cart, lets check that we created 2 of these elements on the page

    expect(
      // this code gives us an array of elements --> document.querySelectorAll('.js-cart-item-container')
      document.querySelectorAll(".js-cart-item-container").length
    ).toEqual(2);

    // another thing we can test is if the product quantities are correct
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    // after our tests we can actually remove all of this HTML from rendering on the web page
    document.querySelector(".js-test-container").innerHTML = "";
    // because in our test, all the HTML that we created was placed inside this ".js-test-container"
    // this is just some cleanup we can do at the end of each test
  });

  // Hooks = lets us run some code for each test
  // eg: notice that before each of our tests we do bunch of a setup code to evry test in the beginning
  // So we can actually share all of this code, between our two tests using a 'Hook'

  // 2. How the page behaves(second test in an Integration test)

  // lets create a new test to make sure that the delete link behaves correctly
  it("removes a product", () => {
    // //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
    // // it's recommended not to modify local storage in our tests, so we should also need to mock localStorage.setItem()
    // spyOn(localStorage, 'setItem');

    // // Lets do the same setup as the first test
    // document.querySelector(".js-test-container").innerHTML = `
    //   <div class="js-order-summary"></div>
    //   <div class="js-payment-summary"></div>
    // `;

    // const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    // const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    // spyOn(localStorage, "getItem").and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: productId1,
    //       quantity: 2,
    //       deliveryOptionId: "1",
    //     },
    //     {
    //       productId: productId2,
    //       quantity: 1,
    //       deliveryOptionId: "2",
    //     },
    //   ]);
    // });

    // loadFromStorage();
    // //so above this will setup the HTML element that we need for the js-order-summary, as well as the cart.

    // // after this lets render the order summary
    // renderOrderSummary();
    // //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

    // So once we have displayed this on the web page, we are going to get the delete link and click it.

    // So first, lets get the delete link into our code. first go to the orderSummary.js file and inisde the HTML and find the 'delete-quantity-link', and lets test the delete link for the first product in the cart
    // We are going to get the delete link for the first productId
    // here it is --> [  document.querySelector(`.js-delete-link-${productId1}`)  ]

    // now we need to click this delete link to remove the first product from the page and from the cart.
    // To click an element using code, we can just get it using the DOM and then use the method --> .click()
    // THis will click delete on the first product and remove it.
    document.querySelector(`.js-delete-link-${productId1}`).click();

    // there will be an error(shown bottom of the page) because forgot to add [ .js-payment-summary ] element in this test.
    // one way to fix this is to add this element to this test. (Added to the above HTML code - check the 2nd test HTML code --> <div class="js-payment-summary"></div>)

    // now the error solved

    // Now lets try some expectations down here.
    expect(
      // this code gives us an array of elements --> document.querySelectorAll('.js-cart-item-container')
      // after we click delete for the first product we expect that there is only one element left on the page for the cart
      document.querySelectorAll(".js-cart-item-container").length
    ).toEqual(1);
    // because we removed this product from the page, we expect this result to be 'null'
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    // lets also check that the second product is still on the page because we didnt delete it
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    // if we use the [.not] property it will ckeck te opposite of whatever is next
    // So remember, the code for Jasmine is designed to read like English

    // there is one more thing that we need to check here, which is after deleting ***is the cart array iteslf updated? Lets check that too
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    // after our tests we can actually remove all of this HTML from rendering on the web page
    document.querySelector(".js-test-container").innerHTML = "";
    // because in our test, all the HTML that we created was placed inside this ".js-test-container"
    // this is just some cleanup we can do at the end of each test
  });
});

// TypeError: Cannot set properties of null (setting 'innerHTML')
// THis means that a value is null and we are trying to give it a property
// eg:
// variable1 = null;
// variable1.innerHTML = '....'
// --> wrong, why --> this cannot be done because of variable1 = null

// Integration Test = tests many units/pieces of code working together
