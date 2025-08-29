// Inheritance = lets us reuse code between classes
// Inheritance --> It allows one class to get all the properties and methods from another class


import {formatCurrency} from '../scripts/utils/money.js'


export function getProduct(productId) {


  let matchingProduct; // To save the result

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;     
    }
  });

  return matchingProduct;     // because from 'return' we can use this 'matchingProduct' outside of this function
}


// We are going to learn a technique called "Converting an Object into a Class"
// what this means is instead of using regular objects in the below array, we are going to use a class to generate these objects

// this class is meant to generate products
class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  // whenever we generate an object, it is going to automatically run this constructor (known as the setup code)
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;

  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  // So now each product is able to construct its own StarsUrl here(use case --> check amazon.js)

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return "";
  };
 
}

class Clothing extends Product {

  sizeChartLink;

  constructor(productDetails) {
    // Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    // To call the parent's constructor we are going to use a special feature of classes called "super()".
    super(productDetails); 
    // super() basically called the constructor of the parent class which is the "Product"
    // The parent knows how to handle it.
    // If you pass super(productDetails), you’re just sending the "productDetails" variable to the parent’s constructor, so it can initialize properties.

    // One last thing to know is that if we dont create a constructor in child class, by default it will run the Parent's Constructor
    //ex:   class Clothing extends Product{}   ----> (by default) --->   class Clothing extends Product { constructor(param1) { super(param1); } }

    this.sizeChartLink = productDetails.sizeChartLink;
  }

  // Override/ Replace the parent's method (Method overriding)
  extraInfoHTML() {

    // additional thing to know about Method overriding, is that if we really need to access to the parent's method there is a feature that we can use
    //super().extraInfoHTML();  // this is just an example

    return `<a href="${this.sizeChartLink}" target="_blank">
      Size chart
    </a>`
  };
  // target="_blank" --> Open in a new tab

}


// what we were doing is we were basically taking a regular object like in below, we put it inside a class like above, and then we copy over the properties
// You can also visualise it like this --> we have a regular object --> {id:"...", image:"...", name:"...",....} ---> and we are basically wrapping it inisde a class

// Now we are going to take this technique and apply it to this entire array.
// Then instead of having an array of regular objects, we are going to convert each of these objects into the "Product" class

// one way we could do this is that in front of the object we can just type ---> [ ex: new Product({id:"...", image:"...", name:"...",....}) ], 
// and this will eventually convert this regular object in to the "Product" class
// However we gonna have to repeat this code for every object in this array and it is gonna be a lot of work and repetition
// So instead lets just loop through this array and then use code to convert each of these objects in to the "Product" class.


