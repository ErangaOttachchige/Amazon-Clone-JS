// Part 1
// Steps (Algorithm):
//  1. Create array to store todos
//  2. When we click "Add",
//  3. Get the text from textbox
//  4. Add it to the array
//  5. console.log the array

const todoList = []; // Step 1: Create array to store todos (empty array)

function addTodo() {
  let inputElement = document.querySelector('.js-name-input') //when a html element put into javascript it converts to a object. Therefore we can save it in a variable. 
  // Step 2: When we click "Add", we need to get the input element. We can use **document.querySelector** to get the input element. The **.js-name-input** is a class name of the input element.

  //to get the text out of the inputElement, we gonna use the **.value** property of the inputElement.
  // Step 3: Get the text from textbox
  const name = inputElement.value;
  // console.log(name);


  todoList.push(name);  // Step 4: Add it to the array  
  console.log(todoList); // Step 5: console.log the array

  // Step 6: Clear the input field after adding the todo
  // .value property is represet the text in the text box
  inputElement.value = ''; // Clear the input field


  //part 2
  // Steps (Algorithm)
  // 1. Loop through the array
  // 2. Create some HTML code for each todo
  // 3. Put the HTML on web page
}