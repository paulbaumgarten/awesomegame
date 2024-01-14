let P_STILL;
let BACKGROUND;
let BOX;
let LEVEL;
let BLOCKS_PER_SCREEN_H;
let BLOCKS_PER_SCREEN_W;
let PIXELS_PER_BLOCK;
let PLAYER_X = 100;
let PLAYER_Y = 100;

function preload() {
    P_STILL = loadImage("assets/p3_front.png");
    BACKGROUND = loadImage("assets/bg_hongkong2.png");
    BOX = loadImage("assets/box.png");
    COIN = loadImage("assets/coinGold.png");
    OUCH = loadImage("assets/spikes.png");
    LEVEL = loadStrings("levels.txt");
}

function setup() {
    frameRate(15);
    createCanvas(windowWidth, windowHeight);
    BACKGROUND.resize(windowWidth, windowHeight);
    BOX.resize(24,24);
    COIN.resize(24,24);
    OUCH.resize(24,24);
    BLOCKS_PER_SCREEN_H = windowHeight/24;
    BLOCKS_PER_SCREEN_W = windowWidth/24;
    PIXELS_PER_BLOCK = 24;
    for (let i=0; i<LEVEL.length; i++) {
        LEVEL[i] = LEVEL[i].split("");
    }
}

function draw() {
    // DRAW THE BACKGROUND
    // background('#fae');
    image(BACKGROUND, 0, 0);

    // DRAW THE LEVELS
    for (let row=0; row<BLOCKS_PER_SCREEN_H; row=row+1) {
        for (let column=0; column<BLOCKS_PER_SCREEN_W; column=column+1) {
            // console.log("row",row,"column",column,"contains",LEVEL[row][column]);
            if (LEVEL[row][column] === '#') { // Draw box
                image(BOX, column*PIXELS_PER_BLOCK, row*PIXELS_PER_BLOCK);
            }
            if (LEVEL[row][column] === 'W') { // Draw box
                image(BOX, column*PIXELS_PER_BLOCK, row*PIXELS_PER_BLOCK);
            }
            if (LEVEL[row][column] === 'o') { // Draw coin
                image(COIN, column*PIXELS_PER_BLOCK, row*PIXELS_PER_BLOCK);
            }
            if (LEVEL[row][column] === '|') { // Draw spikes
                image(OUCH, column*PIXELS_PER_BLOCK, row*PIXELS_PER_BLOCK);
            }
        }
    }

    // RESPOND TO THE USER - KEYBOARD/MOUSE INTERACTION
    if (keyIsDown(65)) { // letter a
        PLAYER_X = PLAYER_X - 10;
    }
    if (keyIsDown(68)) { // letter d
        PLAYER_X = PLAYER_X + 10;
    }
    if (keyIsDown(87)) { // letter w
        PLAYER_Y = PLAYER_Y - 10;
    }
    if (keyIsDown(83)) { // letter s
        PLAYER_Y = PLAYER_Y + 10;
    }
    if (mouseIsPressed) {
        console.log("mouseIsPressed",mouseX);
        if (mouseX < windowWidth/3) {
            PLAYER_X = PLAYER_X - 10;
        }
        if (mouseX > windowWidth*2/3) {
            PLAYER_X = PLAYER_X + 10;
        }
    }

    // DRAW THE PLAYER
    //circle(PLAYER_X, PLAYER_Y, 100);
    image(P_STILL, PLAYER_X, PLAYER_Y);
}

