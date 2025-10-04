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
    return regex;
}

function multipleTurnIntoRegexes(rawFeedData){


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
    let realStuffFeed = await getFeedFromServer("realStuff")
    let featuredFeed = await getFeedFromServer("featured")
    console.log("c", realStuffFeed)
    console.log("c", featuredFeed)
    pasteIntoHTML(TurnIntoRegex(realStuffFeed), TurnIntoRegex(featuredFeed))


}
setUpThings()