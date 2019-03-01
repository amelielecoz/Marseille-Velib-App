//crée la classe réservation pour gérer l'ajout du nom
class Booking {
    constructor(alertElt, formElt, addressElt, standsElt, bikesElt, stationInfos, validationButton) {
        this.alertElt = alertElt;
        this.formElt = formElt;
        this.addressElt = addressElt; 
        this.standsElt = standsElt;
        this.bikesElt = bikesElt;
        this.stationInfos = stationInfos;
        this.validationButton = validationButton;
    }


    fillUpNames(firstNameField, lastNameField) {
        let firstNameRegistered = localStorage.getItem('firstname');
        console.log(firstNameRegistered)
        let lastNameRegistered = localStorage.getItem('lastname');
        if ( firstNameRegistered !== '' ) {
            document.getElementById(firstNameField).value = firstNameRegistered;
        } else {
            document.getElementById(firstNameField).value = '';
            document.getElementById(firstNameField).placeholder = 'Prénom';
        }
        if ( lastNameRegistered !== '' ) {
            document.getElementById(lastNameField).value = lastNameRegistered;
        } else {
            document.getElementById(lastNameField).value = '';
            document.getElementById(firstNameField).placeholder = 'Nom'
        }
    }
    /**
     * Affiche les détails de la station et le formulaire de réservation
     */
    authorizeBooking() {
        document.getElementById(this.alertElt).innerHTML ='<div class="alert alert-success" role="alert"> Réservation possible </div>';
        document.getElementById(this.formElt).style.display= 'block';
        document.getElementById(this.addressElt).innerHTML = "Retrouvez votre vélo à l'adresse suivante : " + this.stationInfos.address ;
        document.getElementById(this.standsElt).innerHTML = "Places disponibles : " + this.stationInfos.available_bike_stands;    
        document.getElementById(this.bikesElt).innerHTML = "Vélos disponibles : " + this.stationInfos.available_bikes;
        localStorage.setItem("adresse", this.stationInfos.address);
    }

    /**
     * Affiche une alerte indiquant que la station est fermée
     */
    blockBooking() {
        document.getElementById(this.alertElt).innerHTML = '<div class="alert alert-danger" role="alert"> Réservation non disponible </div>';
        document.getElementById(this.formElt).style.display = "none";
    }



    /**
     * Affiche le canvas de signature si le formulaire est correctement complété
     * @param {String} firstNameField 
     * @param {String} nameField 
     * @param {String} signatureField 
     * @param {String} canvasField 
     * @param {String} validationBtn 
     */
    showSignaturePad(firstNameField, lastNameField, signatureField, canvasField, alertNom) {
        document.getElementById(this.validationButton).addEventListener("click", function(e) {
            let prenom = document.getElementById(firstNameField).value;
            let nom = document.getElementById(lastNameField).value;

            localStorage.setItem("lastname", nom);
            localStorage.setItem("firstname", prenom);
            let signaturePad = document.getElementById(signatureField);
            let canvas = new Canvas(canvasField, "valide-signature", "efface-signature");
            

            if(prenom !== "" && nom !== "") {
                signaturePad.style.visibility ="visible";
                signaturePad.style.height = "300px";
                canvas.initDraw();
                canvas.effaceSignature();
                canvas.enregistreSignature();
                document.getElementById(alertNom).style.display = "none";
                document.getElementById("h1-reservation").innerHTML = "Votre réservation";
                document.getElementById("h1-details").innerHTML = "Une fois validée, vout trouverez les détails de votre réservation dans le footer ci-dessous.";
            } else {
                signaturePad.style.visibility = "hidden";
                document.getElementById(alertNom).style.display = "block";
            }
        });
        
    }


    

}