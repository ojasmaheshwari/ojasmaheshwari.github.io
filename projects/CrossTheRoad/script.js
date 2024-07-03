const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;

const canvasWrapper = document.getElementById("canvas-wrapper");
const PLAYER_SPEED = 15;
const FPS = 60;

let player;
let separator;
let carsLeft;
let carsRight;
let interval_id;
let score = 0;

let gameOver = false;

function getRndInteger(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomColor() {
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}

const gameCanvas = {
	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.width = CANVAS_WIDTH;
		this.canvas.height = CANVAS_HEIGHT;
		this.context = this.canvas.getContext("2d");

		canvasWrapper.appendChild(this.canvas);
	}
};

function updateCanvas() {
	if (gameOver) {
		clearInterval(interval_id);
	}

	const ctx = gameCanvas.context;
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	player.checkWin();
	player.updateSelf();
	carsRight.moveAll();
	carsRight.checkLoop();
	carsRight.checkCollision();
	carsRight.updateSelf();
	carsLeft.moveAll();
	carsLeft.checkLoop();
	carsLeft.checkCollision();
	carsLeft.updateSelf();
	showScore();
}

function createPlayer(width, height, pos) {
	this.width = width;
	this.height = height;

	this.x = pos[0];
	this.y = pos[1];

	const ctx = gameCanvas.context;

	this.updateSelf = function() {
		ctx.fillStyle = "#d42417";
		ctx.fillRect(this.x, this.y, this.width, this.height);

		ctx.fillStyle = "blue";
		ctx.fillRect(this.x-5, this.y+10, 5, 2);
		ctx.fillRect(this.x-5, this.y+10, 2, 20);
		ctx.fillRect(this.x+this.width, this.y+10, 5, 2);
		ctx.fillRect(this.x+this.width+3, this.y+10, 2, 20);
		ctx.fillRect(this.x, this.y+this.height, 2, 7);
		ctx.fillRect(this.x+this.width-2, this.y+this.height, 2, 7);
		ctx.beginPath();
		ctx.arc(this.x+this.width/2, this.y-4, 5, 0, 2*Math.PI);
		ctx.fill();

		ctx.beginPath();

		ctx.fillStyle = "yellow";
		ctx.moveTo(this.x+(this.width/2)-3, this.y+(this.height/2)-3);
		ctx.lineTo(this.x+(this.width/2)+3, this.y+(this.height/2)-3);
		ctx.lineTo(this.x+(this.width/2), this.y+(this.height/2)+2);
		ctx.lineTo(this.x+(this.width/2)-3, this.y+(this.height/2)-3);

		ctx.fill();
	}

	this.moveUp = function() {
		this.y = this.y - PLAYER_SPEED;
	}

	this.moveDown = function() {
		this.y = this.y + PLAYER_SPEED;
	}

	this.checkWin = function() {
		if (player.y <= 0) {
			console.log("you win");
			player.y = CANVAS_HEIGHT;
			score++;
		}
	}
}

function createSeparator() {
	const ctx = gameCanvas.context;

	this.updateSelf = function() {
		ctx.fillStyle = "black";
		ctx.fillRect(0, CANVAS_HEIGHT/2, CANVAS_WIDTH, 1);
	}
}

function createSingleCar(width, height, x, y, carSpeed, carType) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.carSpeed = carSpeed;

	const ctx = gameCanvas.context;

	if (carType === "right") {
		this.updateSelf = function() {
			ctx.fillStyle = "#c72f24";
			ctx.fillRect(this.x, this.y, this.width, this.height);

			ctx.fillStyle = "#a3170d";
			ctx.fillRect(this.x + this.width - 30, this.y, 20, this.height)

			ctx.fillStyle = "#93c4a0";
			ctx.fillRect(this.x + 3, this.y +5, 8, this.height-10);
		}
	}
	else {
		this.updateSelf = function() {
			ctx.fillStyle = "#c72f24";
			ctx.fillRect(this.x, this.y, this.width, this.height);

			ctx.fillStyle = "#a3170d";
			ctx.fillRect(this.x + this.width - 40, this.y, 20, this.height)

			ctx.fillStyle = "#93c4a0";
			ctx.fillRect(this.x + this.width-10, this.y +5, 8, this.height-10);
		}
	}


	this.moveRight = function() {
		this.x = this.x + this.carSpeed;
	}

	this.moveLeft = function() {
		this.x = this.x - this.carSpeed;
	}
}

