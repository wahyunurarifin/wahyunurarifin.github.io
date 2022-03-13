const CELL_SIZE = 20;
const CANVAS_SIZE = 520;
let redraw_interval = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}

let move_interval = 200;
//set default hp
let hp = 3;
let speedlUp = 0;
function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body, 
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
    }
}
let snake1 = initSnake();

// make apples array
let apples = [{
    // color: "red",
    position: initPosition(),
},
{
    // color: "green",
    position: initPosition(),
}]

//make heart array
let hearts = [{
    // color: "pink",
    position: initPosition(),
}]

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// Tambahkan score board
function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = "#000000";
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

// function speed(){
//     return MOVE_INTERVAL-20;
// }

// membuat function rintangan level game
function level1(){
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(260, 100, 20, 250);
}
function level2(){
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(120, 260, 260, 20);
}
function level3(){
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(140, 200, 260, 20);
    ctx.fillRect(140, 320, 260, 20);
}
function level4(){
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(200, 80, 20, 120);
    ctx.fillRect(200, 240, 20, 160);

    ctx.fillRect(320, 80, 20, 160);
    ctx.fillRect(320, 280, 20, 120);
}
function level5(){
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(200, 80, 20, 120);
    ctx.fillRect(200, 240, 20, 160);

    ctx.fillRect(320, 80, 20, 160);
    ctx.fillRect(320, 280, 20, 100);
    
    ctx.fillRect(140, 240, 260, 20);
}

function watchSnake(snake1){
    // menambahkan kecepatan snake tiap level
    if (snake1.body.length >= 6 && snake1.body.length <= 10){
        speedUp(150)
    
    } else if (snake1.body.length >= 11 && snake1.body.length <= 15){
        speedUp(120)
             
    } else if (snake1.body.length >= 16 && snake1.body.length <= 20){
        speedUp(100)
         
    } else if (snake1.body.length >= 21 && snake1.body.length <= 25){
        speedUp(80)
         
    } else if (snake1.body.length >= 26){
        speedUp(60)
         
    }
}


function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        // drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);
        // mengubah image pada snake
        let snakeHead = document.getElementById("head");
        let snakeBody = document.getElementById("body");
        ctx.drawImage(snakeHead, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        for (let i = 1; i < snake1.body.length; i++) {
            ctx.drawImage(snakeBody, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            
        }

        for (let i = 0; i < apples.length; i++) {
            let apple = apples[i];

            // DrawImage apple dan gunakan image id:
            var img = document.getElementById("apple");
            ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        // Menambahkan heart di screen menggunakan image id
        for(let i = 0; i < hearts.length; i++){
            let heart = hearts[i];

            var img1 = document.getElementById("heart");
            ctx.drawImage(img1, heart.position.x * CELL_SIZE, heart.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE); 
        }

        // Menambahkan obstacle tiap level
        if (snake1.body.length >= 6 && snake1.body.length <= 10){
            
            level1();
     
        } else if (snake1.body.length >= 11 && snake1.body.length <= 15){
            
            level2();
    
        } else if (snake1.body.length >= 16 && snake1.body.length <= 20){
            
            level3();
    
        } else if (snake1.body.length >= 21 && snake1.body.length <= 25){
            
            level4();
    
        } else if (snake1.body.length >= 26){
            
            level5();
        }    
        drawScore(snake1);

        // mendapatkan speed, hp ular
        document.getElementById("speed").innerHTML = move_interval;
        document.getElementById("hp").innerHTML = hp;
        // document.getElementById("speedBoard") = move_interval;
        // let speedCtx = speedCanvas.getContext("2d");

        // speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        // speedCtx.font = "30px Arial";
        // speedCtx.fillStyle = "#000000";
        // speedCtx.fillText(snake.speed, 10, speedCanvas.scrollHeight / 2);
        

    }, redraw_interval);
}


function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

//  menambahkan array hearts
function eat(snake, apples, hearts) {
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            apple.position = initPosition();
            snake.score++;
            snake.body.push({x: snake.head.x, y: snake.head.y});
        }
    }
    for (let i = 0; i < hearts.length; i++) {
        let heart = hearts[i];
        if (snake.head.x == heart.position.x && snake.head.y == heart.position.y) {
            heart.position = initPosition();
            hp++;
        }
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apples, hearts);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apples, hearts);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apples, hearts);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples, hearts);
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        // Soal no 5: Add game over audio:
        var audio = new Audio('assets/game-over.mp3');
        audio.play();

        alert("Game over");
        snake1 = initSnake();
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    watchSnake(snake);
    // Check collision dengan snake
    if (!checkCollision([snake1])) {
        setTimeout(function() {
            move(snake);
        }, move_interval);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    
    if (event.key === "a") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "d") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "w") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "s") {
        turn(snake1, DIRECTION.DOWN);
    }

})

function initGame() {
    move(snake1);
}

initGame();