/*
export const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095,
    keywords: [
      "sports",
      "basketballs"
    ]
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",  // Discriminator Property (it tells us which class we should convert this in to, "Product" or "Clothing")
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/products/6-piece-white-dinner-plate-set.jpg",
    name: "6 Piece White Dinner Plate Set",
    rating: {
      stars: 4,
      count: 37
    },
    priceCents: 2067,
    keywords: [
      "plates",
      "kitchen",
      "dining"
    ]
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/products/6-piece-non-stick-baking-set.webp",
    name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
    rating: {
      stars: 4.5,
      count: 175
    },
    priceCents: 3499,
    keywords: [
      "kitchen",
      "cookware"
    ]
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
    name: "Plain Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 317
    },
    priceCents: 2400,
    keywords: [
      "hoodies",
      "sweaters",
      "apparel"
    ]
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/products/luxury-tower-set-6-piece.jpg",
    name: "Luxury Towel Set - Graphite Gray",
    rating: {
      stars: 4.5,
      count: 144
    },
    priceCents: 3599,
    keywords: [
      "bathroom",
      "washroom",
      "restroom",
      "towels",
      "bath towels"
    ]
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "images/products/liquid-laundry-detergent-plain.jpg",
    name: "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz",
    rating: {
      stars: 4.5,
      count: 305
    },
    priceCents: 2899,
    keywords: [
      "bathroom",
      "cleaning"
    ]
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/products/knit-athletic-sneakers-gray.jpg",
    name: "Waterproof Knit Athletic Sneakers - Gray",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 3390,
    keywords: [
      "shoes",
      "running shoes",
      "footwear"
    ]
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/products/women-chiffon-beachwear-coverup-black.jpg",
    name: "Women's Chiffon Beachwear Cover Up - Black",
    rating: {
      stars: 4.5,
      count: 235
    },
    priceCents: 2070,
    keywords: [
      "robe",
      "swimsuit",
      "swimming",
      "bathing",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "images/products/round-sunglasses-black.jpg",
    name: "Round Sunglasses",
    rating: {
      stars: 4.5,
      count: 30
    },
    priceCents: 1560,
    keywords: [
      "accessories",
      "shades"
    ]
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/products/women-beach-sandals.jpg",
    name: "Women's Two Strap Buckle Sandals - Tan",
    rating: {
      stars: 4.5,
      count: 562
    },
    priceCents: 2499,
    keywords: [
      "footwear",
      "sandals",
      "womens",
      "beach",
      "summer"
    ]
  },
  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    image: "images/products/blackout-curtain-set-beige.webp",
    name: "Blackout Curtains Set 4-Pack - Beige",
    rating: {
      stars: 4.5,
      count: 232
    },
    priceCents: 4599,
    keywords: [
      "bedroom",
      "curtains",
      "home"
    ]
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "images/products/men-slim-fit-summer-shorts-gray.jpg",
    name: "Men's Slim-Fit Summer Shorts",
    rating: {
      stars: 4,
      count: 160
    },
    priceCents: 1699,
    keywords: [
      "shorts",
      "apparel",
      "mens"
    ]
  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "images/products/electric-glass-and-steel-hot-water-kettle.webp",
    name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
    rating: {
      stars: 5,
      count: 846
    },
    priceCents: 3074,
    keywords: [
      "water boiler",
      "appliances",
      "kitchen"
    ]
  },
  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    image: "images/products/facial-tissue-2-ply-18-boxes.jpg",
    name: "Ultra Soft Tissue 2-Ply - 18 Box",
    rating: {
      stars: 4,
      count: 99
    },
    priceCents: 2374,
    keywords: [
      "kleenex",
      "tissues",
      "kitchen",
      "tissues box",
      "napkins"
    ]
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/products/straw-sunhat.webp",
    name: "Straw Lifeguard Sun Hat",
    rating: {
      stars: 4,
      count: 215
    },
    priceCents: 2200,
    keywords: [
      "hats",
      "straw hats",
      "summer",
      "apparel"
    ]
  },
  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    image: "images/products/sky-flower-stud-earrings.webp",
    name: "Sterling Silver Sky Flower Stud Earrings",
    rating: {
      stars: 4.5,
      count: 52
    },
    priceCents: 1799,
    keywords: [
      "jewelry",
      "accessories",
      "womens"
    ]
  },
  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/products/women-stretch-popover-hoodie-black.jpg",
    name: "Women's Stretch Popover Hoodie",
    rating: {
      stars: 4.5,
      count: 2465
    },
    priceCents: 1374,
    keywords: [
      "hooded",
      "hoodies",
      "sweaters",
      "womens",
      "apparel"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
    image: "images/products/bathroom-rug.jpg",
    name: "Bathroom Bath Rug Mat 20 x 31 Inch - Grey",
    rating: {
      stars: 4.5,
      count: 119
    },
    priceCents: 1250,
    keywords: [
      "bathmat",
      "bathroom",
      "home"
    ]
  },
  {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
    image: "images/products/women-knit-ballet-flat-black.jpg",
    name: "Women's Knit Ballet Flat",
    rating: {
      stars: 4,
      count: 326
    },
    priceCents: 2640,
    keywords: [
      "shoes",
      "flats",
      "womens",
      "footwear"
    ]
  },
  {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    image: "images/products/men-golf-polo-t-shirt-blue.jpg",
    name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
    rating: {
      stars: 4.5,
      count: 2556
    },
    priceCents: 1599,
    keywords: [
      "tshirts",
      "shirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  },
  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    image: "images/products/trash-can-with-foot-pedal-50-liter.jpg",
    name: "Trash Can with Foot Pedal - Brushed Stainless Steel",
    rating: {
      stars: 4.5,
      count: 2286
    },
    priceCents: 8300,
    keywords: [
      "garbage",
      "bins",
      "cans",
      "kitchen"
    ]
  },
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    image: "images/products/duvet-cover-set-blue-twin.jpg",
    name: "Duvet Cover Set with Zipper Closure",
    rating: {
      stars: 4,
      count: 456
    },
    priceCents: 2399,
    keywords: [
      "bedroom",
      "bed sheets",
      "sheets",
      "covers",
      "home"
    ]
  },
  {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    image: "images/products/women-chunky-beanie-gray.webp",
    name: "Women's Chunky Cable Beanie - Gray",
    rating: {
      stars: 5,
      count: 83
    },
    priceCents: 1250,
    keywords: [
      "hats",
      "winter hats",
      "beanies",
      "tuques",
      "apparel",
      "womens"
    ]
  },
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    image: "images/products/men-chino-pants-beige.jpg",
    name: "Men's Classic-fit Pleated Chino Pants",
    rating: {
      stars: 4.5,
      count: 9017
    },
    priceCents: 2290,
    keywords: [
      "pants",
      "apparel",
      "mens"
    ]
  },
  {
    id: "1c079479-8586-494f-ab53-219325432536",
    image: "images/products/men-athletic-shoes-green.jpg",
    name: "Men's Athletic Sneaker",
    rating: {
      stars: 4,
      count: 229
    },
    priceCents: 3890,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "mens"
    ]
  },
  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    image: "images/products/men-navigator-sunglasses-brown.jpg",
    name: "Men's Navigator Sunglasses Pilot",
    rating: {
      stars: 3.5,
      count: 42
    },
    priceCents: 1690,
    keywords: [
      "sunglasses",
      "glasses",
      "accessories",
      "shades"
    ]
  },
  {
    id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    image: "images/products/non-stick-cooking-set-15-pieces.webp",
    name: "Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces",
    rating: {
      stars: 4.5,
      count: 511
    },
    priceCents: 6797,
    keywords: [
      "cooking set",
      "kitchen"
    ]
  },
  {
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    image: "images/products/vanity-mirror-silver.jpg",
    name: "Vanity Mirror with Heavy Base - Chrome",
    rating: {
      stars: 4.5,
      count: 130
    },
    priceCents: 1649,
    keywords: [
      "bathroom",
      "washroom",
      "mirrors",
      "home"
    ]
  },
  {
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
    image: "images/products/women-french-terry-fleece-jogger-camo.jpg",
    name: "Women's Fleece Jogger Sweatpant",
    rating: {
      stars: 4.5,
      count: 248
    },
    priceCents: 2400,
    keywords: [
      "pants",
      "sweatpants",
      "jogging",
      "apparel",
      "womens"
    ]
  },
  {
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    image: "images/products/double-elongated-twist-french-wire-earrings.webp",
    name: "Double Oval Twist French Wire Earrings - Gold",
    rating: {
      stars: 4.5,
      count: 117
    },
    priceCents: 2400,
    keywords: [
      "accessories",
      "womens"
    ]
  },
  {
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    image: "images/products/round-airtight-food-storage-containers.jpg",
    name: "Round Airtight Food Storage Containers - 5 Piece",
    rating: {
      stars: 4,
      count: 126
    },
    priceCents: 2899,
    keywords: [
      "boxes",
      "food containers",
      "kitchen"
    ]
  },
  {
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    image: "images/products/coffeemaker-with-glass-carafe-black.jpg",
    name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
    rating: {
      stars: 4.5,
      count: 1211
    },
    priceCents: 2250,
    keywords: [
      "coffeemakers",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
    image: "images/products/blackout-curtains-black.jpg",
    name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
    rating: {
      stars: 4.5,
      count: 363
    },
    priceCents: 3099,
    keywords: [
      "bedroom",
      "home"
    ]
  },
  {
    id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
    image: "images/products/cotton-bath-towels-teal.webp",
    name: "100% Cotton Bath Towels - 2 Pack, Light Teal",
    rating: {
      stars: 4.5,
      count: 93
    },
    priceCents: 2110,
    keywords: [
      "bathroom",
      "home",
      "towels"
    ]
  },
  {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    image: "images/products/knit-athletic-sneakers-pink.webp",
    name: "Waterproof Knit Athletic Sneakers - Pink",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 3390,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "womens"
    ]
  },
  {
    id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
    image: "images/products/countertop-blender-64-oz.jpg",
    name: "Countertop Blender - 64oz, 1400 Watts",
    rating: {
      stars: 4,
      count: 3
    },
    priceCents: 10747,
    keywords: [
      "food blenders",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
    image: "images/products/floral-mixing-bowl-set.jpg",
    name: "10-Piece Mixing Bowl Set with Lids - Floral",
    rating: {
      stars: 5,
      count: 679
    },
    priceCents: 3899,
    keywords: [
      "mixing bowls",
      "baking",
      "cookware",
      "kitchen"
    ]
  },
  {
    id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
    image: "images/products/kitchen-paper-towels-30-pack.jpg",
    name: "2-Ply Kitchen Paper Towels - 30 Pack",
    rating: {
      stars: 4.5,
      count: 1045
    },
    priceCents: 5799,
    keywords: [
      "kitchen",
      "kitchen towels",
      "tissues"
    ]
  },
  {
    id: "bc2847e9-5323-403f-b7cf-57fde044a955",
    image: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
    name: "Men's Full-Zip Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 3157
    },
    priceCents: 2400,
    keywords: [
      "sweaters",
      "hoodies",
      "apparel",
      "mens"
    ]
  }
].map((productDetails) => {
  // we are gonna use that "type" property to decide which Class to use, "Product" or "Clothing" 
  if(productDetails.type === 'clothing') {
    return new Clothing(productDetails);
  }

  return new Product(productDetails);
});
*/


