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

let contentWrapperClassName = "project-wrapper-P"
let contentCardClassName = "project-card-P"
let contentInfoClassName = "project-info-P"

function TurnIntoRegex(feedElement){
    let contentTitle = feedElement.title;
    let contentImage = feedElement.image;
    let contentDescription = feedElement.description;
    let contentLink = feedElement.link

    let regex = 
    `<div class="${contentWrapperClassName}">
        <a href="${contentLink}">
            <div class="${contentCardClassName}">
                
                <img src="${contentImage}" alt="Content Image">
                <div class="${contentInfoClassName}">
                    <h3>${contentTitle}</h3>
                    <p>${contentDescription}</p>
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
        let contentTitle = rawFeedData[i].title;
        let contentImage = rawFeedData[i].image;
        let contentDescription = rawFeedData[i].description;
        let contentLink = rawFeedData[i].link


        regex += 
        `<div class="${contentWrapperClassName}">
            <a href="${contentLink}">
                <div class="${contentCardClassName}">
                    
                    <img src="${contentImage}" alt="Content Image">
                    <div class="${contentInfoClassName}">
                        <h3>${contentTitle}</h3>
                        <p>${contentDescription}</p>
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


const contentGrid = document.getElementById("contentGrid");
//const realStuffGrid = document.getElementById("realStuffGrid");
//const featuredGrid = document.getElementById("featuredGrid");

function pasteIntoHTML(contentRegex/*, featuredRegex*/){
    contentGrid.innerHTML = contentRegex;
    //featuredGrid.innerHTML = featuredRegex;

    console.log("a", contentRegex);
    //console.log("a", featuredRegex);
    
    console.log("pasted into HTML")
}

async function setUpThings(){
    // preview is for the home page
    let contentFeed = await (await getFeedFromServer("content")).json()
    //let featuredFeed = await (await getFeedFromServer("featuredPreview")).json()
    console.log("c", contentFeed)
    //console.log("c", projectsFeed)
    pasteIntoHTML(multipleTurnIntoRegexes(jsonToObjects(contentFeed))/*, multipleTurnIntoRegexes(jsonToObjects(featuredFeed))*/)


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