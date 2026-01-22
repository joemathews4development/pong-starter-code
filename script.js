// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // the ball node is created
ballNode.id = "ball"; // we assign an id to the node, just for styles
gameBoxNode.append(ballNode); // we add the node to the game box

const paddleNode = document.createElement("div"); // the paddle node is created
paddleNode.id = "paddle"; // we assign an id to the node, just for styles
gameBoxNode.append(paddleNode); // we add the node to the game box

const ball = {
    x: 30,
    y: 30,
    w: 20,
    h: 20,
    isMovingRight: true,
    isMovingDown: true
}

// assign initial styles

ballNode.style.left = `${ball.x}px`
ballNode.style.top = `${ball.y}px`
ballNode.style.width = `${ball.w}px`
ballNode.style.height = `${ball.h}px`

const paddle = {
    x: 100,
    y: 530,
    w: 100,
    h: 20
}

// assign initial styles

paddleNode.style.left = `${paddle.x}px`
paddleNode.style.top = `${paddle.y}px`
paddleNode.style.width = `${paddle.w}px`
paddleNode.style.height = `${paddle.h}px`


// *** Game Functions ***
function gameLoop() {
    ballMovement()
    ballWallCollision()
    ballPaddleCollision()
}

function ballMovement() {
    if (ball.isMovingRight) {
        ball.x += 1
        ballNode.style.left = `${ball.x}px`
    } else {
        ball.x -= 1
        ballNode.style.left = `${ball.x}px`
    }
    if (ball.isMovingDown) {
        ball.y += 1
        ballNode.style.top = `${ball.y}px`
    } else {
        ball.y -= 1
        ballNode.style.top = `${ball.y}px`
    }
    
}

/**
 * Checks whether the ball is colliding the wall
 */
function ballWallCollision() {
    if((ball.x + ball.w) >= 400) {
        ball.isMovingRight = false
    } else if (ball.x < 0) {
        ball.isMovingRight =true
    }
    if ((ball.y + ball.h)>= 600) {
        gameOver()
    } else if (ball.y < 0) {
        ball.isMovingDown =true
    }
}

function ballPaddleCollision() {
    if ((ball.y + ball.h) > paddle.y && ball.x > paddle.x && (ball.x + ball.w) < (paddle.x + paddle.w)) {
        ball.isMovingDown = false
    }
}

function gameOver() {
    alert("Game Over! You Lose!")
    clearInterval(gameIntervalId)
}




// *** Game Loop Interval ***
let gameIntervalId = setInterval(gameLoop, 1000 / 60) // 60fps




// *** Event Listeners ***
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        if (paddle.x >= 30) {
            paddle.x -= 30
        } else {
            paddle.x = 0
        }
        paddleNode.style.left = `${paddle.x}px`
    }
    if (event.key === "ArrowRight") {
        if ((paddle.x + paddle.w) <= 370) {
            paddle.x += 30
        } else {
            paddle.x = 400 - paddle.w
        }
        paddleNode.style.left = `${paddle.x}px`
    }
})