// in here we used an array method called .map()
// .map() basically loops through an array and for each value it runs a function
// So we gave this a function, () => {}, that we want to run for each value

// this "productDetails" parameter is basically each value in the "products" array
// and inside the function, we are going to convert the regular "productDetails" object in to a class --> "new Product(productDetails)"

// Now there is a second part, how the .map() works
// basically .map() creates a new array and whatever we return from this inner function is gonna go inside this new array

// This is the .map() summary below

/*
[                                           [
  product1,    ---> function    -------->       new Product(product1),
  product2,    ---> function    -------->       new Product(product2),
  product3,    ---> function    -------->       new Product(product3),
  .....                                       .....
]                                           ]
*/

// So you can think of .map() as we take each value in an array, we run the above inner function on it, and we transform it and put it inisde a new array

//console.log(products);

// So we converted all of our products from regular objects into this "Product" class


// *****************************************************************************************************************************************************************************************
/*
// More details about classes

// Built in Classes - ex: Date()
// new Date() = generates an object that represents the current date

const date = new Date();
console.log(date);
console.log(date.toLocaleTimeString()); // .toLocaleTimeString() = gives the current time

// Remeber we used external library  called dayjs()
// Ex: const today = dayjs();
// DAYJS uses this "Date" class behind the scenes.
// DAYJS gives us a lot of extra features.
// So We use DAYJS instead of "Date" class directly. 

*/
// *****************************************************************************************************************************************************************************************

