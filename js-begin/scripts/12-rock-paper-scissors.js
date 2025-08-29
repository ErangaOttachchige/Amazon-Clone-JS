//script element runs when the page is loaded
//So we want to make sure that we create the function first and then we used it in buttons after.






//console.log(JSON.parse(localStorage.getItem('score'))); // get the value from localStorage

// const score = {
//   wins: 0,
//   losses: 0,
//   ties: 0,
// };

// instead using above code we can use this

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
}; // default operator used to set the default value

updateScoreElement();



// //check if the score is null
// if (score === null) {
//   score = {
//     wins: 0,
//     losses: 0,
//     ties: 0,
//   }
// }

//shortcut for the above code using falsy values
// if score = null(falsy value) --> (!score = true)
/* if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0,
    }
  }
*/

//create a variable to keep track whether or not we are playing
let isAutoPlaying = false;
let intervalId;  // every time we run the setInterval() function we are gonna get a different ID from this ---> setInterval() actually - returns a number (this number is like an ID)

// const autoPlay = () => {}; 

// even though we could create an arrow function version of below function, i actually prefer the regular function syntax here,
// 1. regular function is Easier to read
// 2. regular function syntax enable ***Hoisting****, which means we can call this function before we create it, we don not have to worry bout which order we write the code 


function autoPlay() {
  if(!isAutoPlaying) {
    //we want to play the game automatically every 1 second
    intervalId = setInterval(() => {                      //in here it is reccommended to use an arrow function
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000); //this will run the function every 1 second
    isAutoPlaying = true; // after we start playing the game, we gonna change this variable to true
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Play'; // change the button text to Stop Play
  }
  else {
    // So now we need to stop this Interval, how do we do that?
    // the answer is like this
    // setInterval() actually - returns a number (this number is like an ID)
    //                        - we can used] it to stop the interval
    // So at the front let us create a variable to save this ID (const intervalId)

    // every time we run the setInterval() function we are gonna get a different ID from this ---> setInterval() actually - returns a number (this number is like an ID)


    // we are going to use the "intervalId" to stop the interval

    //************ */ to stop an interval, we can use a function called ******* clearInterval() ********* betweeen the brackets, we are going to give it the ID that we want to stop -> clearInterval(intervalId)
    clearInterval(intervalId); 
    isAutoPlaying = false; //because we just stop the auto play
     document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play'; // change the button text to auto Play
  }
}

//******************************************************************** */
// Adding .addEventListener() instead of onclick = "" attribute in the HTML file

// document.querySelector('.js-rock-button').addEventListener('click', playGame('rock'));
// ---> the common misatake above, users did is, instead of giving a function that we want to run, instead they do is actually run the function inside the brackets. 
// ----> .addEventListener('click', playGame('rock'))

// So we are supposed to give a function to .addEventListener(), however this, **playGame('rock')** doesn't result in a function, this will actually run playGame('...'), and give us the return value, which is Undefined

// So this code **playGame('rock')** will actually result in undefiened and then we are giving Undefined to .addEventListener()'s second parameter, So it won't work.

// So in order to give .addEventListener(), a function, we need to create a function there like below

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors')
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score)); // set the value in localStorage

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  // document.querySelector('.js-moves').innerHTML = `You ${playerMove} - ${computerMove} computer`;
  document.querySelector('.js-moves').innerHTML = `You
  <img src="images/${playerMove}-emoji.png" alt="${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" alt="${computerMove}-emoji.png" class="move-icon">
  Computer`;

  // alert(
  //   `You picked ${playerMove}. Computer picked ${computerMove}. ${result}\nWins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
  // );
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random(); // generate a random number between 0 and 1 ( 0 <= number < 1)

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

// *************************************************************************
// Let's try .addEventListener() with a different event --> 'keydown'

// we gonna add EventListener to the body this time, so that if we type anywhere on the page we can run some code

document.body.addEventListener('keydown', () => {
  console.log("keydown");
});

// Now we have to check what key was pressed and play the game, So how do we know which key that we pressed, earlier in this course we used the attribute "onkeydown" and we learned that it gets an special object called "event", and the "event" object contains which "key" was pressed

// Exaple: 

// { <input onkeydown ="
//   if (event.key === 'r') {
//   .....
//   }
// "> }

// addEventListener() also provides this "event" object, but it provides it as a parameter to the **function**
document.body.addEventListener('keydown', (event) => {
  //console.log("keydown");
  // console.log(event.key);
  if(event.key === 'r') {
    playGame('rock');
  }
  else if (event.key === 'p') {
    playGame('paper');
  }
  else if (event.key === 's') {
    playGame('scissors');    
  }
});

// So everytime we type on our keyboard, .addEventListener() will save the "event" object in the "event" parameter and run the function, and this "event" object contains the key that we pressed