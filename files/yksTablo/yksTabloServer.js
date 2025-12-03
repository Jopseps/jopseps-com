const serverLink = "https://yks-tablo.yusufmertturan.workers.dev";
const turnstileID = document.getElementById("turnstile-div");

let turnstileToken = null;

async function addToServerData(){
    if(!checkIfCaptchaIsOk()){
        statusMessage.innerHTML = "Please complete the captcha verification.";
        statusMessage.style.visibility = "visible";
        return false;
    }

    let enteredName = document.getElementById("individualsNameInput").value;
    if(checkSameUsername(enteredName) == true){
        if(isAdded == false || isAddedFeatureActivated == false){
            statusMessage.innerHTML = "You can't use the same username with another one";
            statusMessage.style.visibility = "visible";
        }else{
            statusMessage.style.visibility = "hidden";
        }
        return false
    }
    if(enteredName.length > 15){
        if(isAdded == false || isAddedFeatureActivated == false){
            statusMessage.innerHTML = "You can't use an username has more than 15 characters";
            statusMessage.style.visibility = "visible";
        }else{
            statusMessage.style.visibility = "hidden";
        }
        return false
    }

    if(isAdded == false || isAddedFeatureActivated == false){
        statusMessage.style.visibility = "hidden";
        let enteredValue1 = document.getElementById("value1Selecter").value 
        let enteredValue2 = document.getElementById("value2Selecter").value
        let enteredColor = document.getElementById("colorSelecter").value
        console.log("enteredColor: ", enteredColor);

        let pushingIndividual = new individual(enteredName, enteredValue1, enteredValue2, enteredColor);
        let sendingRequestBody = [];
        sendingRequestBody[0] = turnstileToken;
        sendingRequestBody[1] = pushingIndividual;

        // asking server to put and will
        let response = await fetch(serverLink, {
            method: "PUT",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendingRequestBody)
        });
        
        if(!response.ok){
            console.log("something went wrong while adding to server data", response);
        }

        writeSamePlaceList(checkIfSamePlace(enteredValue1, enteredValue2));
        
        // pull from server after adding and check
        individuals.push(new individual(enteredName, enteredValue1, enteredValue2, "green"));
        isAdded = true;
        localStorage.setItem("isAdded", isAdded);

        console.log("individual writed");
        samePlaceDiv.style.visibility = "visible"

        inputTop.style.paddingTop = `min(${50 + checkIfSamePlace(enteredValue1, enteredValue2).length * 20}px, ${7 + checkIfSamePlace(enteredValue1, enteredValue2).length * 4.7}%)`;

        console.log(`min(${50 + checkIfSamePlace(enteredValue1, enteredValue2).length * 20}px, ${7 + checkIfSamePlace(enteredValue1, enteredValue2).length * 4.7}%)`);
        document.getElementById("turnstile-container").visibility = "visible";
        turnstile.reset(turnstileID)
        init();
    }
    else{
        statusMessage.innerHTML = "You already entered something earlier";
        statusMessage.style.visibility = "visible"; 
        console.log("You already added");
    }


}

/*function deleteData(deletedUsername){
    currentData = getData();

    delete currentData(deletedUsername);

    // push to server
}*/

function onSuccess(token){
    turnstileToken = token;
    document.getElementById("turnstile-container").visibility = "hidden";
    if(statusMessage) statusMessage.style.visibility = "hidden";
}

function onTurnstileExpired(){
    console.log("Turnstile token expired");
}

function restoreTurnstile(){
    if(turnstileID !== null) return;

    turnstileID = turnstile.render('#turnstile-div', {
            sitekey: '0x4AAAAAACD9SDiGK_EtYqGb',
            callback: function(token) {
                console.log('Token received:', token);
            }
    });
}

function removeTurnstile(){
    if(turnstileID !== null){
        turnstile.remove(turnstileID);
        turnstileID = null;
    }


}

async function getServerData(){
    try{
        let response = await fetch(serverLink,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ canIgetUhhh: "Some json files" })
    }); 

        const data = await response.json();
        console.log("DEBUG | getServerData() returned ", data);
        console.log(JSON.stringify(data));
        console.log("data: ", data);
        return await data;

    }catch(error){
        console.log("DEBUG | getServerData() returned 0", error);
        return false;
    }

}

// check and update the status to the status div thing
function checkIfCaptchaIsOk(){
    if(turnstileToken){
        return true;
    }
    return false;
}