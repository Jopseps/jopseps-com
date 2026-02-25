class feedCard{
    title;
    description;
    image;
    link;
    // These two are for placeholders
    static basicWidth;
    static basicHeight;

    constructor(t,d,i,l){
        this.title = t;
        this.description = d;
        this.image = i;
        this.link = l;
    }
}

feedCard.basicWidth = 500;
feedCard.basicHeight = 380;

// Raw feed Element into html regex
let projectWrapperClassName = "project-wrapper"
let projectCardClassName = "project-card"
let projectInfoClassName = "project-info"

function TurnIntoRegex(feedElement){
    let isPlaceHolder = feedElement.image == "placeholder" ? true : false;
    let projectTitle = feedElement.title;
    let projectImage = isPlaceHolder ? `https://picsum.photos/${feedCard.basicWidth}/${feedCard.basicHeight}` : feedElement.image;
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
        let isPlaceHolder = rawFeedData[i].image == "placeholder" ? true : false;
        let projectTitle = rawFeedData[i].title;
        let projectImage = isPlaceHolder ? `https://picsum.photos/${feedCard.basicWidth}/${bfeedCard.asicHeight}` : rawFeedData[i].image;
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
const contentGrid = document.getElementById("contentGrid");

function pasteIntoHTML(realStuffRegex, featuredRegex, contentRegex){
    realStuffGrid.innerHTML = realStuffRegex;
    featuredGrid.innerHTML = featuredRegex;
    contentGrid.innerHTML = contentRegex;

    console.log("a", realStuffRegex);
    console.log("a", featuredRegex);
    console.log("a", contentRegex);
    
    console.log("pasted into HTML")
}

async function setUpThings(){
    // preview is for the home page
    let realStuffFeed = await (await getFeedFromServer("realStuffPreview")).json()
    let featuredFeed = await (await getFeedFromServer("featuredPreview")).json()
    let contentFeed = await (await getFeedFromServer("contentPreview")).json()
    console.log("c", realStuffFeed)
    console.log("c", featuredFeed)
    console.log("c", contentFeed)
    pasteIntoHTML(
        multipleTurnIntoRegexes(reverseTheOrder(jsonToObjects(realStuffFeed))),
        multipleTurnIntoRegexes(reverseTheOrder(jsonToObjects(featuredFeed))),
        multipleTurnIntoRegexes(reverseTheOrder(jsonToObjects(contentFeed)))
    );

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

