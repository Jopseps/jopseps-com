class feedCard{
    title;
    description;
    image;
    link;

    constructor(t,d,i,l){
        this.title = t;
        this.description = d;
        this.image = i;
        this.link = l;
    }
}

// Raw feed Element into html regex

let projectWrapperClassName = "project-wrapper-P"
let projectCardClassName = "project-card-P"
let projectInfoClassName = "project-info-P"

function TurnIntoRegex(feedElement){
    let projectTitle = feedElement.title;
    let projectImage = feedElement.image;
    let projectDescription = feedElement.description;
    let projectLink = feedElement.link

    let regex = 
    `<div class="${projectWrapperClassName}">
        <a href="${projectLink}">
            <div class="${projectCardClassName}">
                
                <img src="${projectImage}" alt="Project Image">
                <div class="${projectInfoClassName}">
                    <h3>${projectTitle}</h3>
                    <p>${projectDescription}</p>
                </div>
            </div>
        </a>
    </div>`
    console.log("TurnIntoRegex output: ", regex)
    return regex;
}

function multipleTurnIntoRegexes(rawFeedData){
    let regex = ""
    for(let i = 0; i < rawFeedData.length; i++){
        let projectTitle = rawFeedData[i].title;
        let projectImage = rawFeedData[i].image;
        let projectDescription = rawFeedData[i].description;
        let projectLink = rawFeedData[i].link


        regex += 
        `<div class="${projectWrapperClassName}">
            <a href="${projectLink}">
                <div class="${projectCardClassName}">
                    
                    <img src="${projectImage}" alt="Project Image">
                    <div class="${projectInfoClassName}">
                        <h3>${projectTitle}</h3>
                        <p>${projectDescription}</p>
                    </div>
                </div>
            </a>
        </div>`

    }
    
    console.log("TurnIntoRegex output: ", regex)
    return regex;

}

async function getFeedFromServer(feedType){
    let feedData = await fetch("http://127.0.0.1:8787",{
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: feedType
    });

    console.log("b", feedData);
    console.log("b2", feedData.json);
    console.log("b3", feedData);
    console.log("b4", feedData.body);
    return feedData;

}


const projectsGrid = document.getElementById("projectsGrid");
//const realStuffGrid = document.getElementById("realStuffGrid");
//const featuredGrid = document.getElementById("featuredGrid");

function pasteIntoHTML(projectsRegex/*, featuredRegex*/){
    projectsGrid.innerHTML = projectsRegex;
    //featuredGrid.innerHTML = featuredRegex;

    console.log("a", projectsRegex);
    //console.log("a", featuredRegex);
    
    console.log("pasted into HTML")
}

async function setUpThings(){
    // preview is for the home page
    let projectsFeed = await (await getFeedFromServer("realStuff")).json()
    //let featuredFeed = await (await getFeedFromServer("featuredPreview")).json()
    console.log("c", projectsFeed)
    //console.log("c", projectsFeed)
    pasteIntoHTML(multipleTurnIntoRegexes(jsonToObjects(projectsFeed))/*, multipleTurnIntoRegexes(jsonToObjects(featuredFeed))*/)


}
setUpThings()

function jsonToObjects(json){
    try{
    console.log(json)
    console.log(JSON.stringify(JSON.parse(json)))
    // turn the json into objects
    let hugeData = JSON.parse(json);
    console.log(hugeData[0])
    let objectArray = []
    console.log("hugeData.length=", hugeData.length);
    for(let i = 0; i < hugeData.length; i++){
        objectArray[i] = new feedCard(hugeData[i].title, hugeData[i].description, hugeData[i].image, hugeData[i].link);
    }

    return objectArray;
    }
    catch(error){
        console.log(error)
        // its already an object
        return json

    }
}

// well it will work a little bit weird
function objectsToObjects(objectArray){
    

}