function carBundleLeft(amount) {
	let cars = [];

	for (let i=0; i<amount; i++) {
		let car = new createSingleCar(50, 30, -50, CANVAS_HEIGHT-(i*40) - 100, getRndInteger(2, 5));
		cars.push(car);
	}

	this.cars = cars;
	this.updateSelf = function() {
		this.cars.forEach((car) => {
			car.updateSelf();
		})
	}

	this.moveAll = function() {
		this.cars.forEach((car) => {
			car.moveRight();
		})
	}

	this.checkLoop = function() {
		this.cars.forEach((car) => {	
			if (car.x >= CANVAS_WIDTH) {
				car.carSpeed = getRndInteger(2, 5)
				car.x = -50;
			}
		});
	}

	this.checkCollision = function() {
		this.cars.forEach((car) => {
			if (player.x + player.width >= car.x &&
				player.x <= car.x + car.width &&
				player.y + player.height >= car.y &&
				player.y <= car.y + car.height) {
				gameOver = true;
				showGameOver();
			}
		})

	}
}

function carBundleRight(amount) {
	let cars = [];

	for (let i=0; i<amount; i++) {
		let car = new createSingleCar(50, 30, CANVAS_WIDTH+50, (CANVAS_HEIGHT/2)-(i*40) - 100, getRndInteger(2, 5), "right");
		cars.push(car);
	}

	this.cars = cars;
	this.updateSelf = function() {
		this.cars.forEach((car) => {
			car.updateSelf();
		})
	}

	this.moveAll = function() {
		this.cars.forEach((car) => {
			car.moveLeft();
		})
	}

	this.checkLoop = function() {
		this.cars.forEach((car) => {	
			if (car.x <= -50) {
				car.carSpeed = getRndInteger(2, 5)
				car.x = CANVAS_WIDTH+50;
			}
		});
	}

	this.checkCollision = function() {
		this.cars.forEach((car) => {
			if (player.x + player.width >= car.x &&
				player.x <= car.x + car.width &&
				player.y + player.height >= car.y &&
				player.y <= car.y + car.height) {
				gameOver = true;
				showGameOver();
			}
		})

	}
}

const showGameOver = () => {
	const ctx = gameCanvas.context;
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	ctx.fillStyle = "black";
	ctx.font = "50px Arial";
	ctx.fillText("Game Over", CANVAS_WIDTH/2 - 100, CANVAS_HEIGHT/2);
	ctx.font = "20px Arial";
	ctx.fillText("Press ENTER to play again", CANVAS_WIDTH/2 - 100, CANVAS_HEIGHT - 40);

	window.addEventListener('keydown', function (e) {
		const key = e.keyCode;

		if (key === 13) {
			location.reload()
		}
	})
}

function showScore() {
	const ctx = gameCanvas.context;
	ctx.fillStyle = "black";
	ctx.font = "20px Arial";

	ctx.fillText(`Score: ${score}`, CANVAS_WIDTH-100, 40);
}

const startGame = () => {
	gameCanvas.start();
	player = new createPlayer(20, 40, [CANVAS_WIDTH/2-15, CANVAS_HEIGHT-50]);
	separator = new createSeparator();
	carsLeft = new carBundleLeft(6);
	carsRight = new carBundleRight(4);
	console.log(carsLeft);
	window.addEventListener('keydown', function (e) {
		const key = e.keyCode;
		console.log(key);
		switch(key) {
			case 87:   // w
				player.moveUp();
				break;
			case 38:   // UP Arrow key
				player.moveUp()
				break;
			case 83:   // s
				player.moveDown()
				break;
			case 40:   // DOWN Arrow key
				player.moveDown()
				break;
		}
	});
	interval_id = setInterval(updateCanvas, 1000/FPS);
};

document.addEventListener('DOMContentLoaded', startGame);
