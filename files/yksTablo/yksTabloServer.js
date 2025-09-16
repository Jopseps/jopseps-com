async function addToServerData(){
    let enteredName = document.getElementById("individualsNameInput").value;
    if(checkSameUsername(enteredName) == true){
        if(isAdded == false || isAddedFeatureActivated == false){
            isAddedStatus.innerHTML = "You can't use the same username with another one";
            isAddedStatus.style.visibility = "visible";
        }else{
            isAddedStatus.style.visibility = "hidden";
        }
        return false
    }

    if(isAdded == false || isAddedFeatureActivated == false){
        isAddedStatus.style.visibility = "hidden"; 
        let enteredValue1 = document.getElementById("value1Selecter").value 
        let enteredValue2 = document.getElementById("value2Selecter").value

        writeSamePlaceList(checkIfSamePlace(enteredValue1, enteredValue2));
        
        individuals.push(new individual(enteredName, enteredValue1, enteredValue2, "green"));
        isAdded = true;
        localStorage.setItem("isAdded", isAdded);
        
        drawAllIndividuals();
        tempServerThingy = objectToJson(individuals);
        console.log(tempServerThingy);

        let response = await fetch("yks-tablo.yusufmertturan.workers.dev",{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tempServerThingy)

        })


        console.log("individual writed");
        samePlaceDiv.style.visibility = "visible"

        inputTop.style.paddingTop = `min(${50 + checkIfSamePlace(enteredValue1, enteredValue2).length * 20}px, ${7 + checkIfSamePlace(enteredValue1, enteredValue2).length * 4.7}%)`;

        console.log(`min(${50 + checkIfSamePlace(enteredValue1, enteredValue2).length * 20}px, ${7 + checkIfSamePlace(enteredValue1, enteredValue2).length * 4.7}%)`);
    }
    else{
        isAddedStatus.innerHTML = "You already entered something earlier";
        isAddedStatus.style.visibility = "visible"; 
        console.log("You already added");
    }


}

/*function deleteData(deletedUsername){
    currentData = getData();

    delete currentData(deletedUsername);

    // push to server
}*/


/*async function sendData() {
  const response = await fetch("https://yks-tablo.yusufmertturan.workers.dev", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ test: "bazingen" })
  });

  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  console.log("Worker answer:", data);
}*/


async function getServerData(){
    let response = await fetch("https://yks-tablo.yusufmertturan.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ canIgetUhhh: "Some json files" })
    })

    let data = await response.json();

    console.log(JSON.stringify(data));
    console.log("data: ", data);
    return data;


}
