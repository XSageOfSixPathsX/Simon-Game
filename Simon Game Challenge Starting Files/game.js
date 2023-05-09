var gamepattern=[];
var userClickedPattern=[];
var buttonColors=["green","red","yellow","blue"];
var level=0;

function randomColor(){
    var randomChosenColor=buttonColors[nextSequence()];
    gamepattern.push(randomChosenColor);

}

function nextSequence(){
    var randomNumber=Math.random()*4;
    randomNumber=Math.floor(randomNumber);
    ++level;

    return randomNumber;
}


function playAudio(input){
    var audioFile=new Audio(input+".mp3");
    audio.play();
}

function next(){
    $("#level-title").text("Level "+level);
    var req=randomColor();
    $("."+req).css("visibility","hidden");
    setTimeout(function(){
        $("."+req).css("visibility","visible");
    },100);
};

document.addEventListener("keydown",checkAnswer);

function checkAnswer()
{
    
    next();
    var check=1;
    var len=gamepattern.length;
   
    for(var i=0;i<len;++i)
    {
        $("btn").click(function(){
            var userChosenColor=this.attr("id");
            userClickedPattern.push(userChosenColor);
            playAudio(userChosenColor);
            $("#"+userChosenColor).addClass("pressed");
            setTimeout(function(){
                $("#"+userChosenColor).removeClass("pressed");
            },100);
            
        })
        
        if(userClickedPattern[userClickedPattern.length-1]!=gamepattern[i])
        {
            check=0;
            break;
        }
    }
    if(check==0)
    {
        $("#level-title").text("Game Over,press any key to restart");
        $("body").addClass(".game-over");
        setTimeout(function(){
            $("body").removeClass(".game-over");
        },1000);
        restart();
    }

}

function restart(){
    document.removeEventListener("keydown",function(){
        gamepattern=[];
        userClickedPattern=[];
        level=0;
        checkAnswer();
    })
}