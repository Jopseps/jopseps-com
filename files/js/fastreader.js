let fontSize = 20;
let allText;
let tempLetters
let boldLetters = [];
let notBoldLetters = [];

const speedReadText = document.getElementById("readBox");

function getText(){
    let guide = document.getElementById("guide");
    if(guide) guide.remove();
    
    allText = document.getElementById("textInput").value;
    let allWords = allText.split(" ");
    if(allWords.length <= 1 && allWords[0] == '') allWords = '';
    sessionStorage.setItem("words", allWords);
    console.log("allWords: ", allWords);
    console.log("allWords[0]: ", allWords[0])



    for(i = 0; i < allWords.length; i++){
        tempLetters = allWords[i].split("");
        console.log(tempLetters);
        boldLetters[i] = "";
        notBoldLetters[i] = "";
        
        for(j = 0; j < Math.min(3, tempLetters.length); j++){
            boldLetters[i] += tempLetters[j];
        }

        for(j = 3; j < Math.max(3, tempLetters.length); j++){
            notBoldLetters[i] += tempLetters[j];
        }
        if(i != (allWords.length - 1)){
            if(tempLetters.length <= 3){
                boldLetters[i] += "&nbsp";
            }else{
                notBoldLetters[i] += "&nbsp";
            }
        }
        
        console.log("tempLetters: ", tempLetters);
        console.log("boldLetters[i]: ", boldLetters[i]);
        console.log("notBoldLetters[i]: ", notBoldLetters[i]);
    }
    
    let cookedWordParts = [];
    let cookedWordsRegex = [];
    let cookedAllRegex = "";
    for(i = 0; i < allWords.length; i++){
        cookedWordParts[i] = "";

        cookedWordsRegex[i] = "<span>" +`<b>${boldLetters[i]}</b>` + `<p>${notBoldLetters[i]}</p>` + "</span>"
        cookedAllRegex += cookedWordsRegex[i];
        
        //cookedWordParts[i] = boldLetters[i].concat(notBoldLetters[i]);
        console.log("Cooked: ", cookedWordParts[i]);
        console.log("CookedRegex: ", cookedWordsRegex[i]);
        console.log("CookedAll: ", cookedAllRegex);
        console.log("boldLetters[i].length: ", boldLetters[i].length);
        console.log("notBoldLetters[i].length: ", notBoldLetters[i].length);

    }
    
    console.log("CookedAll: ", cookedAllRegex);
    speedReadText.innerHTML = cookedAllRegex;
    speedReadText.style.marginTop = cookedAllRegex ? "min(50px, 10%)" : 0;
    speedReadText.style.marginBottom = cookedAllRegex ? "min(50px, 10%)" : 0;
    speedReadText.style.fontSize = `${fontSize}pt`;
    speedReadText.style.visibility = cookedAllRegex ? "visible" : "hidden";
    
    
    
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("textInput").value = "";
});