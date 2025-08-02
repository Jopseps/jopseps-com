//------------------
// for dark mode
//------------------

        
        // Dark mode
        let colorScheme;

        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
            colorScheme = "dark";
        }else{
            colorScheme = "light";
        }

        console.log(colorScheme);
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

            straightTexts.forEach(straightText =>{
                straightText.style.color = (colorScheme === "dark") ? "white" : "black";
            });

            document.querySelector(".bigImage").style.borderColor = (colorScheme === "dark") ? "white" : "black";

            let interactiveTexts = document.querySelectorAll(".interactiveText");

            interactiveTexts.forEach(iText =>{
                iText.style.color = (colorScheme === "dark") ? "white" : "black";
            });

            // index.html project cards
            let projectCards = document.querySelectorAll(".project-card");

            projectCards.forEach(projectCard =>{
                projectCard.style.backgroundColor = (colorScheme === "dark") ? "rgb(128, 128, 128)" : "rgb(255, 255, 255)";
                projectCard.style.borderColor = (colorScheme === "dark") ? "rgb(255, 255, 255)" : "rgb(204, 204, 204)";
            });

            let projectCardsP = document.querySelectorAll(".project-card p");

            projectCardsP.forEach(projectCard =>{
                projectCard.style.color = (colorScheme === "dark") ? "rgb(255, 255, 255)" : "rgb(85, 85, 85)";
                
            });
            
            
            // projects.html project cards
            let projectsProjectCards = document.querySelectorAll(".project-card-P");

            projectsProjectCards.forEach(projectCard =>{
                projectCard.style.backgroundColor = (colorScheme === "dark") ? "rgb(128, 128, 128)" : "rgb(255, 255, 255)";
                projectCard.style.borderColor = (colorScheme === "dark") ? "rgb(255, 255, 255)" : "rgb(204, 204, 204)";
            });

            let projectsProjectCardsP = document.querySelectorAll(".project-card-P p");

            projectsProjectCardsP.forEach(projectCard =>{
                projectCard.style.color = (colorScheme === "dark") ? "rgb(255, 255, 255)" : "rgb(85, 85, 85)";
                
            });
            
        }
