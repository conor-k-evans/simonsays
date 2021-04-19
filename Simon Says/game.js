//Colors for each button
var buttonColors = ["red", "blue", "green", "yellow"];

//Game pattern which will increase by one color every round until player has lost
var gamePattern = [];

//Game pattern clicked by the player
var userClickedPattern = [];

//Player level
var level = 0;


//Starting the game with a keyboard presse
$(document).keypress(function() {
  if (level === 0) {
    nextSequence();
  }
});


//Checking to see which buttons are pressed
$(".btn").click(function() {
  //Setting the chosen color to a variable
  var userChosenColor = this.id;

  //Pushing the chosen color to the userChosenColor array
  userClickedPattern.push(userChosenColor);

  //Playing sound corresponding to color name
  playSound(userChosenColor);

  //Animating button when pressed
  animatePress(userChosenColor);

  //Checking each answer
  checkAnswer(level);
});


//Function to add next sequence on game
function nextSequence() {
  //Picking random color to add onto sequence
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  //Increasing the player's level and reseting their chosen answers
  level++;
  userClickedPattern = [];

  //Changing the header to show the current level
  $("#level-title").text("Level " + level);

  //Adding new color onto game sequence
  gamePattern.push(randomChosenColor);

  //Setting new color to fade in and out
  $("#" + randomChosenColor).fadeOut().fadeIn();

  //Playing sound corresponding to color name
  playSound(randomChosenColor);
}


//Function to check the player's answers
function checkAnswer(currentLevel) {
  //Index in array to compare between correct answers and player choices
  var index = userClickedPattern.length - 1;

  //If the player choses correctly, continue and check to see if the next level must begin
  //If the player choses incorrectly, game over
  if (gamePattern[index] === userClickedPattern[index]) {
    if ((index + 1) === currentLevel) {
      setTimeout(nextSequence, 1000);
    }
  }
  else {
    //Playing game over sound
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    //Adding effect to background
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    //Changning header text
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //Reseting the game
    startOver();
  }
}


//Function to reset the game when player gets answer wrong
function startOver() {
  level = 0;
  gamePattern = [];
}


//Function to play sound for color name
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//Function to animate the pressing of the buttons
function animatePress(currentColor) {
  //Adding class "pressed" to change button color and shading
  $("#" + currentColor).addClass("pressed");

  //Removing class "pressed" after a 100 ms delay
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
