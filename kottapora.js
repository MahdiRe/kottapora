
// Game piece variable declaration
var myGamePiece, myObstacles, myScore, myHealth;

// Game logic varialble declaration
var i, height, minGap, maxGap, obstacleTypes, numberOfLanes, x, y, a, b, randomObstacle, wait=1;

function init() {
    // Types of obstacles
    players = [
        {src: "player.png", caption: "player"}, 
        {src: "player1.png", caption: "player1"},
        {src: "player2.png", caption: "player2"},
        {src: "player-1.png", caption: "player-1"},
        {src: "player-2.png", caption: "player-2"}
    ];

    cpus = [
        {src: "cpu.png", caption: "cpu"}, 
        {src: "cpu1.png", caption: "cpu1"},
        {src: "cpu2.png", caption: "cpu2"},
        {src: "cpu-1.png", caption: "cpu-1"},
        {src: "cpu-2.png", caption: "cpu-2"}
    ];
}
  
init();

function startGame() {
    player = new component(200, 200, "player.png", 100, 70, "image", "player");
    cpu = new component(200, 200, "cpu.png", 180, 70, "image", "cpu");
    playerHealth = new component("15px", "Consolas", "blue", 100, 20, "text", "playerHealth");
    cpuHealth = new component("15px", "Consolas", "red", 300, 20, "text", "cpuHealth");
    fightbar = new component(400, 100, "fightbar.png", 25, 120, "image", "fightbar");

    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.playerHealth = 100;
        this.cpuHealth = 100;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type, caption) {
    this.caption = caption;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
                this.borderColor = "black";
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {

        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;        

        if ((mybottom > othertop) ||
            (mytop < otherbottom) ||
            (myright > otherleft) ||
            (myleft < otherright)) {
            crash = false;
            /* console.log("1" + mybottom < othertop);
            console.log("2" + mytop > otherbottom);
            console.log("3" + myright < otherleft);
            console.log("4" + myleft > otherright); */
        }
        /* console.log("1" + mybottom < othertop);
        console.log("2" + mytop > otherbottom);
        console.log("3" + myright < otherleft);
        console.log("4" + myleft > otherright); */
        return crash;
        
    },
    this.crashedCpu = function(){
        var crash = false;
        if (this.caption == players[2].caption 
            && cpu.caption == cpus[0].caption) {
                crash = true;
        }
        return crash;
    },
    this.crashedPlayer = function(){
        var crash = false;
        if (this.caption == cpus[2].caption 
            && player.caption == players[0].caption) {
                crash = true;
        }
        return crash;
    }
}

function updateGameArea() {

    /* for (i = 0; i < myObstacles.length; i += 1) {
        if (bar.crashWith(myObstacles[i])) {
            for(j=0; j<obstacleTypes.length; j++){
                if(myObstacles[i].caption == obstacleTypes[j].caption){
                    console.log("Obstacle is: " + obstacleTypes[j].caption); 
                    myGameArea.score += 1;
                }
            }
        }
    } */
   /*  if (player.crashWith(cpu)){
        console.log("players shot");
    }
    if(cpu.crashWith(player)){
        console.log("cpus shot");
    } */

    /* if (myGameArea.frameNo == 1){
        console.log("myleft: " + player.x);
        console.log("myright: "+ player.x + (player.width));
        console.log("mytop: " + player.y);
        console.log("mybottom: "+ player.y + (player.height));
        console.log("otherleft: " + cpu.x);
        console.log("otherright: "+ cpu.x + (cpu.width));
        console.log("othertop: " + cpu.y);
        console.log("otherbottom: "+ cpu.y + (cpu.height));
    } */

    if (player.caption == players[2].caption 
        && cpus.caption == cpus[0].caption) {
            console.log("Players shot");
    }

    myGameArea.clear();
    myGameArea.frameNo += 1;
    
    fightbar.update();
    player.update();
    cpu.update();
    playerHealth.text = "Health: " + myGameArea.playerHealth;
    playerHealth.update();
    cpuHealth.text = "Health: " + myGameArea.cpuHealth;
    cpuHealth.update();

    if (myGameArea.frameNo == 1 || everyinterval(50)) {
        
    }
    
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

function restartGame() { 
    var pause = document.getElementById("pause");
    var play = document.getElementById("play");
    play.disabled = true;
    pause.disabled = false;
    myGameArea.stop();
    myGameArea.clear();
    startGame();
}

function pause() {
    var pause = document.getElementById("pause");
    var play = document.getElementById("play");
    pause.disabled = true;
    play.disabled = false;
    myGameArea.stop();
}

function play() {
    var pause = document.getElementById("pause");
    var play = document.getElementById("play");
    play.disabled = true;
    pause.disabled = false;
    myGameArea.interval = setInterval(updateGameArea, 20);
}

function hitCpuOrShotPlayer(action) {
    if (action == "HIT"){
        a = 1;b = 2;
    }else if(action == "SHOT"){
        a = 3;b = 4;
    }
    
    playerAction(a);

    setTimeout(function(){ 
        playerAction(b);
        if (action == "HIT" && player.crashedCpu) {
                console.log("Players shot");
                hitPlayerOrShotCpu('SHOT');
        }
     }, 50);

    setTimeout(function(){ 
        playerAction(a);
    }, 100);

    setTimeout(function(){ 
        playerAction(0);
    }, 150);
}

function hitPlayerOrShotCpu(action) {
    if (action == "HIT"){
        a = 1;b = 2;
    }else if(action == "SHOT"){
        a = 3;b = 4;
    }
    
    cpuAction(a);

    setTimeout(function(){ 
        cpuAction(b);
     }, 50);

    setTimeout(function(){ 
        cpuAction(a);
    }, 100);

    setTimeout(function(){ 
        cpuAction(0);
    }, 150);
}

function playerEscape() {
    playerAction(3);

    setTimeout(function(){ 
        playerAction(0);
     }, 200);
}

function cpuEscape() {
    cpuAction(3);

    setTimeout(function(){ 
        cpuAction(0);
     }, 200);
}

function playerAction(index){
    player.image.src = players[index].src;
    player.caption = players[index].caption;
}

function cpuAction(index){
    cpu.image.src = cpus[index].src;
    cpu.caption = cpus[index].caption;
}