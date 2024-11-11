var ball = document.getElementById("ball");
var paddleLeft = document.getElementById("paddle-left");
var paddleRight = document.getElementById("paddle-right");
var game = document.getElementById("game");
var scoreDisplay = document.getElementById("score");

var ballX = 350;
var ballY = 200;
var xSpeed = 3;
var ySpeed = 3;
var ballSpeed = 15;

var paddleSpeed = 20;
var paddleTopBoundary = 0;
var paddleBottomBoundary = game.clientHeight - paddleLeft.clientHeight;

var paddleLeftScore = 0;
var paddleRightScore = 0;

function startGame() {
    moveBall();
}

document.addEventListener("keydown", function (e) {
    // Player 1 controls (W, S)
    if (e.key === 'w' || e.key === 'W') {
        movePaddle('left', 'up');
    } else if (e.key === 's' || e.key === 'S') {
        movePaddle('left', 'down');
    }
    // Player 2 controls (Up, Down)
    if (e.key === 'ArrowUp') {
        movePaddle('right', 'up');
    } else if (e.key === 'ArrowDown') {
        movePaddle('right', 'down');
    }
});

function movePaddle(player, direction) {
    var paddle = player === 'left' ? paddleLeft : paddleRight;
    var top = paddle.offsetTop;

    if (direction === 'up' && top > paddleTopBoundary) {
        paddle.style.top = top - paddleSpeed + "px";
    } else if (direction === 'down' && top < paddleBottomBoundary) {
        paddle.style.top = top + paddleSpeed + "px";
    }
}

function moveBall() {
    ballX += xSpeed;
    ballY += ySpeed;

    // Bounce off top and bottom walls
    if (ballY <= 0 || ballY >= game.clientHeight - ball.clientHeight) {
        ySpeed = -ySpeed;
    }

    // Check for left paddle collision
    if (ballX <= paddleLeft.clientWidth && ballY >= paddleLeft.offsetTop && ballY <= paddleLeft.offsetTop + paddleLeft.clientHeight) {
        xSpeed = -xSpeed;
    }

    // Check for right paddle collision
    if (ballX >= game.clientWidth - paddleRight.clientWidth - ball.clientWidth && ballY >= paddleRight.offsetTop && ballY <= paddleRight.offsetTop + paddleRight.clientHeight) {
        xSpeed = -xSpeed;
    }

    // Check for scoring
    if (ballX <= 0) {
        paddleRightScore++;
        resetBall();
    } else if (ballX >= game.clientWidth - ball.clientWidth) {
        paddleLeftScore++;
        resetBall();
    }

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    scoreDisplay.textContent = `Player 1: ${paddleLeftScore} | Player 2: ${paddleRightScore}`;

    setTimeout(moveBall, ballSpeed);
}

function resetBall() {
    ballX = 350;
    ballY = 200;
    xSpeed = 3 * (Math.random() < 0.5 ? 1 : -1);
    ySpeed = 3 * (Math.random() < 0.5 ? 1 : -1);
}