let P_STILL;
let BACKGROUND;
let BOX;
let LEVEL;
let BLOCKS_PER_SCREEN_H;
let BLOCKS_PER_SCREEN_W;
const PIXELS_PER_BLOCK = 24;
let SPRITE_X = 6; // block numbers
let SPRITE_Y = 20; // block numbers
let OFFSET_X = 0; // block numbers not pixel numbers
let OFFSET_Y = 0; // block numbers not pixel numbers
let JUMP = 0;
let COINS = 0;
let HEALTH = 100;
let GOAL = false;
let SHOW = "still";
let SOUND_COIN;
let SOUND_OUCH;

function preload() {
    P_STILL = loadImage("assets/p3_front.png");
    P_WALK_R = loadImage("assets/p3_walk.gif");
    P_WALK_L = loadImage("assets/p3_walk.gif");
    P_JUMP = loadImage("assets/p3_jump.png");
    P_FALL = loadImage("assets/p3_duck.png");
    BACKGROUND = loadImage("assets/bg_hongkong2.png");
    BOX = loadImage("assets/box.png");
    COIN = loadImage("assets/coinGold.png");
    OUCH = loadImage("assets/spikes.png");
    LEVEL = loadStrings("levels.txt");
    SOUND_COIN = loadSound("assets/coin.wav");
    SOUND_OUCH = loadSound("assets/ouch.wav");
}

function setup() {
    frameRate(15);
    createCanvas(windowWidth, windowHeight);
    BACKGROUND.resize(windowWidth, windowHeight);
    BOX.resize(PIXELS_PER_BLOCK,PIXELS_PER_BLOCK);
    COIN.resize(PIXELS_PER_BLOCK,PIXELS_PER_BLOCK);
    OUCH.resize(PIXELS_PER_BLOCK,PIXELS_PER_BLOCK);
    BLOCKS_PER_SCREEN_H = windowHeight/PIXELS_PER_BLOCK;
    BLOCKS_PER_SCREEN_W = windowWidth/PIXELS_PER_BLOCK;
    console.log("BLOCKS PER SCREEN height ",BLOCKS_PER_SCREEN_H," width ",BLOCKS_PER_SCREEN_W);
    for (let i=0; i<LEVEL.length; i++) {
        LEVEL[i] = LEVEL[i].split("");
    }
    SOUND_COIN.playMode("restart");
    SOUND_OUCH.playMode("restart");
}

function drawSprite() {
    let IMAGE = P_STILL;
    if (SHOW === "left") {
        IMAGE = P_WALK_L;
    } else if (SHOW === "right") {
        IMAGE = P_WALK_R;
    } else if (SHOW === "jump") {
        IMAGE = P_JUMP;
    } else if (SHOW === "fall") {
        IMAGE = P_FALL;
    }
    noFill();
    strokeWeight(4);
    stroke('red');
    let x = SPRITE_X*PIXELS_PER_BLOCK;
    let y = SPRITE_Y*PIXELS_PER_BLOCK;
    let w = PIXELS_PER_BLOCK;
    let h = PIXELS_PER_BLOCK*3;
    image(IMAGE, x-IMAGE.width/2+PIXELS_PER_BLOCK/2, y-IMAGE.height+PIXELS_PER_BLOCK*3);
    //rect(x,y,w,h) // x,y,w,h
}

function moveLeft() {
    let testX = OFFSET_X+SPRITE_X-1;
    let testY = OFFSET_Y+SPRITE_Y;
    if (LEVEL[testY][testX] === '.' || LEVEL[testY][testX] === 'o' || LEVEL[testY][testX] === '$') {
        if (LEVEL[testY+1][testX] === '.' || LEVEL[testY+1][testX] === 'o' || LEVEL[testY+1][testX] === '$') {
            if (LEVEL[testY+2][testX] === '.' || LEVEL[testY+2][testX] === 'o' || LEVEL[testY+2][testX] === '$') {
                OFFSET_X = OFFSET_X - 1; 
                SHOW = "left";       
            }       
        }    
    }
}

function moveRight() {
    let testX = OFFSET_X+SPRITE_X+1;
    let testY = OFFSET_Y+SPRITE_Y;
    if (LEVEL[testY][testX] === '.' || LEVEL[testY][testX] === 'o' || LEVEL[testY][testX] === '$') {
        if (LEVEL[testY+1][testX] === '.' || LEVEL[testY+1][testX] === 'o' || LEVEL[testY+1][testX] === '$') {
            if (LEVEL[testY+2][testX] === '.' || LEVEL[testY+2][testX] === 'o' || LEVEL[testY+2][testX] === '$') {
                OFFSET_X = OFFSET_X + 1; 
                SHOW = "right";       
            }       
        }    
    }
}

function moveJump() {
    console.log("moveJump",JUMP)
    if (JUMP === 0) {
        if (SPRITE_Y+OFFSET_Y+3 === LEVEL.length || LEVEL[SPRITE_Y+OFFSET_Y+3][SPRITE_X+OFFSET_X] === "#") {
            console.log("Creating a jump")
            JUMP = 7;   
            SHOW = "jump"; 
        }
    }
}

