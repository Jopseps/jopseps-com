const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


canvasWidth = parseInt(getComputedStyle(canvas).width);
canvasHeight = parseInt(getComputedStyle(canvas).height);

let hoveredIndividual = null;
let clickedIndividual = null;

canvas.addEventListener("mousemove", function (e){
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    hoveredIndividual = null;
    for(let i = individuals.length - 1; i >= 0; i--){
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

canvas.addEventListener("mouseleave", function (){
    hoveredIndividual = null;
    drawAllIndividuals();
});

canvas.addEventListener("click", function(){
    if(hoveredIndividual) clickedIndividual = hoveredIndividual;
    else clickedIndividual = null;
    console.log("clickedIndividual: ", clickedIndividual);
    drawAllIndividuals();
});


const samePlaceDiv = document.getElementById("samePlaceDiv");
const samePlaceP = document.getElementById("samePlaceP");
const samePlaceList = document.getElementById("samePlaceList");
const statusMessage = document.getElementById("statusMessage");
const inputTop = document.getElementById("inputTop");

function adjustWidthOffset(position){
    return ((position * canvasWidth / 20) + (canvasWidth / 2));
}

function adjustHeightOffset(position){
    return ((position * canvasHeight / 20) + (canvasHeight / 2));
}


function drawDot(x, y){
    ctx.beginPath();
    ctx.arc(adjustWidthOffset(x), adjustHeightOffset(-y), 4.5, 0, (360/180)*Math.PI);
    color = "black";
    ctx.moveTo(adjustWidthOffset(x), adjustHeightOffset(y));
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCanvasThings(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()

    ctx.fillStyle = "rgba(255, 158, 158, 1)";
    ctx.fillRect(0, 0, canvas.width/2, canvas.height/2);
    
    ctx.fillStyle = "rgba(181, 201, 255, 1)";
    ctx.fillRect(canvas.width/2, 0, canvas.width/2, canvas.height/2);

    ctx.fillStyle = "rgba(215, 247, 212, 1)";
    ctx.fillRect(0, canvas.height/2, canvas.width/2, canvas.height/2);

    ctx.fillStyle = "rgba(193, 173, 247, 1)";
    ctx.fillRect(canvas.width/2, canvas.height/2, canvas.width/2, canvas.height/2);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, canvas.width/2, canvas.height/2);
    ctx.strokeRect(canvas.width/2, 0, canvas.width/2, canvas.height/2);
    ctx.strokeRect(0, canvas.height/2, canvas.width/2, canvas.height/2);
    ctx.strokeRect(canvas.width/2, canvas.height/2, canvas.width/2, canvas.height/2);
    

    let text1 = "Denemeci Yatışçı";
    let text2 = "Çalışkan Denemeci";
    let text3 = "Yatışçı Testçi";
    let text4 = "Çalışkan Testçi";

    ctx.font = "20px Arial";

    ctx.fillStyle = "rgba(252, 67, 67, 1)";
    ctx.fillText(text1, 1*canvas.width/8 - text1.length * 1.65, 1*canvas.height/4);
    
    ctx.fillStyle = "rgba(73, 111, 212, 1)";
    ctx.fillText(text2, 5*canvas.width/8 - text2.length * 2, 1*canvas.height/4);

    ctx.fillStyle = "rgba(68, 161, 59, 1)";
    ctx.fillText(text3, 1*canvas.width/8 - text3.length * 0.7, 3*canvas.height/4);

    ctx.fillStyle = "rgba(100, 70, 184, 1)";
    ctx.fillText(text4, 5*canvas.width/8 - text4.length * 1.35, 3*canvas.height/4);

    
    let isDark = typeof colorScheme !== 'undefined' && colorScheme === "dark";
    ctx.fillStyle = isDark ?  "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)";
    
    /*ctx.fillText("Abubububu", canvas.width/2 - 51, canvas.height/24);

    ctx.fillText("Abubububu", canvas.width/2 - 51, 95 * canvas.height/96);*/

    ctx.fillText("Yatışçı", 3, canvas.height/2 - 5);

    ctx.fillText("Çalışkan", canvas.width - 81, canvas.height/2 - 5);

}

function drawAllIndividuals(){
    drawCanvasThings();
    for(let i = 0; i < individuals.length; i++){
        if(i === hoveredIndividual || i === clickedIndividual){
            if(i === clickedIndividual) writeSamePlaceList(i.x, i.y);
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
    let radius = isHovered ? 8 : 4.5;
    const x = adjustWidthOffset(individual.value1);
    const y = adjustHeightOffset(-individual.value2);
    ctx.arc(x, y, radius, 0, (360/180) * Math.PI);
    ctx.fillStyle = individual.color;
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


    ctx.fillRect(x + (individual.value1 < 8 ? 10 : -22 - textWidth), (individual.value2 < 8 ? y - 20 : y - 2.5), textWidth + padding * 2, 24);
    ctx.strokeRect(x + (individual.value1 < 8 ? 10 : -22 - textWidth), (individual.value2 < 8 ? y - 20 : y - 2.5), textWidth + padding * 2, 24);
    ctx.fillStyle = "black";
    ctx.fillText(text, x + (individual.value1 < 8 ? 10 : -22 - textWidth) + padding, (individual.value2 < 8 ? y - 20 : y - 2.5) + 16);
    
    
}

function checkIfSamePlace(x,y){
    let sameList = [];
    console.log("individuals.length", individuals.length)
    for(let i = 0; i < individuals.length; i++){
        console.log("searching in",individuals[i].value1, ", ", individuals[i].value2);

        if(x == individuals[i].value1 && y == individuals[i].value2){
            console.log("same place found: ", individuals[i].individualsName);
            sameList.push(individuals[i]);
            
        }
            
    }
    console.log("top: ", findTheTopIndividual(x, y));
    if(sameList.length > 0) return sameList;
    else return 0;
}

function writeSamePlaceList(list){
    let writedRegex = " ";
    
    for(let i = 0; i < list.length; i++){
        writedRegex += `<li>${list[i].individualsName}</li>`
    }
    samePlaceList.innerHTML = writedRegex;
}

function findTheTopIndividual(x, y){
    for(let i = individuals.length - 1; i >= 0; i--){
        console.log("searching");

        if(x == individuals[i].value1 && y == individuals[i].value2){
            console.log("top of the place: ", individuals[i].individualsName);
            return individuals[i];
            
        }
            
    }  

    return 0;
    
}

function addToData(){
    let enteredName = document.getElementById("individualsNameInput").value;
    if(checkSameUsername(enteredName) == true){
        if(isAdded == false || isAddedFeatureActivated == false){
            statusMessage.innerHTML = "You can't use the same username with another one";
            statusMessage.style.visibility = "visible";
        }else{
            statusMessage.style.visibility = "hidden";
        }
        return false
    }

    if(isAdded == false || isAddedFeatureActivated == false){
        statusMessage.style.visibility = "hidden"; 
        let enteredValue1 = document.getElementById("value1Selecter").value
        let enteredValue2 = document.getElementById("value2Selecter").value

        writeSamePlaceList(checkIfSamePlace(enteredValue1, enteredValue2));
        individuals.push(new individual(enteredName, enteredValue1, enteredValue2, "green"));
        isAdded = true;
        localStorage.setItem("isAdded", isAdded);
        drawAllIndividuals();


        console.log("individual writed");
        samePlaceDiv.style.visibility = "visible"

        inputTop.style.paddingTop = `min(${50 + checkIfSamePlace(enteredValue1, enteredValue2).length * 20}px, ${7 + checkIfSamePlace(enteredValue1, enteredValue2).length * 4.7}%)`;

        console.log(`min(${50 + checkIfSamePlace(enteredValue1, enteredValue2).length * 20}px, ${7 + checkIfSamePlace(enteredValue1, enteredValue2).length * 4.7}%)`);
        /*samePlaceP.style.position = "relative";
        samePlaceList.style.position = "relative";*/
    }
    else{
        statusMessage.innerHTML = "You already entered something earlier";
        statusMessage.style.visibility = "visible"; 
        console.log("You already added");
    }
}

window.addEventListener('load', () => {
    canvasWidth = parseInt(getComputedStyle(canvas).width);
    canvasHeight = parseInt(getComputedStyle(canvas).height);
    drawAllIndividuals();
});

window.addEventListener("resize", () => {
    canvasWidth = parseInt(getComputedStyle(canvas).width);
    canvasHeight = parseInt(getComputedStyle(canvas).height);
    drawAllIndividuals();
});

const darkModeButton = document.getElementById("darkModeButton"); 

if(darkModeButton){
    darkModeButton.addEventListener("click", () => {
        setTimeout(drawAllIndividuals, 10);
    });
}