// More details about "this"

/*
console.log(this);

const obj = {
  a:2,
  b: this.a
}
*/


/*
function logThis() {
  console.log(this);
  // "this" actually has a special feature
}
logThis();
// inside a function, we can change "this" to whatever we want, to do that functions have a method called ".call()"
logThis.call("hello bro");
// "logThis.call()" does the same thing like the "logThis()", except we can set the value of "this" to be whatever we want


// Last important thing abot "this" --> arrow functions do not change the value of "this"
this; // here "this" is undefined
const object3 = {
  method: () => {
    console.log(this);  // "this" will have the same value as outside the arrow function because --> arrow functions do not change the value of "this"
  }
}
object3.method();
*/

// *****************************************************************************************************************************************************************************************

// Instead of using a file on our computer to load the products, ** lets use the backend to load the products ******************************************************************************



//first lets create a variable to save the products again and lets export this, so we can use it outside of this file like before
export let products = [];

// Lets create another ""loadProducts"" function using "fetch"
export function loadProductsFetch() {
  // to use "fetch", we are gonna use the built-in function "fetch()", this makes an HTTP request just like we did with 'XMLHttpRequest'
  // also so by default "fetch" will make a "GET" request, so we just need to give it the URL that we want to make the request to
  // "fetch" is lot more simple than XMLHttpRequest

  //fetch() function in JavaScript returns a Promise as well

  //  fetch('https://supersimplebackend.dev/products')  --> this will send a request to the backend
  // To get the response, fetch() uses a promise, when we call, "fetch()" --> this is gonna create a Promise --> and we can add a next step to this "Promise" using .then()


  // So the way this works, fetch() is going to send a request to the backend and when we get a response, it is gonna go to the next step using ".then()"
  // it is also going to save the response inside a parameter in ".then()" -->  then((response)  --> and this will contain the "response" from the backend
  const promise = fetch('https://supersimplebackend.dev/products').then((response) => {  // in here "response" is actually an object


    // How do we get the data from this response --> to get data that attached to this response we use --> ""response.json()"" --> this gives us the JSON or the data that attached to the response
    // **** Next --> ""response.json()"" is actually asynchronous and it returns a "Promise" as well -->  before we continue to the next step, we need to wait for this promise to finish as well ["response.json()"]
    // To do that(wait for this promise to finish) inside ".then()" inner function, we can actually return another promise --> though, "response.json()" is actually asynchronous and it returns a promise, we can code like this ---> " return response.json() "
    // When we return a Promise, it will wait for this promise to finish --> "return response.json()", before going to the next step
    return response.json()
  }).then((productsData) => {           // this is adding another step to the previous "Promise"
    // when "response.json()" finishes, it is gonna give us the data that attached to the response and its gonna save it inside the "productsData" parameter

    // you will also notice that instead of giving us just a big JSON string data, it actually converted the JSON into an array, so it basically did json.parse() on the response as well
    
    
    // So we will do the same step as before, except using a promise this time
    products = productsData.map((productDetails) => {
      if(productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }

      return new Product(productDetails);
    });

    console.log('load products');

    // to do something after this whole step, we can actually return this entire promise
    // fetch() function actually returns a Promise  --> to make it, we gonna save this entire promise in to a variable (const promise = fetch(....))


  }).catch((error) => {                                               // this is for error handling
    console.log('Unexpected error. Please try again later.');
  });
  

  return promise;   // from this we return the whole promise out of the function and if want we can add even more steps after this promise in future
  // eg:
  /* 
  loadProductsFetch().then(() => {

  })
  */
}


