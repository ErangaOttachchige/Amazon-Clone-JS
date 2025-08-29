import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js'
import { addOrder } from '../../data/orders.js';

// Now lets start creating the payment summary on the right side of the checkout web page

// Just like the 'orderSummary', let's put all of our code in a function, so we can regenerate the HTML if we need to

export function renderPaymentSummary() {

  // *****As alaways*****
  // Main Idea of JavaScript
  // 1. Save the data
  // 2. Generate the HTML
  // 3. Make it interactive

  // 1. Save the data (In MVC, this is called the 'Model')
  // for this section, the data that we need is just to calculate some numbers related to the payment section
  
  // lets start calculating the first number here, which is the cost of the total products 
  // Steps for total item calculation
  // 1. Loop through the cart
  // 2. For each product, price * quantity
  // 3. Add everything(products price) together (cost of all products)


  let productPriceCents = 0; // lets create a variable to save the result of adding all products price together
  let shippingPriceCents = 0; // lets create a variable to save the result of adding all shipping price together


  // 1. Loop through the cart
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);  // lets save this product in a variable, so we can use it for our calculations
    // 2. For each product, price * quantity
    productPriceCents = productPriceCents + (product.priceCents * cartItem.quantity);
    // 3. Add everything(products price) together (cost of all products)

    
    // Each 'cartItem' has a property, 'deliveryOptionId', so we need to use this ID to get the full delivery Option which has the price (that function was created in deliveryOptions.js)
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    // Now we can get the price for the delivery option & // Add all the shipping costs together
    shippingPriceCents = shippingPriceCents + deliveryOption.priceCents;

  });


  // That's how we calculate the first number in the the right hand payment summary section in the web page

  // Now let's calculate the second number which is cost of shipping and hadling
  // for that, these are the steps
  // 1.Loop through the cart
  // 2.Add all the shipping costs together

  // above we already looping through the cart, so instead of creating another loop let's just calculate the shipping cost in the same loop above

  //console.log(productPriceCents);
  //console.log(shippingPriceCents);

  // next number we need to calculate is the 'total before tax'
  const totalbeforeTaxCents = productPriceCents + shippingPriceCents;

  // And the next number is the (10%) tax
  const taxCents = totalbeforeTaxCents * 0.1;

  // Finally calculate the total
  const totalCents = totalbeforeTaxCents + taxCents;  
  
  // In the above that's how we calculate all the numbers in the payment section summary, and now we have all the data that we need




  // Next Part is............
  // 2. Generate the HTML (In MVC, this is called the 'View')


  // Lets create a varaible to store the HTML
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalbeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary
      js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;


  document.querySelector('.js-place-order').addEventListener('click', async () => {   // when we click this button, we gonna make a request to the backend, to create the order.
    //inside here we gonna make a request to the backend using fetch() method
    // this time we need to send some data to the backend as well(we need to send our cart to the backend in order to create an order), so we use 'POST' method here
    // In this situation we want to create an order, so we gonna use 'POST' = tp create something, 'POST' lets us send data to the backend
    try{
      // to create a ''POST' request, we gonna give fetch() a 2nd parameter, which is an object {}
      const response = await fetch('https://supersimplebackend.dev/orders', {      // remember, we can only use 'await' inside 'async' function
        method: 'POST', // type of the request
        headers: {      // headers gives the backend, more information about our request. This is needed when we are sending data to the backend
          'Content-Type': 'application/json'    // this tells the backend, what type of data we are sending in our request (here we gonna send some JSON, which is basically a JavaScript Object)
        },
        body: JSON.stringify({        // actual data we gonna send to the backend
          cart: cart
        })
        // finally we cant send an object directly in our request, because 'Content-Type' is 'JSON'. So we need to convert it into a JOSN string too.
      });

      //remember that to get the data that is attached to the response, we need to use --> response.json() ---> remember that this is also a 'Promise', so at the front we can use 'await', to wait for this promise to finish too before going to the next step.
      const order = await response.json()    // also this gives us the data,that is attached to the response (in this case which should be the order that was created by the backend)
      

      //console.log(order);
      addOrder(order); // after we create an order from the backend, we gonna addded it to the array and save it in localStorage


    } catch(error) {
      console.log('Unexpected error. Try again later.');
    }
    
    // ******************************************************************************************************************************************************************************************
    // Last step is after we create an order, we need to go to the orders page when we click the "place your order" button

    // to do that we gonna use an object called ---> "window.location"
    // window.location ---> is a special object provided by JS and it lets us control the URL at the top of the browser


    // if we change the location object (window.location), it will change the URL at the top
    window.location.href = 'orders.html';    // 'orders.html' is a file path
  });

}



// Last Step....
// 3. Make it interactive (In MVC, this is called the 'Controller')


// **************************************************************************************************************************************************************************************************

// URL parameters = lets us save the data directly in the URL
// ex: http://127.0.0.1:5500/orders.html?orderId=123 --> ? means we are ading a URL parameter to this URL
// So a parameter is a property value pair
// Using URL parameters we can save some data in the URL like this --> http://127.0.0.1:5500/orders.html?orderId=123

