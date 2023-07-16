var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if (started === false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    else{
    
    };
})

function checkAnswer(currentLevel) {
    if (gamePattern[userClickedPattern.length-1]===userClickedPattern[userClickedPattern.length-1])  {
    console.log("Success");
        if (gamePattern.length === userClickedPattern.length) {
            console.log("Poziom zaliczony");
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else{
        console.log("Wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
        $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }  
    
}
    

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern,gamePattern,level);
    checkAnswer(level)
    
})

//Creating number between 0-3
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("."+ currentColour).addClass("pressed");
    setTimeout(() => {
        $("."+ currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}