/*
loadProductsFetch().then(() => {
  console.log("next step")
});
*/ 


// lets create a function to load these products from the backend
export function loadProducts(fun) {
  // inside here we are going to create a XML HTTP request again to make a request to the backend
  const xhr = new XMLHttpRequest();                                                                 // this will generate a new request object

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      // we are gonna use that "type" property to decide which Class to use, "Product" or "Clothing" 
      if(productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }

      return new Product(productDetails);
    });

    console.log('load products');

    fun(); //btw this function that we provide to loadProducts() as a parameter (fun), this is known as a callback function

    // callback function - a function to run in the future or to call in the future
  });


  // ************************************ for callbacks we usually set up a seperate callabck just for error handling **************************************************
  xhr.addEventListener('error', (error) => {
    console.log('Unexpected error. Please try again later.');
    console.log(error);
  });


  xhr.open('GET', 'https://supersimplebackend.dev/products')                            // this will set up the request 
                                                                                        // (1 parameter - type of request that we want to send, 2 parameter - URL, that request need to send to)
  xhr.send();                                                                           // finally send this request (remember that .send() is asynchronous)
  // that means it will send the request, but it will not wait for a response to come back, in order to wait for a response, above after, generating the new request object, we are setting up a addEventListener to get the response
}


//************************************************************************************************************************************************************************ 

//fetch() = better way to make HTTP requests

/*
  currrently we are using ""XMLHttpRequest"" to make request to the backend, and this uses a ""Callback""
  ""fetch"" also lets us make requests to the backend, but fetch uses a "Promise"

  fetch() can return a promise directly


*/


//************************************************************************************************************************************************************************
