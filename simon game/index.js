var colors = ["red", "blue", "green", "yellow"];

var pattern = [];

var clickPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
   if(!started){
   $("#level-title").text("Level " + level);
   seq();
   started = true;
   }
});



$(".btn").click(function (){

      var chosenColor = $(this).attr("id");
      clickPattern.push(chosenColor);

      playSound(chosenColor);

      animation(chosenColor);

      checkAnswer(clickPattern.length - 1);

   });

function checkAnswer(currLevel){
   if(pattern[currLevel] === clickPattern[currLevel]){
      // console.log("success");   
      if (clickPattern.length === pattern.length){
         setTimeout(function(){
            seq();   
         }, 1000);
      }
   }
   else {
      // console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout(function(){
         $("body").removeClass("game-over");
      }, 100);
      startOver();
   }
      
}

   
function seq(){
      
   clickPattern = [];
     
   level++;
      
   $("#level-title").text("Level " + level);

   var num = Math.floor(Math.random()*4);
   var ranColor = colors[num];
   pattern.push(ranColor);
         
   $("#" + ranColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(ranColor);     
}

function animation(currColor){
   $("#" + currColor).addClass("pressed");
   setTimeout(function(){
      $("#" + currColor).removeClass("pressed");
   }, 100);
}

function playSound(name){         
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}


function startOver(){
   level = 0;
   pattern = [];
   started = false;
}

// console.log(clickPattern)