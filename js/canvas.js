class Canvas {
    constructor(element, saveElt, clearElt) {
        this.element = element; 
        this.saveElt = saveElt; 
        this.clearElt = clearElt; 

        let canvas = document.querySelector(element);
        this.ctx = canvas.getContext("2d");
        this.saveButton = document.getElementById(this.saveElt);
        this.clearButton = document.getElementById(this.clearElt);
    
        canvas.width = canvas.parentNode.clientWidth;
        canvas.maxWidth = 300;
        canvas.height = 150;
    
        this.ctx.strokeStyle = "#000";
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;

        
        this.initDraw();
        this.effaceSignature();
        this.enregistreSignature();
    }



    /**
     * Dessine
     */
    draw(x, y) {
        if (!this.isDrawing) 
            return; // stop the fn from running when they are not moused down
        this.ctx.beginPath();
        // start from
        this.ctx.moveTo(this.lastX, this.lastY);
        // go to
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        [this.lastX, this.lastY] = [x, y];
    }

    
    //Initialise le dessin
    initDraw() {
        
        canvas.addEventListener("mousedown", e => {
            this.isDrawing = true;
            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        });
        canvas.addEventListener("touchstart", e => {
            if (e.touches && e.touches.length == 1) {
            this.isDrawing = true;
            let touch = e.touches[0];
            let touchX = touch.pageX - touch.target.offsetLeft;
            let touchY = touch.pageY - touch.target.offsetTop;
            [this.lastX, this.lastY] = [touchX, touchY];
            e.preventDefault();
            }
        });
    
        //Dessine
        canvas.addEventListener("mousemove", (e) => {
            this.draw(e.offsetX, e.offsetY);
        });
        canvas.addEventListener("touchmove", e => {
            if (e.touches && e.touches.length == 1) {
            let touch = e.touches[0];
            let touchX = touch.pageX - touch.target.offsetLeft;
            let touchY = touch.pageY - touch.target.offsetTop;
            this.draw(touchX, touchY);
            }
        });
        
        //Termine le dessin
        canvas.addEventListener("mouseup", () => (this.isDrawing = false));
        canvas.addEventListener('mouseout', () => this.isDrawing = false);
        canvas.addEventListener("touchend", () => (this.isDrawing = false));
    }

    
    /**
     * Fonction pour effacer la signature
     */
    effaceSignature() {
        this.clearButton.addEventListener("click", ()=> {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height)
        });
    }
    
    
    enregistreSignature() {
        this.saveButton.addEventListener("click", () => {
            var dataCanvas = canvas.toDataURL();
            var canvasImage = document.getElementById("canvas-img");
            canvasImage.src = dataCanvas;
            canvasImage.style.display = "block";
            localStorage.setItem("canvas", dataCanvas);
        
            document.getElementById("h1-reservation").innerHTML = "Réservation confirmée";
            document.getElementById("h1-details").innerHTML = prenom.value.toUpperCase() + ", votre réservation est valable pour 20 minutes.";

            let confirmation = new Confirmation("confirmation", "timer", "annuler");
        });
    }

}














