const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let LEFT, RIGHT, UP, DOWN;

let gravity = 10;

const BALLZ = [];
let friction = 0.05;

let ballLineLengthMultiAcc = 500;
let ballLineLengthMultiVel = 20;

class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(v){
        return new Vector(this.x + v.x, this.y + v.y);
    }
    substract(v){
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mag(){
        return Math.sqrt(this.x**2 + this.y**2);
    }

    mult(n){
        return new Vector(this.x * n, this.y * n)

    }

    drawVector(startx, starty, n, color){
        ctx.beginPath();
        moveTo(startx, starty);
        ctx.moveTo(startx, starty);
        ctx.lineTo(startx + this.x * n, starty + this.y * n);
        ctx.strokeStyle = color;
        ctx.stroke();

        
    }

}

class Ball{
    constructor(tx, ty, tradius, tcolor){
        // this koymak lazım amk

        this.x = tx;
        this.y = ty;
        this.radius = tradius;
        this.color = tcolor;
        this.startAngleDeg = 0;
        this.endAngleDeg = 360;
        this.player = false;
        this.vel = new Vector(0,0);
        this.acc = new Vector(0,0);

        this.acceleration = 0.001;
        

        BALLZ.push(this);


    }

    drawBall(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startAngleDeg, (this.endAngleDeg/180)*Math.PI);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    displaySigma(){
        this.vel.drawVector(this.x, this.y, 30, "green");
        this.acc.drawVector(this.x, this.y, 200, "blue");
    }
}





function keyControl(b){
    canvas.addEventListener('keydown', function(e){
    
    if(e.key == 'ArrowLeft'){
        LEFT =  true;
        
        }   

    if(e.key == 'ArrowRight'){
        RIGHT = true;
        
        }
    
    if(e.key == 'ArrowUp'){
        // Sol üst köşeden hesaplıyo

        UP = true;
        
        }

        if(e.key == 'ArrowDown'){
        DOWN = true;
        
        }

});

canvas.addEventListener('keyup', function(e){
    if(e.key == 'ArrowLeft'){
        LEFT =  false;
        }   
    if(e.key == 'ArrowRight'){
        RIGHT = false;
        }
    if(e.key == 'ArrowUp'){
        // Sol üst köşeden hesaplıyo
        UP = false;
        }
    if(e.key == 'ArrowDown'){
    DOWN = false;
        }

});



    if(LEFT){
        b.acc.x -= b.acceleration;

    }
     if(RIGHT){
        b.acc.x += b.acceleration;

    }
    if(UP){
            b.acc.y -= b.acceleration;

        }
    if(DOWN){
            b.acc.y += b.acceleration;

        }
    if(!UP && !DOWN){
        b.acc.y = 0;

    }
    if(!RIGHT && !LEFT){
        b.acc.x = 0;
    }
    b.vel = b.vel.add(b.acc);
    b.vel = b.vel.mult(1-friction);
    b.x += b.vel.x;
    b.y += b.vel.y;

}





let ball1  = new Ball(150, 150, 20, "red");
ball1.player = true;
let ball2  = new Ball(200, 200, 30, "black");
//ball2.player = true;
function mainLoop(){
    // ZO JOTEVER

    ctx.clearRect(0, 0, 640, 480)
    //ctx.clearRect(0, 0, canvas.clientHeight, canvas.clientWidth)

    BALLZ.forEach((b) => {

        b.drawBall();
        if(b.player){
            keyControl(b);
        }
        b.displaySigma();
    });

    requestAnimationFrame(mainLoop);

}


requestAnimationFrame(mainLoop);