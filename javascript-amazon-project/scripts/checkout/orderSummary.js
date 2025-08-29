import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";

import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

/* 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Before we continue we're gonna learn about this new syntax that we used above
// The above systax is called a **Default Export** --> (dayjs without curly brackets)
// The other one, (ex: {hello}, with curly brackets) called **Named Export** 
// Default Export - another way of exporting something from a file
//                - we can use it when we only want to export 1 thing from a file

// lets do an example of default export to see how it works
// ******************************************* (ex: hello.js)


// function hello() {
//   console.log('hello');
// }

//export default hello;

// ********************************************

// Also, each file can only have 1 default export, (that means hello.js can only have 1 default export)

// And now when we import this function, we can just import the name without the curly brackets in another file

//ex : import hello from './files/allfiles';

hello();




// according to the dayjs documentation, to get the current date and time we can just use the dayjs() function like this
// var now = dayjs();

// console.log(dayjs());


const today = dayjs();
const deliveryDate = today.add(7, 'days'); // according to the dayjs() documentation
// .add() method takes 2 parameters --> 
// 1 --> number of time that we want to add
// 2 --> length of time as a "string" that we want to add

// console.log(deliveryDate);
console.log(deliveryDate.format('dddd, MMMM D'));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

*/

export function renderOrderSummary() {
  // to combine all the HTML together in this checkout.js file, we use this below variable to store the result
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId; // we use this to search for the full product

    /*
    let matchingProduct; // To save the result

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    }); 

    */

    // Instead of  the above code, we are going to run the getProduct() function that we made for the above codes in product.js
    const matchingProduct = getProduct(productId);

    //console.log(matchingProduct);

    /////////////////////////////////////////////////////
    // inside the 'cart' we only saved the 'deliveryOptionId'. So lets use this 'deliveryOptionId' to get the full deliveryOptions details
    // So lets get the 'deliveryOptionId' out of the cart
    const deliveryOptionId = cartItem.deliveryOptionId;

    // Next we are going to use the above id 'cartItem.deliveryOptionId' to find the full delivery option details

    /*
    let deliveryOption;  // this variable is for store the result

    deliveryOptions.forEach((option) => {
      // here we are going to look for matching id
      if(option.id === deliveryOptionId) {
        deliveryOption = option;   // So Now we have the full delivery option details in our code
        // Now we can use it to get the deliveryDays property and then calculate the delivery date
      }
    });
    */

    // Instead of  the above code, we are going to run the getDeliveryOption() function that we made for the above codes in deliveryOptions.js

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    // Now we can use it to get the deliveryDays property and then calculate the delivery date
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    /////////////////////////////////////////////////////

    //each time we loop through the cart, we are going to add this below HTML to the variable 'cartSummaryHTML', so therefore we combine it


    // Remember we converted all of our products into classes (line 141), 
    // So "matchingProduct" is not a regular object anymore, it's more of an enhanced object, it is a "Product" class
    cartSummaryHTML =
      cartSummaryHTML +
      `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${
        matchingProduct.id
      }">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity 
              js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${
                  cartItem.quantity
                }</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link 
                js-delete-link-${matchingProduct.id}"
                data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // console.log(cartSummaryHTML);

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    // inside here we are going to do 3 steps
    // 1. Loop through the deliveryOptions
    // 2. For each option, we generate some HTML
    // 3. Combine all the HTML together

    // Finally let's combine all this HTML together
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      // *****dayjs() Method*****
      // Calling dayjs() without parameters returns a fresh Day.js object with the current date and time.
      const today = dayjs();

      //  *****Add Method*****
      //  Returns a cloned Day.js object with a specified amount of time added.
      // eg: const a = dayjs();
      //     const b = a.add(7, 'day')
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");

      // **** Format Method *****
      // Get the formatted date according to the string of tokens passed in.
      // To escape characters, wrap them in sqare brackets (eg: [MM])
      // dayjs().format()
      const dateString = deliveryDate.format("dddd, MMMM D");

      // here we using tenary operator for the best practice
      // first we will check if the priceCents is 0, if the first part (deliveryOption.priceCents === 0) returns *true*, the *value* is whatever is whatever is after this ? mark, and if the first part is *false*, then the *value* is whatever is after the : mark, (and here we can save the reult in a variable (priceString))
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      // lets write a code here to figure out which delivery option should be checked because, we do not want all of these delivery options to be checked. We only want it to be checked if it matches the 'deliveryOptionId' that is saved in the 'cart'

      // we only want it to be checked if it matches deliveryOption.id (that is saved in the cart) === cartItem.deliveryOptionId
      // (becaue we don't want all of these delivery options to be checked by ---> 'checked' attribute in radio button)

      // lets write some code below to figure out which delivery option should be checked
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html =
        html +
        `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
          
          ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>    
      `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // <input type = "radio" name="name1"></input>
  // in the radio selector, if the value of attribute 'name' are same, we can only select 1 of them
  // same name = we can only select 1 of them

  //first we are going to select all the delete links on the page using DOM and loop through all the links, and for each of these links we are going to add an eventListener
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      // console.log('delete');

      // when we click 'delete' we are going to do 2 steps
      // 1. Remove the product from the cart
      // 2. Update the HTML
      const productId = link.dataset.productId;
      // explanation: using the link element we can get that product id, "data-proudct-id" ----> using "link.dataset. ..." to access the data attributes, and we gonna access "link.dataset.productId"

      // console.log(productId);
      removeFromCart(productId); // accroding to MVC design pattern this is upating the data (Controller ----> Model)
      //console.log(cart);

      // 2. Update the HTML

      // Steps
      // 1. Use the DOM to get the element that we want to remove
      // 2. Use ".remove()" method

      // Every element that we get from the DOM has method called ***.remove()*** which removes it from the page
      // Ex:
      // const button = document.querySelector('.button');
      // button.remove();

      // from the below code we are able to select the specific container that we want to remove from the webpage
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      //console.log(container);

      // So again, every element we get with the DOM has a method called **.remove()**, which will remove it from the page
      container.remove();

      // Re-generate the all the HTML for payment summary --> this was done according to the MVC design pattern
      // MVC makes sure that the HTML always matches the current data or that the View always matches the Model (Model -----> View)

      // when we click delete, we also update the paymentSummary on the right side of the page, and thats what this below line does
      renderPaymentSummary();
    });
  });

  // for each delivery options we are going to add an event listener and listen for 'click's,  and lets just call each of the delivery options as an 'element'
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      // 1. Update deliveryOptionId in the 'cart' array

      const productId = element.dataset.productId; // get the values out of the data attributes that included in full delivery option <div> element
      const deliveryOptionId = element.dataset.deliveryOptionId;
      // const {productId,deliveryOptionId} = element.dataset;              // Shorthand Property for above 2 lines of code

      updateDeliveryOption(productId, deliveryOptionId); // accroding to MVC design pattern this is upating the data (Controller ----> Model)

      // 2. Update the Page UI ******************************************************************************************************************************************************************************************

      // After we update the data Re-run all the code above
      // and regenerate all the HTML
      renderOrderSummary();
      // this is a better way to keep the page up to date, instead of using the DOM and changing the HTML directly one by one ******************************************************************

      // inside renderOrderSummary() function, we can call renderOrderSummary() function again. So a function can call/re-run itself. This feature is called "RECURSION".
      // This is useful when a function needs to re-run all of its code

      // When we change the delivery options in the the left side part(order summary section), we also want the numbers to update in the right side part(payment summary section)
      // So now according to MVC design pattern we're going to re-generate the HTML for the payment summary section (Model -----> View)
      renderPaymentSummary();
    });
  });
}

// We already have all of the code that takes our data and generates the HTML. So another way to update the page is after we update our data, we just need to rerun all this code, and regenerate all this HTML. SO lets give this a try.

// first we gonna put all of this above code inside a function, so we can rerun it.

// At the bottom, lets run the full function because we still need to run all of these codes at the start of our page
//renderOrderSummary();  I added this function in checkout.js file
// (this should not change anything because we are just running the same code, but now it is just in a function)

// The technique we just used is MVC (Model-View-Controller), MVC is a design pattern
// 1. Update the data
// 2. Regenerate all the HTML

// This MVC is a popular technique in SE

// In MVC we split our code into 3 parts
// 1. Model  = this is all the code that saves and manages the data (ex: In our project, all the code in the 'data' folder is called the 'model'  --> cart.js, deliveryOptions.js, products.js)
// Because this code saves and manages our data

// 2. View  = this is code that takes the data and displays it on the page (Ex: in our project in checkout.js file, generate all the HTML parts, that code is called the 'view')

// 3. Controller = this runs some code when we interact with the page (ex: in our project, these eventListeners would be called as the 'controller', because they do something when we interact with the page or with the 'view')
