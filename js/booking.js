//crée la classe réservation pour gérer l'ajout d'un client
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

    /**
     * @description Attribue une valeur à l'élément du formulaire ciblé
     * @param {HTMLElement} element Id de l'élément cible
     * @param {String} value Valeur à attribuer
     */
    setValue(element, value) {
        document.getElementById(element).value = value
    }

    /**
     * @description Attribue un contenu HTML à l'élément ciblé
     * @param {HTMLElement} element Id de l'élément cible
     * @param {String} value Valeur à attribuer
     */
    setHtml(element, value) {
        document.getElementById(element).innerHTML = value
    }

    /**
     * @description Attribue un placeholder à l'élément ciblé
     * @param {HTMLElement} element Id de l'élément cible
     * @param {String} value Valeur à attribuer
     */
    setPlaceHolder(element, value) {
        document.getElementById(element).placeholder = value
    }

    /**
     * Enregistre dans le local storage les noms et prénoms entrés dans le formulaire, puis modifie le placeholder
     * @param {String} firstNameField 
     * @param {String} lastNameField 
     */
    fillUpNames(firstNameField, lastNameField) {
        let firstNameRegistered = localStorage.getItem('firstname');
        let lastNameRegistered = localStorage.getItem('lastname');
        if ( firstNameRegistered !== '' ) {
            this.setValue(firstNameField, firstNameRegistered);
        } else {
            this.setValue(firstNameField, '');
            this.setPlaceHolder(firstNameField, 'Prénom');
        }
        if ( lastNameRegistered !== '' ) {
            this.setValue(lastNameField, lastNameRegistered);
        } else {
            this.setValue(lastNameField, '');
            this.setPlaceHolder(firstNameField, 'Nom')
        }
    } 

    /**
     * @description Autorise la réservation et affiche les détails de la station et le formulaire de réservation
     */
    authorizeBooking() {
        this.setHtml(this.alertElt, '<div class="alert alert-success" role="alert"> Réservation possible </div>') ;
        document.getElementById(this.formElt).style.display= 'block';
        this.setHtml(this.addressElt, "Retrouvez votre vélo à l'adresse suivante : " + this.stationInfos.address) ;
        this.setHtml(this.standsElt, "Places disponibles : " + this.stationInfos.available_bike_stands) ;    
        this.setHtml(this.bikesElt, "Vélos disponibles : " + this.stationInfos.available_bikes) ;
        localStorage.setItem("adresse", this.stationInfos.address);
    }

    /**
     * @description Empêche la réservation et affiche une alerte indiquant que la station est fermée
     */
    blockBooking() {
        this.setHtml(this.alertElt, '<div class="alert alert-danger" role="alert"> Réservation non disponible </div>') ;
        document.getElementById(this.formElt).style.display = "none";
    }

    /**
     * Affiche le canvas de signature si le formulaire est correctement complété
     * @param {String} firstNameField Id de l'élément lié au champ "prénom"
     * @param {String} nameField Id de l'élément lié au champ "nom"
     * @param {String} signatureField Id de l'élément lié au champ "signature"
     * @param {String} canvasField Id de l'élément lié au canvas
     * @param {String} validationBtn Id de l'élément lié au bouton de validation du formulaire
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
                setHtml("h1-reservation", "Votre réservation");
                setHtml("h1-details", "Une fois validée, vout trouverez les détails de votre réservation dans le footer ci-dessous.") ;
            } else {
                signaturePad.style.visibility = "hidden";
                document.getElementById(alertNom).style.display = "block";
            }
        });       
    }
}