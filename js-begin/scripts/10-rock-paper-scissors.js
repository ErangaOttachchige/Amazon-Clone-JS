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
      result = "You lose";
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