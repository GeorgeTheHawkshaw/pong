//Makes a 'canvas' thing,
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//The Ball
var x = canvas.width / 2; //Start Position x
var y = canvas.height - 30; //Start Position y
var dx = 2; //The increment in which the ball moves
var dy = -2; //The increment in which the  ball moves in the y direction
var ballRadius = 10; //Make a variable called BallRadius

//Left Paddle
var paddleHeight = 75;
var paddleWidth = 10;
var paddleX = (canvas.width - paddleWidth) / 15;
var paddleY = canvas.height / 3;
var upPressed = false;
var downPressed = false;

//Right paddle
var paddle2Height = paddleHeight;
var paddle2Width = paddleWidth;
var paddle2X = canvas.width - paddleX - paddleWidth;
var paddle2Y = paddleY;
var up2Pressed = false;
var down2Pressed = false;

//Score Keeping
var scoreLeft = 0;
var scoreRight = 0;
var textPositionX = 8;
var textPositionY = 20;
var collisionCounter = 0;

//Key Listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Color Array
const colors = [
  "#99ff66",
  "#0066cc",
  "#cc33ff",
  "#00cc00",
  "#ff5050",
  "#ccff66",
  "#6600ff",
  "#666633",
  "#66ffcc",
  "#00cc66"
]
var color = colors[0];

function keyDownHandler(e) {
  //Left Paddle
  if (e.keyCode == 87) {
    upPressed = true;
  } else if (e.keyCode == 83) {
    downPressed = true;
  }
  //Right Paddle
  if (e.keyCode == 38) {
    up2Pressed = true;
    console.log("Up Arrow is Pressed")
  } else if (e.keyCode == 40) {
    down2Pressed = true;
    console.log("Down arrow pressed")
  }
}

function keyUpHandler(e) {
  //Left Paddle
  if (e.keyCode == 87) {
    upPressed = false;
  } else if (e.keyCode == 83) {
    downPressed = false;
  }
  //Right Paddle
  if (e.keyCode == 38) {
    up2Pressed = false;
  } else if (e.keyCode == 40) {
    down2Pressed = false;
  }
}

function drawBall() {
  ctx.beginPath(); //Beginning of instruction
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //Draw a circle at x and y, radius 10, Start angle 0 and End angle 2pi
  //ctx.fillStyle = colors[Math.floor(Math.random() * colors.length - 1)]; //Make the circle green
  ctx.fillStyle = color;
  ctx.fill(); //Fill the circle
  ctx.closePath(); //End of instructions
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddleTwo() {
  ctx.beginPath();
  ctx.rect(paddle2X, paddle2Y, paddle2Width, paddle2Height)
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#1a0d00";
  ctx.fillText("Hits: " + collisionCounter, textPositionX, textPositionY);
}

function whoWon() {
  if (x < canvas.width / 2) {
    return "Player 2 wins!"
  } else {
    return "Player 1 wins!"
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height) //Clear the screen each frame
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  } else if (x + dx > canvas.width - ballRadius || x + dx + ballRadius < 0) { //GAME OVER SCREEN
    alert("GAME OVER: " + whoWon())
    document.location.reload();
  }
  //Collision Left
  if (x + dx < paddleX + paddleWidth && y > paddleY && y < paddleY + paddleHeight) {
    dx = -dx;
    scoreLeft++;
    collisionCounter++;
    color = colors[Math.floor(Math.random() * colors.length - 1)]
    if (collisionCounter % 10 == 0 && collisionCounter != 0) {
      dx++;
      dy--;
    }
  }
  //Collirions Right
  if (x + dx > paddle2X && y > paddle2Y && y < paddle2Y + paddle2Height) {
    dx = -dx;
    scoreRight++;
    collisionCounter++;
    color = colors[Math.floor(Math.random() * colors.length - 1)]
    if (collisionCounter % 10 == 0 && collisionCounter != 0) {
      dx++;
      dy--;
    }
  }
  drawBall();
  drawPaddle();
  drawPaddleTwo();
  drawScore();
  x += dx; //Increment the position of the ball
  y += dy;
  //Control Left Paddle
  if (upPressed && paddleY > 0) {
    paddleY -= 5;
  } else if (downPressed && paddleY + paddleHeight < canvas.height) {
    paddleY += 5;
  }
  //Control Right Paddle
  if (up2Pressed && paddle2Y > 0) {
    paddle2Y -= 5;
  } else if (down2Pressed && paddle2Y + paddle2Height < canvas.height) {
    paddle2Y += 5;
  }
}
setInterval(draw, 10); //Call the draw function every 10 miliseconds