function play() {
    // DRAW THE BACKGROUND
    // background('#fae');
    image(BACKGROUND, 0, 0);

    // DRAW THE LEVELS
    for (let row=OFFSET_Y; row<(OFFSET_Y+BLOCKS_PER_SCREEN_H); row=row+1) {
        for (let column=OFFSET_X; column<(OFFSET_X+BLOCKS_PER_SCREEN_W); column=column+1) {
            // console.log("row",row,"column",column,"contains",LEVEL[row][column]);
            let x = column*PIXELS_PER_BLOCK - OFFSET_X*PIXELS_PER_BLOCK;
            let y = row*PIXELS_PER_BLOCK - OFFSET_Y*PIXELS_PER_BLOCK;
            if (row >= 0 && row < LEVEL.length && column >= 0 && column < LEVEL[row].length) {
                if (LEVEL[row][column] === '#') { // Draw box
                    image(BOX, x, y);
                }
                if (LEVEL[row][column] === 'W') { // Draw box
                    image(BOX, x, y);
                }
                if (LEVEL[row][column] === 'o') { // Draw coin
                    image(COIN, x, y);
                }
                if (LEVEL[row][column] === '|') { // Draw spikes
                    image(OUCH, x, y);
                }
            }
        }
    }

    // RESPOND TO THE USER - KEYBOARD/MOUSE INTERACTION
    SHOW = "still";
    if (keyIsDown(65)) { // letter a
        moveLeft();
    }
    if (keyIsDown(68)) { // letter d
        moveRight();
    }
    if (keyIsDown(87)) { // letter w
        moveJump();
    }
    if (keyIsDown(83)) { // letter s
        OFFSET_Y = OFFSET_Y + 1;
    }
    if (mouseIsPressed) {
        console.log("mouseIsPressed",mouseX);
        if (mouseX < windowWidth/3) {
            moveLeft();
        }
        if (mouseX > windowWidth*2/3) {
            moveRight();
        }
    }
    // Are we jumping?
    if (JUMP > 0) {
        let jumpTestX = SPRITE_X+OFFSET_X;
        let jumpTestY = SPRITE_Y+OFFSET_Y-1;
        if (jumpTestY >= 0) { // Check we aren't hitting our head
            if (LEVEL[jumpTestY][jumpTestX] != "#") { // Check what is above us 
                OFFSET_Y = OFFSET_Y - 1; // Move up
                SHOW = "jump";
            } else { // Stop trying to move up
                JUMP = 1;
            }
        }
        JUMP = JUMP - 1;
    } else {
        // Are we falling?
        let fallTestX = SPRITE_X+OFFSET_X;
        let fallTestY = SPRITE_Y+OFFSET_Y+3;
        if (fallTestY < LEVEL.length) {
            if (LEVEL[fallTestY][fallTestX] != "#") { // falling
                OFFSET_Y = OFFSET_Y + 1;
                SHOW = "fall";
            }    
        }
    }
    // Are we collecting a coin?
    if (LEVEL[OFFSET_Y+SPRITE_Y][OFFSET_X+SPRITE_X] === 'o') {
        COINS = COINS + 1
        SOUND_COIN.play();
        LEVEL[OFFSET_Y+SPRITE_Y][OFFSET_X+SPRITE_X] = '.';
    }
    if (LEVEL[OFFSET_Y+SPRITE_Y+1][OFFSET_X+SPRITE_X] === 'o') {
        COINS = COINS + 1
        SOUND_COIN.play();
        LEVEL[OFFSET_Y+SPRITE_Y+1][OFFSET_X+SPRITE_X] = '.';
    }
    if (LEVEL[OFFSET_Y+SPRITE_Y+2][OFFSET_X+SPRITE_X] === 'o') {
        COINS = COINS + 1
        SOUND_COIN.play();
        LEVEL[OFFSET_Y+SPRITE_Y+2][OFFSET_X+SPRITE_X] = '.';
    }
    // Are we in a spike pit?
    if (LEVEL[OFFSET_Y+SPRITE_Y][OFFSET_X+SPRITE_X] === '|') {
        HEALTH = HEALTH - 1;
        SOUND_OUCH.play();
    }
    if (LEVEL[OFFSET_Y+SPRITE_Y+1][OFFSET_X+SPRITE_X] === '|') {
        HEALTH = HEALTH - 1;
        SOUND_OUCH.play();
    }
    if (LEVEL[OFFSET_Y+SPRITE_Y+2][OFFSET_X+SPRITE_X] === '|') {
        HEALTH = HEALTH - 1;
        SOUND_OUCH.play();
    }
    // Have we reached the goal?
    if (LEVEL[OFFSET_Y+SPRITE_Y][OFFSET_X+SPRITE_X] === '$') {
        GOAL = true;
    }
    if (LEVEL[OFFSET_Y+SPRITE_Y+1][OFFSET_X+SPRITE_X] === '$') {
        GOAL = true;
    }
    if (LEVEL[OFFSET_Y+SPRITE_Y+2][OFFSET_X+SPRITE_X] === '$') {
        GOAL = true;
    }


    // DRAW THE PLAYER
    drawSprite();
    // DRAW COINS AND HEALTH INFO
    fill('black');
    noStroke();
    rect(0,0,windowWidth,PIXELS_PER_BLOCK);
    fill('white');
    textSize(20);
    text('Coins: '+COINS, 0, PIXELS_PER_BLOCK);
    textAlign(RIGHT);
    text('Health: '+HEALTH, windowWidth, PIXELS_PER_BLOCK);
    textAlign(LEFT);

    // GAME OVER???
    if (HEALTH <= 0) {
        console.log("Game over");
    }
}

function draw() {
    if (HEALTH <= 0) {
        // Game over screen
        fill('red');
        rect(0,0,windowWidth,windowHeight);
        fill('white');
        textSize(50);
        textAlign(CENTER);
        text("Game over :<", windowWidth/2, 100);
        text("Your score: "+COINS, windowWidth/2, 200);
    } else if (GOAL) {
        fill('green');
        rect(0,0,windowWidth,windowHeight);
        fill('white');
        textSize(50);
        textAlign(CENTER);
        text("You finished :D", windowWidth/2, 100);
        text("Your score: "+COINS, windowWidth/2, 200);
    } else {
        play();
    }
}

