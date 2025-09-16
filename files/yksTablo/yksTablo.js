
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



let size;

async function init(){ 
    console.log("init");
    obj = await getData();
    // json.people = people:[. . .]
    tableContent = obj.people
    console.log("tableContent:", tableContent);
    size = tableContent.length;
    console.log(tableContent.length)
    console.log(tableContent);  
    console.log(size)
        
        for(let i = 0; i < size; i++){
            individuals[i] = new individual(
                tableContent[i].individualsName,
                tableContent[i].value1,
                tableContent[i].value2,
                tableContent[i].color);
                
            console.log(individuals[i].individualsName);
        }
        console.log(size);
        drawAllIndividuals();
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

// Local testing
async function getData(){
    try {
        const response = await fetch("../files/yksTablo/yksTabloData.json");
        const data = await response.json();
        console.log("DEBUG | getData() returned ", data);
        return data;
    } catch (error) {
        console.log("DEBUG | getData() returned 0", error);
        return false;
    }
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

function jsonToObjects(json){
    let hugeData = json.json();
    console.log("hugeData.people.length=", hugeData.people.length);
    for(let i = 0; i < hugeData.people.length; i++){
        


    }

}



init()

console.log(individuals.length)
// objectToJson(individuals) // Remove or comment out this call hereength)
objectToJson(individuals)