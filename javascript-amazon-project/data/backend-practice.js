// What is backend? = Another computer that manages the data of a website

// When 2 computers (frontend & backend) are connected to the internet, they can actually send msgs to each other using a feature called "HTTP"

// To send an HTTP request, we are going to use a class called "XMLHttpRequest"  --> This is a built-in class (provided by JavaScript)
// First we generate the object using the class
const xhr = new XMLHttpRequest();              // This creates a new HTTP request(message) to send to the backend (message = request)

// Setting up the event listener first here and then below trigger the event by sending the request
xhr.addEventListener('load', () => {
  console.log(xhr.response);
});
// which will execute when the 'load' event is fired on that element. fired when the content has fully loaded.
// 1 parameter - event that we want to listen for or to wait for (in this case we want to wait for the response to comeback)
// 2 parameter - the function that we want to run, after the "event" happens (in this case after the 'response' has loaded )

// next we need to setup this request
/*
to setup this request, we gonna give .open(), 2 parameters  
1 parameter --> What type of HTTP request to send (GET, POST, PUT, DELETE)
2 parameter --> where to send this HTTP request(message)
GET = get some information from the backend
using HTTP, we can send a message to any computer that is connected to the internet
Now to locate another computer on the internet, we need to use a URL (Uniform Resource Locator)
*/
xhr.open('GET', 'https://supersimplebackend.dev');   
// that's how we setup an HTTP message, we give it the type of message that we want to send, and also the URL which is where to send this message to

// Last step is to send this message
xhr.send();
// You might be wondering is why do we put the "addEventListener" up there, at the top, because we need to set up the "EventListener" and then trigger the event or "send" the request. (xhr.send();)

// we can get the HTTP response code in here using a property called --> xhr.response
// xhr.response;
// --> however there is a slight problem with doing this
// when we send a request to the backend (xhr.send();), ** It takes time for the request to travel across the Internet to the backend, and for the response to come back **
// Therefore the "response" is not avaiable right away and "xhr.response" will be "undefined" at first, (xhr.response = undefined)


// xhr.send(); is known as "asynchronous code", "asynchronous code" means it does not wait for this line of code --> (xhr.send();) to finish. 
// It just sends the request(xhr.send();) and then immediately goes to the next line. The response might come back later in the future but we dont have access to it if we write below like this after "xhr.send();" code --> xhr.response
// In this situation in order to get response, we need to wait for the response to come back first, and then we can access "xhr.response"
// In order to wait for the response to come back, at the top after we create the "xhr" we are going to use a "addEventListener()"










/*
URL (Uniform Resource Locator)
- Like an address, but for the internet
- Helps us locate another computer on the internet
- eg: http://amazon.com
- eg: http://youtube.com
https -> "s" after "http" means we are using a secure version of "http"
these are "amazon.com", "youtube.com" --> Domain name (this is like an address, it points to another computer on the internet)
*/

/*
When we send a message to the backend, this message is called "Request", we are requesting something from the backend
When the backend receives our "Request", it will send an HTTP message back to us and this message is called the "Response"
SO each "Request" that we make, will get one "Response" from the backend (this is called as "Request-Response Cycle")
*/

/*
URL Paths 
- We can send deffirent request to the backend using URL Paths.
- URL path is the path that comes after the domain name
- EX: https://supersimplebackend.dev/hello           --> URL Paths --> /hello
- EX: https://supersimplebackend.dev/products/first  --> URL Paths --> /products/first
- EX: https://supersimplebackend.dev                 --> URL Paths --> /
- Each URL path will give us a differnt response.
*/

/*
Status Code
- Which tells us if a request succeeded or failed
- Starts with 4 or 5 means (400, 404, 500) = failed
- Starting with 4 means it was frontend problem
- Starting with 5 means it was backend problem
- Starts with 2 means (200, 201, 204) = response was succeeded
*/


/*
Btw the list of all the URL paths that are supported is called as *Backend APIs*
GET /
GET /hello
GET /products/first
GET /documentation
GET /images/apple.jpg
GET /products
GET /cart
POST /orders
GET /greeting
POST /greeting
*/

/*
API - Application Programming Interface
    - Interface ---> How we interact with something 
*/

/*
When we type a URL in the browser, it actually sends a "GET" request to that URL
Using the browser = making a GET request
*/
