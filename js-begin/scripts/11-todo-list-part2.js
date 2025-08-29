//part 2
// Steps (Algorithm)
// 1. Loop through the array
// 2. Create some HTML code for each todo
// 3. Put the HTML on web page using DOM

// 1. Loop through the array
const todoList = ['hjvh', 'kjkj'];

 renderTodoList(); // at the start Call the function to render the todo list for the first time

function renderTodoList() {
  let todoListHTML = ''; // Create a variable to store the result	

  for(let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    // 2. we gonna Create some HTML code for each todo using this "todo"
    const html = `<p>${todo}</p>`;  //(This technique is called "Generating the HTML")
    
    // Create HTML code for each todo 
    // 3. now we gonna combine all of this "html" code together and put it on the web page
    // To combine this "html" together we goona use the Accumulator pattern (so at the top of the loop, we create a variable to store the result )
  
    //So as we loop through the array, we gonna add this HTML `<p>${todo}</p>` to the variable "todoListHTML"
    todoListHTML = todoListHTML + html; // Combine all the "html" code together
  }
  
  console.log(todoListHTML); // Check the result
  //So Now we gonna put this HTML on the web page using DOM	
  
  // Put the div element inside javascript
  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML; // Put the HTML on the web page
}


function addTodo() {
  let inputElement = document.querySelector('.js-name-input') 
  const name = inputElement.value;


  todoList.push(name);  
  console.log(todoList);

  inputElement.value = ''; // Clear the input field

  renderTodoList(); // Call the function to render the todo list again
  // So when we add a new todo, we call the function to render the todo list again

}

//(Main Idea if JavaScript)
// So when creating websites with JavaScript, we usually follow a 3 step process:
// 1. Save the data	(// in here we saved the data as an array )
// 2. We use the data to Generate the HTML
// 3. Make it interactive (which will do later in this lesson)