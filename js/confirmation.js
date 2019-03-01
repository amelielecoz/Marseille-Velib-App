class Confirmation {
    constructor(element, timerId, cancelElt) {
        this.element = element;
        this.timerId = timerId;
        this.confirmation = document.getElementById(this.element);
        this.interval;
        this.cancelElt = cancelElt;
        // this.cancelBooking(this.cancelElt); 
      
        this.confirmBooking();
              
    }

    /**
     * Compte à rebours
     */
    startTimer() {
        // clearInterval(interval);
        let minutes = 20;
        let seconds = 0;
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
               resetTimer();
            }
            document.getElementById(this.timerId).innerHTML = minutes + ':' + seconds ;

           
        
        }, 1000);
    }

    resetTimer() {
        
        localStorage.removeItem('seconds');
        localStorage.removeItem('minutes');
        this.cancelBooking();
    }

    confirmBooking() {
        
        this.resetTimer();
        this.startTimer();
        var address = localStorage.getItem("adresse");
        document.getElementById("adresse-validee").innerHTML = address;
        
        this.confirmation.style.display = "block";
        let signaturePad = document.getElementById("signature-pad")
        signaturePad.style.visibility ="hidden";
        signaturePad.style.height = "0px"
        let canvasImg = localStorage.getItem('canvas');
        document.getElementById('canvas-img').innerHTML = canvasImg;
        
    }


    cancelBooking() {
        let btnAnnuler = document.getElementById(this.cancelElt);
        btnAnnuler.addEventListener('click', () => {
            clearInterval(this.interval);
            document.getElementById(this.timerId).innerHTML = '' ;
            this.confirmation.style.display = "none";
            document.getElementById("h1-reservation").innerHTML = "Réservation annulée";
            document.getElementById("h1-details").innerHTML = "";
        }
    )};
} 