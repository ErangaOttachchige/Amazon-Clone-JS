import { cart, addToCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// before we run all the below code we are going to load the "products" at the top from the backend

// loadProducts();
loadProducts(renderProductsGrid); // Remeber in JS, functions are also values, so we can use a function as a parameter ---> and this called as a ""Callback""

/* 
Remember that the HTTP requests are asynchronous, loadProducts() will send a request to my backend, but it takes time for the request to travel across the internet to the backend and to travel back, so above code line(loadProducts();) will just send the request, and at the next line the response has not loaded yet. So the "products" array is still empty. And when we run this code with an empty array the page will be empty.

To solve this problem we need to wait for this HTTP request to finish inside the --> loadProducts(); function first, and for the response to come back and then we gonna run the rest of the code in the file

How to solve it
1. Put all the below code inside a function as parameter-> renderProductsGrid()
2. give this function to loadProducts(); --> loadProducts(renderProductsGrid);

*/

/*
//import have another syntax

import * as cartmodule from '../data/cart.js';
cartmodule.cart
cartmodule.addToCart('id');

// this imports everything from a file and groups it together inside this object ('cartmodule') and then we can access each imports as a property or a method
*/

/* 
Put all of our imports at the top of the file

Benefits of Modules

1. Helps us avoid naming conflicts
2. Don't have to worry about order of our JavaScript <script> files

<script src="./data/cart.js"></script>
<script src="./data/products.js"></script>
<script src="./scripts/amazon.js"></script>

before when we loaded everything with script tags we have to make sure the order, we have to make sure that we load cart.js first because we need the cart variable to be created ( const cart = []; ), and then we can use it in 	amazon.js.
So the order of <script> really matter.
*/

function renderProductsGrid() {
  // 1. Save the Data
  // 2. Generate the HTML
  // 3. Make it interactive

  // 1. Save the Data
  // We want to create something that closely matches the data in amozon.html

  // const products = [{
  //   image:'images/products/athletic-cotton-socks-6-pairs.jpg',
  //   name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  //   rating: {
  //     stars: 4.5,
  //     count: 87,
  //   },
  //   // Best practice when calculating money: Calculate in cents
  //   priceCents: 1090
  // }, {
  //   image:'images/products/intermediate-composite-basketball.jpg',
  //   name: 'Intermediate Size Basketball',
  //   rating: {
  //     stars: 4,
  //     count: 127,
  //   },
  //   priceCents: 2095
  // }, {
  //   image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  //   name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  //   rating: {
  //     stars: 4.5,
  //     count: 56,
  //   },
  //   priceCents: 799
  // }, {
  //   image:'images/products/black-2-slot-toaster.jpg',
  //   name: '2 Slot Toaster - Black',
  //   rating: {
  //     stars: 5,
  //     count: 2197,
  //   },
  //   priceCents: 1899
  // }];

  // ********************************************************************************
  // Instead of using our own products array, lets just use the products array in the products.js file. (Check the ./data/products.js file and amazon.html)
  // ********************************************************************************

  // ****** (products) --> So now this variable will be coming from this products.js file

  // For combining all the string together -->
  // ( Last Step)
  // - combine this HTML together
  // - put it on the web page

  let productsHTML = "";

  // 2. Generate the HTML
  // Next step is to use the saved data to generate the HTML in javascript instead of writing HTML manually in .HTML file

  // Loop through the above array
  products.forEach((product) => {
    // ****** (products) --> So now this variable will be coming from products.js file
    // So for each of these products or each of these objects, we want to create some HTML
    productsHTML =
      productsHTML +
      `
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${
              /*one way we can do this with like an if statement or a ternary operator (however we gonna learn a different way to do this using inheritance)
              
              ${
                product instanceof Clothing
                ? `<a href="${product.sizeChartLink}">Size chart<a>`
                : ""
              }
              */
              product.extraInfoHTML() /*  Polymorphism  = use a method without knowing the class (use a method without needing to know exactly what class this is) */
            }

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
              Add to Cart
            </button> 
        </div>
    `;
    // So that is how we use JavaScript to generate all the HTML in the page
  });

  //console.log(productsHTML);

  // Last Step
  // 1. combine all this HTML together

  // 2. put it on the web page (using the DOM)

  // to use the DOM, we are first going to get an HTML element from the HTML page and put it inside our JavaScript

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  // 3. Make it interactive (Last Step of the process)

  // ************************************************* After we have put the HTML on the page, *************************************************************

  function updateCartQuantity() {
    // We need a variable to store the total quantity
    let cartQuantity = 0;

    // make web page's top right cart quantity interactive
    // Steps
    // 1. Calculate the quantity/ total number of products in our cart.
    // 2. Put that quantity on the page.(we can do that using DOM and we need an HTML element for that)

    cart.forEach((cartItem) => {
      cartQuantity = cartQuantity + cartItem.quantity; // this will add up all the quantities and save this in cartQuantity variable
    });

    // After we calculated the quantity
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }

  // this will give us a NodeList of all the 'Add to Cart' buttons on the page, thats why we use .forEach() method to loop through each of the buttons
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      // first we gonna get product name from the <button>
      const productId = button.dataset.productId;
      // Console: DOMStringMap {productName: 'Intermediate Size Basketball'}
      //          productName: "Intermediate Size Basketball"

      // this is what the dataset looks like, it gives us all the data attributes that are attached to the element, So this works just like an object, so to access the productName, we just have to type button.dataset.productName

      // (.dataset) proerty basically gives us all the data- attributes that are attached to the button
      // So also notice that the name gets converted from kebab case to cammel case  (product-name --> productName)

      // lets add as object to the array because we said we want products and the quantity as well

      addToCart(productId);
      updateCartQuantity();

      // console.log(cartQuantity);
      // console.log(cart);
    });
  });

  // When we click the button, How do we know which product we are supposed to add to the cart
  // To solve this problem, we are going to learn a feature of HTML called a ****** Data Attribute *******
  // ****** Data Attribute *******
  // - Is just another HTML attribute,
  // - except the purpose of a data attribute is that..... allows us to attach any inforamtion to an HTML element
  // Ex:(
  // <button
  // class="add-to-cart-button button-primary js-add-to-cart"  data-(any name that you want) = "...">
  // Add to Cart
  // </button>
  // )

  // Syntax rules for a Data Attribute
  // - is just an HTML attribute
  // - have to start with "data-"
  // - then we can give it any name we want (data-product-id), we have to make sure to seperate the words with a dash(-), this is also known as ***Kebab case (e.g., "first-name" )***
  // So the purpose of a data attribute is that we can attach any information to an HTML element

  // up to now this is how the cart shpws in the console
  // 0: {productName: 'Black and Gray Athletic Cotton Socks - 6 Pairs', quantity: 1}
  // 1: {productName: 'Intermediate Size Basketball', quantity: 1}
  // 2: {productName: 'Intermediate Size Basketball', quantity: 1}

  // This doesn't look quite right, the Basketball product repeated twice and each of them has a quantity of 1

  // Lets see how to solve this
  // Steps
  // 1. Check if the product is already in the cart
  // 2. If it is in the cart, increase the quantity
  // 3. If it is not in the cart, add it to the cart.
}
