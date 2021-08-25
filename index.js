const buttons = document.querySelectorAll('.btn');
const h1 = document.getElementById('level-title');

//Choices generated by the program
let gamePattern = [];

//Choices user name
let userClickedPattern = [];

// Current Lvl of player
let level = 0;

// Game start info
let hasGameStarted = false;

// Colors
const colors = ['green', 'red', 'yellow', 'blue'];

// Getting random color
function nextSequence() {

    userClickedPattern = [];
    
    // Incrementing level of user
    level++;
    
    h1.innerText = `Level ${level}`;

    const randomColor =  colors[Math.floor(Math.random() * colors.length)];
    // Appending it to the game pattern array
    gamePattern.push(randomColor);

    // flash effect
    $(`#${randomColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);    
    
    // Playing sound effects
    playSound(randomColor);
};

// Play sound when button is pressed
function playSound(name) {
    const audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
};

function animateKey(element) {
    element.classList.add('pressed');

    setTimeout(() => {
        element.classList.remove('pressed');
    }, 100);
}

// Check if user selected the correct option
function isUserCorrect(currentLevel) {
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else {
        playSound('wrong');
        document.body.classList.add('game-over');

        setTimeout(() => {
            document.body.classList.remove('game-over');
        }, 200);

        h1.innerText = `Game Over, Press Any Key to Restart`;

        restartGame();
    }
    
}

$(".btn").click(function(e) {
    
    const userChosenColor = e.target.id;
    const element = e.target;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animateKey(element);

    isUserCorrect(userClickedPattern.length - 1);
});

function restartGame() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    hasGameStarted = false;
}

document.onkeypress = function() {
    if(!hasGameStarted) {
        h1.innerText = `Level ${level}`;
        nextSequence();
        hasGameStarted = true;
    }
};