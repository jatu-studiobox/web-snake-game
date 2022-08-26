class Snake {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{ x: this.x, y: this.y }];
        this.rotateX = 0;
        this.rotateY = 1;
    }

    move() {
        let newRect;
        if (this.rotateX == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            };
        } else if (this.rotateX == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            };
        } else if (this.rotateY == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            };
        } else if (this.rotateY == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            };
        }

        this.tail.shift();
        this.tail.push(newRect);
    }
}

class Apple {
    constructor() {
        let isTouching;
        while (true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size;
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size;
            for (let i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true;
                }
            }

            this.color = "red";
            this.size = snake.size;

            if (!isTouching) {
                break;
            }
        }
    }
}

const canvas = document.getElementById("canvas");

const snake = new Snake(20, 20, 20);

let apple = new Apple();

const canvasContext = canvas.getContext("2d");

const eatApple = () => {
    if (snake.tail[snake.tail.length - 1].x == apple.x && snake.tail[snake.tail.length - 1].y == apple.y) {
        snake.tail[snake.tail.length] = { x: apple.x, y: apple.y };
        apple = new Apple();
    }
};

const checkHitWall = () => {
    const headTail = snake.tail[snake.tail.length - 1];
    if (headTail.x == - snake.size) {
        headTail.x = canvas.width - snake.size;
    } else if (headTail.x == canvas.width) {
        headTail.x = 0;
    } else if (headTail.y == - snake.size) {
        headTail.y = canvas.height - snake.size;
    } else if (headTail.y == canvas.height) {
        headTail.y = 0;
    }
};

const update = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Update");
    snake.move();
    eatApple();
    checkHitWall();
};

const show = () => {
    update();
    draw();
};

const gameLoop = () => {
    setInterval(show, 1000 / 20); // here 15 is our fps value
};

window.onload = () => {
    gameLoop();
};

const createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};

const draw = () => {
    createRect(0, 0, canvas.width, canvas.height, "black");
    createRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.tail.length; i++) {
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, "white");
    }

    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "#00ff42";
    canvasContext.fillText("Score: " + (snake.tail.length - 1), canvas.width - 120, 18);
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
};

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode == 37 && snake.rotateX != 1) {    // Key Left
            snake.rotateX = -1;
            snake.rotateY = 0;
        } else if (event.keyCode == 38 && snake.rotateY != 1) { // Key Up
            snake.rotateX = 0;
            snake.rotateY = -1;
        } else if (event.keyCode == 39 && snake.rotateX != -1) {    // Key Right
            snake.rotateX = 1;
            snake.rotateY = 0;
        } else if (event.keyCode == 40 && snake.rotateY != -1) { // Key Down
            snake.rotateX = 0;
            snake.rotateY = 1;
        }
    }, 1);
});
