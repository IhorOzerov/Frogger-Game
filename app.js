const canvasWidth = 505;
const refreshTime = 500;
const yStart = 0;
const xStart = 0;

const enemyConst = {
    startSpeed: 200,
    refresh: -50,
    locations: [62, 144, 228],
    speed: (Math.random() * 200) + 150,
    sprite: "images/enemy-bug.png"
}

const playerConst = {
    x: 203,
    y: 390,
    stepX: 102,
    stepY: 83,
    sprite: "images/char-boy.png",
    height: 60,
    width: 70,
    rightBorder: 400
}

const Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = enemyConst.startSpeed;
    this.sprite = enemyConst.sprite;
};

Enemy.prototype.update = function(dt) {
    this.x += enemyConst.speed * dt;
    if(this.x > canvasWidth){
        this.x = enemyConst.refresh;
    }
    if(player.x < this.x + playerConst.width &&
        player.x + playerConst.width > this.x &&
        player.y < this.y + playerConst.height &&
        playerConst.height + player.y > this.y){
            player.x = playerConst.x;
            player.y = playerConst.y;
        }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function() {
    this.x = playerConst.x;
    this.y = playerConst.y;
    this.sprite = playerConst.sprite;
};

Player.prototype.update = function (){ 
    if(this.y < yStart){
    setTimeout(function (){
        player.x = playerConst.x;
        player.y = playerConst.y;
    }, refreshTime);
}} 

Player.prototype.render = function  (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
} 

Player.prototype.handleInput = function (allowKey){
    if(allowKey == "left" && this.x > xStart){
        this.x -= playerConst.stepX;
    }
    if(allowKey == "right" && this.x < playerConst.rightBorder){
        this.x += playerConst.stepX;
    }
    if(allowKey == "up" && this.y > yStart){
        this.y -= playerConst.stepY;
    }
    if(allowKey == "down" && this.y < playerConst.y){
        this.y += playerConst.stepY;
    }
} 
const player = new Player;

const allEnemies = [];

const enemies = (function(){
    for(let i = 0; i < enemyConst.locations.length; i++){
        const startPoint = Math.random()*canvasWidth;
        allEnemies.push(new Enemy(startPoint, enemyConst.locations[i]))
    }
}())


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
