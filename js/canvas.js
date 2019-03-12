class Canvas {
    constructor(element, saveElt, clearElt) {
        this.element = element; 
        this.saveElt = saveElt; 
        this.clearElt = clearElt; 
        this.initCanvas();      
    }

    /**
     * @description initialise le canvas
     */
    initCanvas() {
        let canvas = document.querySelector(this.element);
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
        this.drawEmpty = true;
        this.lastX = 0;
        this.lastY = 0;
        this.initDraw();
        this.enregistreSignature();
        this.confirmation;
    }

    /**
     * @description Dessine
     * @param {number} x coordonnées du dessin
     * @param {number} y coordonnées du dessin
     */
    draw(x, y) {
        if (!this.isDrawing) 
            return; 
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        [this.lastX, this.lastY] = [x, y];
        this.drawEmpty = false;
    }

    /**
     * @description Actualise le dessin en fonction de l'évenement passé par la souris
     */
    initDraw() {
        canvas.addEventListener("mousedown", e => {
            this.isDrawing = true;
            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        });
        canvas.addEventListener("mousemove", (e) => {
            this.draw(e.offsetX, e.offsetY);
        });
        canvas.addEventListener("mouseup", () => {
            this.isDrawing = false;
        });
        canvas.addEventListener('mouseout', () => {
            this.isDrawing = false;
        });
    }

    /**
     * @description Efface le contenu du canvas
     */
    effaceSignature() {
        this.clearButton.addEventListener("click", ()=> {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.drawEmpty = true;
        });
    }
    
    /**
     * @description Enregistre le contenu du canvas s'il n'est pas vide, ou envoie un message d'alerte s'il est vide
     */
    enregistreSignature() {
        this.saveButton.addEventListener("click", () => {
            if (this.confirmation !== undefined) {
                this.confirmation.cancelBooking();
            }
            if (this.drawEmpty !== true ) {
                this.showConfirmation();
                let dataCanvas = canvas.toDataURL();
                let canvasImage = document.getElementById("canvas-img");
                canvasImage.src = dataCanvas;
                canvasImage.style.display = "block";  
                this.confirmation = new Confirmation("confirmation", "timer", "annuler");
                this.confirmation.confirmBooking()
                localStorage.setItem("canvas", dataCanvas);
                
            } else {
                this.hideConfirmation();
            }
        });
        this.drawEmpty = true;  
    }

    /**
     * @description Montre la confirmation
     */
    showConfirmation() {
        document.getElementById("alert-signature").style.display = "none";
        document.getElementById("h1-reservation").style.display = "block";
        document.getElementById("h1-reservation").innerHTML = "Réservation confirmée";
        document.getElementById("h1-details").style.display = "block";
        document.getElementById("h1-details").innerHTML = prenom.value.toUpperCase() + ", votre réservation est valable pour 20 minutes.";  
    }

    /**
     * @description Cache la confirmation
     */
    hideConfirmation() {
        document.getElementById("confirmation").style.display = "none"
        document.getElementById("alert-signature").style.display = "block";
        document.getElementById("h1-reservation").style.display = "none";
        document.getElementById("h1-details").style.display = "none";
    }
}














