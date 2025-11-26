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
    let noDarkModeThings = document.getElementsByClassName("noDarkMode");

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
}

// yeah pretty long name
function spesificApplyColorSchemeToChildren(elements){
    console.log("elements: ", elements);
    console.log("elements.children: ", elements.children);
    console.log("elements.innerHTML: ", elements.innerHTML);
    console.log("spesificApplyColorScheme");
    if (elements.children.length > 0) {
        Array.from(elements.children).forEach(element => {
            console.log("element.innerHTML: ", element.innerHTML);
            console.log("spesificApplyColorScheme loop");
            element.style.color = (colorScheme === "dark") ? "white" : "black";
        });
    }
}