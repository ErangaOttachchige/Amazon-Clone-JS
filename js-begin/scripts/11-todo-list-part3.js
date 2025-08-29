//part 3
//Main Idea if JavaScript
// 1. Save the data	
// 2. Generate the HTML
// 3. Make it interactive


// 1. Loop through the array
// const todoList = ['make dinner', 'wash dishes'];
// right now our todoList is just an array of strings, but this time each to do is also going to have a due date,

//  So how do we group the name and the due date together? 
 
// we can do that using an object, so above instead of just a string we gonna create an object and we will give it a name property and a dueDate property, so now we have an array of objects, and each object has a name and a due date.
const todoList = [  {name :'make dinner', dueDate: '2022-12-22'},
                    {name :'wash dishes', dueDate: '2022-12-22'},
                  ]; 
                  //now that each to do is an object, we need to update the rest of our code

 renderTodoList(); // at the start Call the function to render the todo list for the first time

function renderTodoList() {
  let todoListHTML = '';	

  for(let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    // now we need to get the name and the due date from the object, so we can do that by using dot notation, so we can say todoObject.name and todoObject.dueDate, so now we have the name and the due date.


    // const name = todoObject.name; // this is the name of the to do


    // const dueDate = todoObject.dueDate; // this is the due date of the to do

    //before we continue, we are going to review a shortcut we can use with objects called "destructuring", so above you noticed the varible name is the same as the property name, we atcually have a shortcut for that,




    // const {name} = todoObject; // this is called destructuring, this takes the 'name' property out of the object and puts it in a varible also called 'name', so this is a shortcut for this line 'const name = todoObject.name;' We can also use multiple properties in this shortcut, to also take the 'dueDate' property out of the object and put it in a varible also called 'dueDate', 
    // 
    // so we can say const {name, dueDate} = todoObject; this is a shortcut for these lines 
    // const name = todoObject.name; 
    // const dueDate = todoObject.dueDate;

    const {name, dueDate} = todoObject; //destructuring

    //destructuring is a shortcut that allows us to take properties out of an object and put them in variables with the same name, so we can use it to make our code cleaner, so instead of creating a variable for the name and the due date, we can just destructure the object, so we can say const {name, dueDate} = todoObject; and now we have the name and the due date.


    //before we continue, we are going to review a shortcut that we can use to make our code a little bit cleaner, so instead of creating a variable for the name and the due date, we can just destructure the object, so we can say const {name, dueDate} = todoObject; and now we have the name and the due date.








    // 2. Remember we are Generating the HTML for the to-do list
    const html = `
    <div>${name /* this is the name of the to do */}</div>
    <div> ${dueDate /* this is the due date of the to do */}</div>
    <button onclick="
      todoList.splice(${i}, 1);
      renderTodoList(); 
      " class = "delete-todo-button">Delete
    </button>




    `; // So remember that template String have a feature called multi-line strings, which allows us to write multi-line strings and embed expressions inside them
    todoListHTML = todoListHTML + html;
  }
  
  console.log(todoListHTML);
  
  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML; 
}


function addTodo() {
  let inputElement = document.querySelector('.js-name-input') 
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input'); //this will get the input field for the due date and put it into javascript
  const dueDate = dateInputElement.value; // So this will get the date that we selected and save it in this variable

  todoList.push({
    name: name,  // this is the name of the to do 
    dueDate: dueDate // this is the due date of the to do 
    // Remeber objects also have short cut for the above two lines, if the property and the variable name are the same, we can just say name and dueDate, so we can say todoList.push({name, dueDate}); this is a shortcut for the above two lines
    //this is called "shorthand property syntax"
  });

  // BELOW IS SHOWING YOU HOW THE 'shorthand property syntax' WORKS
  // todoList.push({
  //   name,dueDate // this is the name of the to do
  // });
  
  




  console.log(todoList);

  inputElement.value = '';

  renderTodoList(); 
}

//(Main Idea if JavaScript)
// So when creating websites with JavaScript, we usually follow a 3 step process:
// 1. Save the data	(// in here we saved the data as an array )
// 2. We use the data to Generate the HTML
// 3. Make it interactive (which will do later in this lesson)