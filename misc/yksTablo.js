const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class individual{
    individualsName;
    value1;
    value2;
    color;
    
    constructor(n, v1, v2, c){
        this.individualsName = n;
        this.value1 = v1;
        this.value2 = v2;
        this.color = c;
    }
}

canvasWidth = parseInt(getComputedStyle(canvas).width);
canvasHeight = parseInt(getComputedStyle(canvas).height);

function adjustWidthOffset(position){
    return ((position * canvasWidth / 20) + (canvasWidth / 2));
}

function adjustHeightOffset(position){
    return ((position * canvasHeight / 20) + (canvasHeight / 2));
}


function drawDot(x, y){
    ctx.beginPath();
    ctx.arc(adjustWidthOffset(x), adjustHeightOffset(-y), 2.5, 0, (360/180)*Math.PI);
    color = "black";
    ctx.moveTo(adjustWidthOffset(x), adjustHeightOffset(y));
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}

function drawIndividual(individual){
    ctx.beginPath();
    ctx.arc(adjustWidthOffset(individual.value1), adjustHeightOffset(-individual.value2), 2.5, 0, (360/180)*Math.PI);
    let individualColor = individual.color;
    ctx.moveTo(adjustWidthOffset(individual.value1), adjustHeightOffset(-individual.value2));
    ctx.strokeStyle = individualColor;
    ctx.stroke();
    ctx.fillStyle = individualColor;
    ctx.fill();
}

let individuals = [];

let tableContent;

let hoveredIndividual = null;

function drawCanvasThings(){
    ctx.beginPath()
    ctx.strokeRect(0, 0, canvas.width/2, canvas.height/2);
    ctx.strokeRect(canvas.width/2, 0, canvas.width/2, canvas.height/2);
    ctx.strokeRect(0, canvas.height/2, canvas.width/2, canvas.height/2);
    ctx.strokeRect(canvas.width/2, canvas.height/2, canvas.width/2, canvas.height/2);

    ctx.fillStyle = "black";
    ctx.fillRect();

}

function drawAllIndividuals(){
    drawCanvasThings();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < individuals.length; i++){
        if(i === hoveredIndividual){
            drawIndividual(individuals[i], true);
            drawTextbox(individuals[i]);
        } else{
            drawIndividual(individuals[i], false);
        }
    }

}

function drawIndividual(individual, isHovered){
    ctx.beginPath();
    // if : true : false
    const radius = isHovered ? 7 : 2.5;
    const x = adjustWidthOffset(individual.value1);
    const y = adjustHeightOffset(-individual.value2);
    ctx.arc(x, y, radius, 0, (360/180) * Math.PI);
    ctx.strokeStyle = individual.color;
    ctx.fillStyle = individual.color;
    ctx.stroke();
    ctx.fill();
}

function drawTextbox(individual){
    const x = adjustWidthOffset(individual.value1);
    const y = adjustHeightOffset(-individual.value2);
    const padding = 6;
    const text = individual.individualsName;
    ctx.font = "14px Arial";
    const textWidth = ctx.measureText(text).width;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillRect(x + 10, y - 20, textWidth + padding * 2, 24);
    ctx.strokeRect(x + 10, y - 20, textWidth + padding * 2, 24);
    ctx.fillStyle = "black";
    ctx.fillText(text, x + 10 + padding, y - 20 + 16);
}

canvas.addEventListener("mousemove", function (e){
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    hoveredIndividual = null;
    for(let i = 0; i < individuals.length; i++){
        const x = adjustWidthOffset(individuals[i].value1);
        const y = adjustHeightOffset(-individuals[i].value2);
        const dx = mouseX - x;
        const dy = mouseY - y;
         // 7 is the hover radius
        if(dx * dx + dy * dy < 7 * 7){
            hoveredIndividual = i;
            break;
        }
    }
    drawAllIndividuals();
});

canvas.addEventListener("mouseleave", function () {
    hoveredIndividual = null;
    drawAllIndividuals();
});



fetch("yksTabloData.json")
    .then(response => response.json())
    .then(data => {
        tableContent = data;

        const size = tableContent.people.length;
        
        for(let i = 0; i < size; i++){
            individuals[i] = new individual(
                tableContent.people[i].individualsName,
                tableContent.people[i].value1,
                tableContent.people[i].value2,
                tableContent.people[i].color);
            console.log(individuals[i].individualsName);
        }
        console.log(size);
        drawAllIndividuals();
    });


/*let testDividual = new individual("testman", 4, 7, "red");
drawIndividual(testDividual);
drawDot(5,3)
drawDot(-4,-7)*/

console.log(canvasHeight);
console.log(adjustWidthOffset(5));
console.log(adjustHeightOffset(3));

console.log(individuals[0].individualsName);
console.log(tableContent.people.length)
