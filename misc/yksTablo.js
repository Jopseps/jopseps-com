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
    ctx.arc(adjustWidthOffset(x), adjustHeightOffset(-y), 2.5, 0, (360/180)*Math.PI);
    let individualColor = individual.color;
    ctx.moveTo(adjustWidthOffset(x), adjustHeightOffset(y));
    ctx.strokeStyle = individualColor;
    ctx.stroke();
    ctx.fillStyle = individualColor;
    ctx.fill();

}

let individuals = [];

fetch("yksTabloData.json")
    .then(response => response.json())
    .then(data => {
        let tableContent = data;

        const size = tableContent.people.length;
        
        for(let i = 0; i < size; i++){
            individuals[i] = new individual(
                tableContent.people[i].individualsName,
                tableContent.people[i].value1,
                tableContent.people[i].value2,
                tableContent.people[i].color);

        }

        for(let i = 0; i < size; i++){
            individuals[i].addEventListener("mouseover", () => {
            temmuVar.classList.add("hovered");
            temmuVar.style.transform = `scale(1.1)`;
            });
        }

        for(let i = 0; i < size; i++){
            individuals[i].addEventListener("mouseout", () => {
            temmuVar.classList.add("hovered");
            temmuVar.style.transform = `scale(1.1)`;
            });

        }




    });
    


drawDot(5,3)
drawDot(-8,-1)
console.log(canvasWidth);
console.log(canvasHeight);
console.log(adjustWidthOffset(5));
console.log(adjustHeightOffset(3));

console.log(individuals[0].individualsName);
console.log(tableContent.people.length)