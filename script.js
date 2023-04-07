const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set up the canvas size
canvas.width = 600;
canvas.height = 400;

// Set up the paddles
const paddleWidth = 10;
const paddleHeight = 100;
const player1 = {
	x: 50,
	y: canvas.height/2 - paddleHeight/2,
	score: 0
};
const player2 = {
	x: canvas.width - 50 - paddleWidth,
	y: canvas.height/2 - paddleHeight/2,
	score: 0
};

// Set up the ball
const ballSize = 10;
let ballX = canvas.width/2 - ballSize/2;
let ballY = canvas.height/2 - ballSize/2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Draw the paddles and ball
function draw() {
	// Clear the canvas
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Draw the paddles
	ctx.fillStyle = 'white';
	ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);
	ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);

	// Draw the ball
	ctx.fillRect(ballX, ballY, ballSize, ballSize);

	// Draw the scores
	ctx.fillText(player1.score + " : " + player2.score, canvas.width/2, 50);
}

// Move the paddles
function movePaddles() {
	// Move player 1 paddle
	if (wKeyDown && player1.y > 0) {
		player1.y -= 5;
	}
	if (sKeyDown && player1.y < canvas.height - paddleHeight) {
		player1.y += 5;
	}

	// Move player 2 paddle
	if (upKeyDown && player2.y > 0) {
		player2.y -= 5;
	}
	if (downKeyDown && player2.y < canvas.height - paddleHeight) {
		player2.y += 5;
	}
}

// Update the ball position
function moveBall() {
	// Move the ball
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	// Bounce off the walls
	if (ballY < 0 || ballY > canvas.height - ballSize) {
		ballSpeedY *= -1;
	}

	// Check if the ball hits the paddles
	if ((ballX <= player1.x + paddleWidth && ballY >= player1.y && ballY <= player1.y + paddleHeight) || 
		(ballX >= player2.x - ballSize && ballY >= player2.y && ballY <= player2.y + paddleHeight)) {
        ballSpeedX *= -1;
        }
        
        // Check if the ball goes out of bounds
        if (ballX < 0) {
        player2.score++;
        resetBall();
        } else if (ballX > canvas.width - ballSize) {
        player1.score++;
        resetBall();
        }
        }
        
        // Reset the ball position
        function resetBall() {
        ballX = canvas.width/2 - ballSize/2;
        ballY = canvas.height/2 - ballSize/2;
        ballSpeedX *= -1;
        ballSpeedY *= Math.random() < 0.5 ? -1 : 1;
        }
        
        // Handle keyboard input
        let wKeyDown = false;
        let sKeyDown = false;
        let upKeyDown = false;
        let downKeyDown = false;
        
        document.addEventListener('keydown', function(event) {
        if (event.key == 'w') {
        wKeyDown = true;
        } else if (event.key == 's') {
        sKeyDown = true;
        } else if (event.key == 'ArrowUp') {
        upKeyDown = true;
        } else if (event.key == 'ArrowDown') {
        downKeyDown = true;
        }
        });
        
        document.addEventListener('keyup', function(event) {
        if (event.key == 'w') {
        wKeyDown = false;
        } else if (event.key == 's') {
        sKeyDown = false;
        } else if (event.key == 'ArrowUp') {
        upKeyDown = false;
        } else if (event.key == 'ArrowDown') {
        downKeyDown = false;
        }
        });
        
        // Update the game every frame
        function update() {
        draw();
        movePaddles();
        moveBall();
        // Check if a player has won
        if (player1.score >= 10 || player2.score >= 10) {
        let winner = player1.score >= 10 ? "Player 1" : "Player 2";
        alert(winner + " wins!");
        player1.score = 0;
        player2.score = 0;
        }
        }
        setInterval(update, 1000/60); // 60 frames per second