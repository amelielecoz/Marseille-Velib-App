class Confirmation {
    constructor(element, timerId, cancelElt) {
        this.timerId = timerId;
        this.confirmation = document.getElementById(element);
        this.interval;
        this.cancelElt = cancelElt;
    }

    /**
     * @description Compte à rebours
     */
    startTimer() {
        let minutes = 20;
        let seconds = 1;
        this.interval = setInterval( () => {            
            seconds -= 1;
            if (minutes < 0) return;
            else if (seconds < 0 && minutes !== 0) {
                minutes -= 1;
                seconds = 59;
            }
            localStorage.setItem("seconds", seconds);  
            localStorage.setItem("minutes", minutes);  
            if (minutes === 0 && seconds === 0) {
               this.resetTimer();
               this.cancelBooking();
            }
            
            document.getElementById(this.timerId).innerHTML = minutes + ':' + seconds ;
            
        }, 1000);
    }

    /**
     * @description Remet le compteur à zéro
     */
    clearTimer() {
        clearInterval(this.interval);
    }

    /**
     * @description Retire les données timer stockées dans le local
     */
    resetTimer() { 
        localStorage.removeItem('seconds');
        localStorage.removeItem('minutes');
        this.clearTimer();
        document.getElementById(this.timerId).innerHTML = '';
    }

    /**
     * @description Annule le booking, reset le timer à zéro
     */
    cancelBooking() {
        this.resetTimer();
        document.getElementById("h1-reservation").innerHTML = "Réservation annulée";
        document.getElementById("h1-details").innerHTML = "";
        this.confirmation.style.display = "none";
    }

    /**
     * @description Confirme le booking, stocke l'adresse de réservation, supprime l'affichage du canvas signature
     */
    confirmBooking() {
        this.startTimer();
        const address = localStorage.getItem("adresse");
        document.getElementById("adresse-validee").innerHTML = address;
        this.confirmation.style.display = "block";
        let signaturePad = document.getElementById("signature-pad")
        signaturePad.style.visibility ="hidden";
        signaturePad.style.height = "0px"
        let canvasImg = localStorage.getItem('canvas');
        document.getElementById('canvas-img').innerHTML = canvasImg;
        let btnAnnuler = document.getElementById(this.cancelElt);
        btnAnnuler.addEventListener('click', () => { this.cancelBooking() } );
    }


} 