import * as compass from "./yksTabloCompass.js"
import * as server from "./yksTabloServer.js";


let tempServerThingy;


const padding = 40

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
let individuals = [];

let tableContent;




if(server.aaaaaa == 1){}


let size;

function init(){
    tableContent = getServerData();
    console.log("tableContent:", tableContent);
    size = tableContent.people.length;
        
        for(let i = 0; i < size; i++){
            individuals[i] = new individual(
                tableContent.people[i].individualsName,
                tableContent.people[i].value1,
                tableContent.people[i].value2,
                tableContent.people[i].color);
                
            console.log(individuals[i].individualsName);
        }
        console.log(size);
        compass.drawAllIndividuals();
        objectToJson(individuals); // Call here after individuals is populated
}


const enterButton = document.getElementById("enterButton");
const debugEnterButton = document.getElementById("debugEnterButton");


let isAddedFeatureActivated = 0;

let latestEntry = localStorage.getItem("latestEntry");
let isAdded = (localStorage.getItem("isAdded") == "true") ? true : false;

console.log("isAdded", isAdded)
console.log("localStorage.getItem(isAdded)", localStorage.getItem("isAdded"))

enterButton.addEventListener("click", () => {
    addToData();
    
});

debugEnterButton.addEventListener("click", () => {
    addToServerData();
    
});


function checkSameUsername(inputUsername){
    for(i = 0; i < individuals.length ; i++){
        if(inputUsername == individuals[i].individualsName){
            return true;
        }
        
    }
    return false;

}


function getData(){
    fetch("yksTabloData.json")
    .then(response => response.json())
    .then(data => {
        return data;
    });
    return false;
}

// Individuals vector to json
function objectToJson(){
    let currentText = "{people: [";
    for(let i = 0; i < individuals.length; i++){
        currentText += '{"individualsName": ' + '"' + individuals[i].individualsName + 
        '", "value1": ' +  individuals[i].value1 + ', "value2": ' +  individuals[i].value2 + 
        ', "color": "' +  individuals[i].color + '"}';
        if(!(i == individuals.length - 1)) currentText += ",";


    }
    currentText += "]}";
    console.log(currentText);
    return currentText;
}




init()

console.log(canvasHeight);
console.log(adjustWidthOffset(5));
console.log(adjustHeightOffset(3));
console.log(individuals.length)
// objectToJson(individuals) // Remove or comment out this call hereength)
objectToJson(individuals)