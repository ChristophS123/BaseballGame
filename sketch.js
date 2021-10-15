let ballImage;
let batImage;
let bottleImage;
let bombImage;
let gameOverScreen;
let hitSound;
let bombSound;
let baseSound;
let gameOverSound;
let applaus;
let baseballImage;
let bat;
let ball;
let bottle;
let bomb;
let bomb2;
let fails = 0;
let hits = 0;
let lastBatX = 0;
let highScore;
let input;
let greeting;
let buttonInput;
let isSending = false
let isloading = false;
let highScores = [];
let record;

//let myArray = [
//  {
//      name: "fabian",
//     alter: 30
// },
// { name: "christoph", alter: 14 }
//]

//for(let i = 0; i< myArray.length; i++){
//console.log(myArray[i].alter)
//} 


function preload() {
    loadAssets();
}


function setup() {
    createCanvas(800, 450);
    bat = new Bat(batImage);
    ball = new Ball(ballImage, 5, 5);
    bottle = new Bottle(bottleImage, 3);
    bomb = new Bomb(bombImage, 3, 3)
    bomb2 = new Bomb(bombImage, 3, 3)
    fails = 0;
    setTimeout(startBomb, 2000);
    setTimeout(startBomb, 13000);

    input = createInput();
    buttonInput = createButton('Bestätigen');

    input.hide();
    buttonInput.hide();

    //let numbers = [
       // { number: 21, name: "fabian" },
       //  { number: 15, name: "test" },
       //   { number: 3, name: "agadgadg" }
       // ];

    //prios.sort(function (a, b) {
    //    return a.number - b.number;
   // });

   // console.log(numbers)
}


function draw() {
    background(156, 178, 156);
    image(baseballImage, 0, 0, 800, 450);

    drawText();
    createObjects();

    checkForCollision();

    checkForGameOver();

}


function checkForGameOver() {
    if (fails >= 10) {
        background(156, 178, 156);
        image(gameOverScreen, 0, 0, 800, 250);
        //fill("blue");
        //textSize(80);
        textAlign(LEFT);
        //text('GAME OVER', 400, 100);
        textSize(40);
        text('Treffer: ' + hits, 10, 250);
        fill("black");
        textSize(35);
        text('Bestenliste:', 500, 280);
        textSize(30);
        fill("yellow")
        input.show();

        if (highScores && Array.isArray(highScores) && highScores.length > 0) {

            highScores.sort(function(a, b) {
                return a.score - b.score;
            })

            text('1. ' + highScores[highScores.length-1].userName + ": " + highScores[highScores.length-1].score, 520, 340);
            fill(196, 196, 194)
            text('2. ' + highScores[highScores.length-2].userName + ": " + highScores[highScores.length-2].score, 520, 380);
            fill(173, 134, 3)
            text('3. ' + highScores[highScores.length-3].userName + ": " + highScores[highScores.length-3].score, 520, 420);

        }

        textSize(25);
        fill("black");
        text("Dein NickName:", 20, 370);

        buttonInput.show();
        buttonInput.position(input.x + input.width, 400);
        buttonInput.mousePressed(greet);

        input.position(20, 400);

    }
}


function greet() {

    const name = input.value();
    input.value('');
    console.log(name);

    let postUrl = 'https://codeweek-scoreboard-b92vu.ondigitalocean.app/score'
    let postData = {
        userName: name,
        score: hits,
        game: "baseball"
    }
    isSending = true
    httpPost(postUrl, 'json', postData, function (result) {
        isSending = false
    });

}


function checkForCollision() {
    if (ball.isOutOffCanvas()) {
        fails++;
        ball = new Ball(ballImage, 5, 5);
    }
    for (let checkX = lastBatX; checkX <= mouseX; checkX++) {
        if (ball.isCollideWithBat(checkX, bat.y)) {
            ball.state = "hit";
            baseSound.play();
        }

        if (bomb.isCollideWithBat(checkX, bat.y)) {
            fails = 10
            bombSound.play();
            gameOverSound.play();

            let url = 'https://codeweek-scoreboard-b92vu.ondigitalocean.app/score?game=baseball'

            isloading = true;
            httpGet(url, 'jsonp', false, function (response) {
                // when the HTTP request completes, populate the variable that holds the
                // earthquake data used in the visualization.
                isloading = false;
                highScores = response;
                highScores.reverse();
            });

        }
    }


    if (ball.isHitOutOfCanvas()) {
        fails++;
        ball = new Ball(ballImage, 5, 5);

        if (fails >= 10)
            gameOverSound.play();

    }


    if (ball.isCollideWithBottle(bottle.x, bottle.y)) {

        hitSound.play();
        applaus.play();
        hits++;
        ball = new Ball(ballImage, 5, 5)
        bottle.destroy();

        setTimeout(createnewBottle, 1000);
    }

    lastBatX = mouseX
}


function createObjects() {
    bat.create();
    bat.move();

    bottle.create();
    bottle.move();

    bomb.create();
    bomb.move();

    ball.move();
    ball.create();
}


function drawText() {
    textAlign(LEFT);
    textStyle(BOLD);
    textSize(25)
    fill("black")
    text("Fehler: " + fails, 30, 50)

    textSize(25)
    fill("black")
    text("Treffer: " + hits, 180, 50)
}


function loadAssets() {
    ballImage = loadImage("./ball.png");
    batImage = loadImage("./baseBallBat.png");
    bottleImage = loadImage("./bottle.png");
    bombImage = loadImage("./bomb.png");
    baseballImage = loadImage("./baseballFeld.jpg");
    gameOverScreen = loadImage("./gameOverScreen.png");
    hitSound = loadSound('hit.wav');
    bombSound = loadSound('explode.wav');
    baseSound = loadSound('nutfall.flac');
    gameOverSound = loadSound('GameOver.wav');
    applaus = loadSound('applause.wav');
}


function keyPressed() {
    if (keyCode === 32 && fails >= 10) {
        bat = new Bat(batImage);
        ball = new Ball(ballImage, 5, 5);
        bottle = new Bottle(bottleImage, 3);
        bomb = new Bomb(bombImage, 3, 3)
        fails = 0;
        hits = 0;
        setTimeout(startBomb, 8000);
        setTimeout(startBomb, 13000);
        input.hide();
        buttonInput.hide();
        console.log(buttonInput)
    }
}


function startBomb() {
    bomb.state = "up";
    bomb2.state = "up";
}


function createnewBottle() {
    bottle = new Bottle(bottleImage, (hits / 5) + 3);
}
