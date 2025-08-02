//------------------
// for dark mode
//------------------

        
        // Dark mode
        let colorScheme;
        let savedTheme = localStorage.getItem("theme");

        if (savedTheme === null) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                colorScheme = "dark";
            } else {
                colorScheme = "light";
            }
            localStorage.setItem("theme", colorScheme);
            savedTheme = colorScheme;
        } else {
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
            
            console.log(colorScheme);
            applyColorScheme();

        }

        function applyColorScheme(){
            document.querySelector(".background").style.backgroundColor = (colorScheme === "dark") ? "rgb(30, 30, 30)" : "rgb(187, 187, 187)";
            document.getElementById("darkModeButton").innerHTML = (colorScheme === "dark") ? "light mode" : "dark mode";
            
            let straightTexts = document.querySelectorAll(".straightText");

            if(straightTexts.length > 0){
                straightTexts.forEach(straightText =>{
                    straightText.style.color = (colorScheme === "dark") ? "white" : "black";
                });
            }
            
            let bigImages = document.querySelectorAll(".bigImage")
            
            if(bigImages.length > 0){
                bigImages.forEach(bigImage =>{
                    bigImage.style.borderColor = (colorScheme === "dark") ? "white" : "black";
                });
            }

            let interactiveTexts = document.querySelectorAll(".interactiveText");

            if(interactiveTexts.length > 0){
                interactiveTexts.forEach(iText =>{
                    iText.style.color = (colorScheme === "dark") ? "white" : "black";
                });
            }
            // index.html project cards
            let projectCards = document.querySelectorAll(".project-card");

            if(projectCards.length > 0){
                projectCards.forEach(projectCard =>{
                    projectCard.style.backgroundColor = (colorScheme === "dark") ? "rgb(128, 128, 128)" : "rgb(255, 255, 255)";
                    projectCard.style.borderColor = (colorScheme === "dark") ? "rgb(255, 255, 255)" : "rgb(204, 204, 204)";
                });
            }

            let projectCardsP = document.querySelectorAll(".project-card p");
            
            if(projectCardsP.length > 0){
                projectCardsP.forEach(projectCard =>{
                    projectCard.style.color = (colorScheme === "dark") ? "rgb(255, 255, 255)" : "rgb(85, 85, 85)";
                });
            }
            
            // projects.html project cards
            let projectsProjectCards = document.querySelectorAll(".project-card-P");

            if(projectsProjectCards.length > 0){
                projectsProjectCards.forEach(projectCard =>{
                projectCard.style.backgroundColor = (colorScheme === "dark") ? "rgb(128, 128, 128)" : "rgb(255, 255, 255)";
                projectCard.style.borderColor = (colorScheme === "dark") ? "rgb(255, 255, 255)" : "rgb(204, 204, 204)";
                });
            }
            
            let projectsProjectCardsP = document.querySelectorAll(".project-card-P p");
            
            if(projectsProjectCardsP.length > 0){
                projectsProjectCardsP.forEach(projectCard =>{
                    projectCard.style.color = (colorScheme === "dark") ? "rgb(255, 255, 255)" : "rgb(85, 85, 85)";
                
                });
            }
        }
