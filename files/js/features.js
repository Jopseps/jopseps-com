//------------------
// for dark mode
//------------------

        
// Dark mode
let colorScheme;
let savedTheme = localStorage.getItem("theme");

if(savedTheme !== "dark" && savedTheme !== "light"){
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
        colorScheme = "dark";
    }else{
        colorScheme = "light";
    }
    localStorage.setItem("theme", colorScheme);
    savedTheme = colorScheme;
}else{
    colorScheme = savedTheme;
}

console.log("localStorage.getItem(theme): ", localStorage.getItem("theme"));
console.log("colorScheme: ", colorScheme);
applyColorScheme();

function switchColorScheme(){
    
    if(colorScheme === "dark"){
        colorScheme = "light";

    }
    else{
        colorScheme = "dark";
    }

    savedTheme = colorScheme;
    localStorage.setItem("theme", savedTheme);

    console.log(colorScheme);
    applyColorScheme();

}

function applyColorScheme(){
    let siteFooter = document.getElementById("footer");
    //let noDarkModeThings = document.getElementsByClassName("noDarkMode");

    document.querySelector(".background").style.backgroundColor = (colorScheme === "dark") ? "rgb(30, 30, 30)" : "rgb(187, 187, 187)";
    document.getElementById("darkModeButton").innerHTML = (colorScheme === "dark") ? "light mode" : "dark mode";

    console.log("applying color scheme")

    let allTexts = document.querySelectorAll("p, .straightText, .interactiveText, h1, h2, h3, li, span");

    if(allTexts.length > 0){
        allTexts.forEach(allText =>{
            console.log("!siteFooter.contains(allText): ", !siteFooter.contains(allText))
            if(!siteFooter.contains(allText) && !allText.classList.contains("noDarkMode")){
                allText.style.color = (colorScheme === "dark") ? "white" : "black";
            }
        });
    }

    let bigImages = document.querySelectorAll(".bigImage")
    
    if(bigImages.length > 0){
        bigImages.forEach(bigImage =>{
            bigImage.style.borderColor = (colorScheme === "dark") ? "white" : "black";
        });
    }

    // index.html project cards
    let projectCards = document.querySelectorAll(".project-card, .project-card-P");

    if(projectCards.length > 0){
        projectCards.forEach(projectCard =>{
            projectCard.style.backgroundColor = (colorScheme === "dark") ? "rgb(128, 128, 128)" : "rgb(255, 255, 255)";
            projectCard.style.borderColor = (colorScheme === "dark") ? "rgb(255, 255, 255)" : "rgb(204, 204, 204)";
        });
    }

    let projectCardsP = document.querySelectorAll(".project-card p, .project-card-P p");
    
    if(projectCardsP.length > 0){
        projectCardsP.forEach(projectCard =>{
            projectCard.style.color = (colorScheme === "dark") ? "rgb(255, 255, 255)" : "rgb(85, 85, 85)";
        });
    }

    // wiki-like components
    let wikiBoxes = document.querySelectorAll(".wiki-toc, .wiki-infobox");
    if(wikiBoxes.length > 0){
        wikiBoxes.forEach(box =>{
            box.style.backgroundColor = (colorScheme === "dark") ? "rgb(50, 50, 50)" : "rgb(255, 255, 255)";
            box.style.borderColor = (colorScheme === "dark") ? "rgb(220, 220, 220)" : "rgb(204, 204, 204)";
        });
    }

    let wikiBadges = document.querySelectorAll(".wiki-badge");
    if(wikiBadges.length > 0){
        wikiBadges.forEach(badge =>{
            badge.style.backgroundColor = (colorScheme === "dark") ? "rgb(60, 60, 60)" : "rgb(240, 240, 240)";
            badge.style.borderColor = (colorScheme === "dark") ? "rgb(150, 150, 150)" : "rgb(200, 200, 200)";
            badge.style.color = (colorScheme === "dark") ? "white" : "black";
        });
    }
}

// yeah pretty long name
function spesificApplyColorSchemeToChildren(container){
    if(container && container.children && container.children.length > 0){
        Array.from(container.children).forEach(li =>{
            let span = li.querySelector("span");
            if(span){
                span.style.color = (colorScheme === "dark") ? "white" : "black";
            }
        });
    }
}