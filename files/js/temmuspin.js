// Temmu spin
        const temmuVar = document.getElementById("temmu");
        const counter = document.getElementById("rotationCounter");
        const realStuffVar = document.getElementById("realStuff");

        var rotation = 0;

        let rotationCount = 0;
        

        temmuVar.addEventListener("mouseover", () => {
            temmuVar.classList.add("hovered");
            temmuVar.style.transform = `rotate(${rotation}deg) scale(1.1)`;
        });

        temmuVar.addEventListener("mouseout", () => {
            temmuVar.classList.remove("hovered");
            temmuVar.style.transform = `rotate(${rotation}deg) scale(1)`;
        });

        temmuVar.addEventListener("click", () => {
            rotation += 180;
            rotationCount += 1;

            const scale = temmuVar.classList.contains("hovered") ? 1.1 : 1;
        
            temmuVar.style.transform = `rotate(${rotation}deg) scale(${scale})`;

            if(rotationCount >= 10){
                realStuffVar.style.marginTop = "1.05%";
                counter.style.display = "block";
                counter.innerHTML = rotationCount;

            }
        });
        