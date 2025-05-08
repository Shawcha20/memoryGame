var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
let started=false;
var userClickedPattern=[];
var level=0;
function nextSequence() {
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).addClass("pressed");
    playMusic(randomChosenColor); // Now safe to play audio
    setTimeout(() => {
        $("." + randomChosenColor).removeClass("pressed");
    }, 100);
    level++;
}

function playMusic(color) {
    const audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

$(document).one("keydown", function () {
    $("h1").text("Level "+level);
    started=true;
    nextSequence();
});


$(".box").on("click",function(){
    if(!started)return;
    var userChosenColor=$(this).attr("id");
    //console.log(userChosenColor);   
    userClickedPattern.push(userChosenColor);
     //console.log(userClickedPattern);
    playMusic(userChosenColor);
    buttonPress(this);
     checkSequence(userClickedPattern.length-1)
});

function buttonPress(btn){
   $(btn).addClass("pressed");
    setTimeout(()=>{
        $(btn).removeClass("pressed");
    },100);
}
function checkSequence(currentLevel)
{
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if(userClickedPattern.length==gamePattern.length)
    { $("h1").text("Level "+level);
        setTimeout(function () {
            nextSequence();
          }, 1000);
    }
    }
    else{
        $("h1").text("Game over");
        $("body").addClass("gameOver");
        playMusic("wrong");
        setTimeout(()=>{
            $("body").removeClass("gameOver");

        },100);
        playMusic("wrong");
    }
    
}