let score = JSON.parse(localStorage.getItem("score")) || {
  Wins: 0,
  Losses: 0,
  Tie: 0,
};

if (score === null || score === undefined) {
  score = {
    Wins: 0,
    Losses: 0,
    Tie: 0,
  };
}

scoreElement();
function scoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins ${score.Wins}   Losses ${score.Losses}   Tie ${score.Tie}`;
}

//For Computer Move:
function pickComMove() {
  let computerMove = "";
  randomNumber = Math.random();
  if (randomNumber > 0 && randomNumber <= 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber > 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber > 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}

//12s. Add eventListener to the autoPlay button.
document.querySelector('.auto-play-button').addEventListener('click',()=>{
  autoPlay();
})

//For AutoPlay:
let isAutoPlaying=false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId=setInterval(function(){
      const playerMove=pickComMove();
      GameRules(playerMove);
    },1000)
    isAutoPlaying=true;
    document.querySelector('.auto-play-button').innerHTML='Stop Playing'//12t. For changing the auto play button's initials like when its on we see stop playing.
    
  } else{
    clearInterval(intervalId);
    isAutoPlaying=false;
    document.querySelector('.auto-play-button').innerHTML='Auto Play';
  }
  
}

//For playing the game with keywords:
document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r'){
    GameRules('Rock');
  } else if(event.key==='p'){
    GameRules('Paper');
  } else if(event.key==='s'){
    GameRules('Scissors');
  } 
  //12u. Press a  to start autoPlay or stop.
  else if(event.key==='a'){
    autoPlay();
  }
  //12w. Press backspace so reset the score also:
  else if (event.key==='Backspace'){
    resetScore();
  }
});

// This is the main logic where we put the comMOve and ourMove:
function GameRules(playerMove) {
  computerMove = pickComMove();
  let result = "";

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You Lose.";
    } else if (computerMove === "Paper") {
      result = "You Win.";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Win.";
    } else if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "You Lose.";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You Lose.";
    } else if (computerMove === "Scissors") {
      result = "You Win.";
    }
  }
  // To update the score and show them on page:
  if (result === "You Win.") {
    score.Wins += 1;
  } else if (result === "You Lose.") {
    score.Losses += 1;
  } else if (result === "Tie.") {
    score.Tie += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));

  scoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You 
        <img src="/images/${playerMove}-emoji.png"  class="move-icon"> ~
      <img src="/images/${computerMove}-emoji.png" class="move-icon">
      Computer`;
}
//Reset score function:
function resetScore(){
  score.Wins=0;
  score.Losses=0;
  score.Tie=0;
  localStorage.removeItem('score');
  scoreElement();
}
//12v. Add eventlistener(function resetScore) to reset button:
// document.querySelector('.reset-score-button').addEventListener('click',()=>{
//   resetScore();
// });


//12x. Confirmation to reset score:

document.querySelector('.reset-score-button').addEventListener('click',()=>{
  const resetConfirmation = document.querySelector('.reset-score-confirmation');
  resetConfirmation.innerHTML='Are you sure you want to reset your score? <button class="reset-Yes">Yes</button> <button class="reset-No">No</button>'
  //Add the final reset option to the yes or no button:
  document.querySelector('.reset-Yes').addEventListener('click',()=>{
    resetScore();
    resetConfirmation.innerHTML='';
  })
  document.querySelector('.reset-No').addEventListener('click',()=>{
    resetConfirmation.innerHTML='';
  })
});
