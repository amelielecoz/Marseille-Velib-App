class Confirmation {
    constructor(element, timerId, cancelElt) {
        this.element = element;
        this.timerId = timerId;
        this.confirmation = document.getElementById(this.element);
        this.interval;
        this.cancelElt = cancelElt
        this.countdown();
        this.confirmBooking();
        this.cancelBooking(cancelElt)

    }

    /**
     * Compte à rebours
     */
    countdown() {
        // clearInterval(interval);
        let interval = setInterval( () =>{
            let timer = document.getElementById(this.timerId).innerHTML;
            timer = timer.split(':');
            let minutes = timer[0];
            let seconds = timer[1];
            seconds -= 1;
            if (minutes < 0) return;
            else if (seconds < 0 && minutes != 0) {
                minutes -= 1;
                seconds = 59;
            }
            else if (seconds < 10 && length.seconds != 2) {
                seconds = '0' + seconds;
                timer = (minutes + ':' + seconds);
            }
                  
            if (minutes == 0 && seconds == 0) {
              clearInterval(interval);
              //annulation();
            }
        }, 1000);
      }

    confirmBooking() {
        Canvas.saveButton.addEventListener('click', function(){
            var address = localStorage.getItem("adresse");
            document.getElementById("adresse-validee").innerHTML = '<i class="fas fa-map-marker-alt"></i> Adresse : ' + address;
            document.getElementById('timer').textContent = "20:00";
            countdown(); 
            setInterval(countdown(), 1000); //Déclenchement du compte à rebours
            this.confirmation.style.display = "block";
            signaturePad.style.visibility ="hidden";
            signaturePad.style.height = "0px"
            let canvasImg = localStorage.getItem('canvas');
            document.getElementById('canvas-img').innerHTML = canvasImg;
        });
    }

    cancelBooking(cancelElt) {
        let btnAnnuler = document.getElementById(cancelElt);

        btnAnnuler.addEventListener('click', () => {
            this.confirmation.style.display = "none";
            document.getElementById("h1-reservation").innerHTML = "Réservation annulée";
            document.getElementById("h1-details").innerHTML = "";
        });
    }
}