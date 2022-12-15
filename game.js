const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
var tileSize = 50;
var gap = 0;
const numberOfRows = Math.round((CANVAS_HEIGHT + gap) / (tileSize + gap));

var fps = 40;
var batchSize = 300;
var tiles = [];


// create all images
const sources = ['./stars/01.png', './stars/02.png', './stars/03.png', './stars/04.png', './stars/05.png'];
var allImages = sources.map(function (src) {
    var img = new Image();
    img.src = src;
    return img;
});

function startGame() {
    // create a batch of tiles
    while (batchSize > 0) {
        batchSize--;
        let tile = new component();
        tiles.push(tile);
    }
    // start the simulation
    game.start();
}

var game = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, fps);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component() {
    this.speedX = getRandomFloatBetween(0.1, 5);
    this.x = getRandomPointBetween(0, CANVAS_WIDTH);
    this.y = getRandomStart();
    this.image = getRandomElementFromArray(allImages);
    this.update = () => {
        ctx = game.context;
        ctx.drawImage(this.image, this.x, this.y, tileSize, tileSize);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.checkPosition();
    }
    this.checkPosition = function () {
        if (this.x > game.canvas.width) {
            this.restart();
        }
    }
    this.restart = function () {
        // reset position to the left of canvas
        this.x = -tileSize;
        // reposition tile on a random row
        this.y = getRandomStart();
    }
}

function updateGameArea() {
    game.clear();
    tiles.forEach(tile => {
        tile.newPos();
        tile.update();
    });
}

function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomPointBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

function getRandomFloatBetween(a, b) {
    return Math.random() * (b - a + 1) + a;
}

function getRandomStart() {
    let row = getRandomPointBetween(0, numberOfRows);
    return row * (tileSize);
}

