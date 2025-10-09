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
let projectWrapperClassName = "project-wrapper"
let projectCardClassName = "project-card"
let projectInfoClassName = "project-info"

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
    let feedData = await fetch("https://jopseps-com-feed.yusufmertturan.workers.dev",{
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


const realStuffGrid = document.getElementById("realStuffGrid");
const featuredGrid = document.getElementById("featuredGrid");

function pasteIntoHTML(realStuffRegex, featuredRegex){
    realStuffGrid.innerHTML = realStuffRegex;
    featuredGrid.innerHTML = featuredRegex;

    console.log("a", realStuffRegex);
    console.log("a", featuredRegex);
    
    console.log("pasted into HTML")
}

async function setUpThings(){
    // preview is for the home page
    let realStuffFeed = await (await getFeedFromServer("realStuffPreview")).json()
    let featuredFeed = await (await getFeedFromServer("featuredPreview")).json()
    console.log("c", realStuffFeed)
    console.log("c", featuredFeed)
    pasteIntoHTML(multipleTurnIntoRegexes(reverseTheOrder(jsonToObjects(realStuffFeed))), multipleTurnIntoRegexes(reverseTheOrder(jsonToObjects(featuredFeed))))


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

// reverses the array objects order
function reverseTheOrder(object){
    let reversedObject = [];
    for(let i = 0; i < object.length; i++){
        reversedObject[i] = object[object.length - 1 - i];
    }
    return reversedObject;
}