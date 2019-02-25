//crée la classe réservation pour gérer l'ajout du nom

class Booking {
    constructor(alertElt, formElt, addressElt, standsElt, bikesElt, stationInfos) {
        this.alertElt = alertElt;
        this.formElt = formElt;
        this.addressElt = addressElt; 
        this.standsElt = standsElt;
        this.bikesElt = bikesElt;
        this.stationInfos = stationInfos
    }

    authorizeBooking() {
        document.getElementById(this.alertElt).innerHTML ='<div class="alert alert-success" role="alert"> Réservation possible </div>';
        document.getElementById(this.formElt).style.display= 'block';
        document.getElementById(this.addressElt).innerHTML = "Retrouvez votre vélo à l'adresse suivante : " + this.stationInfos.address ;
        document.getElementById(this.standsElt).innerHTML = "Places disponibles : " + this.stationInfos.available_bike_stands;    
        document.getElementById(this.bikesElt).innerHTML = "Vélos disponibles : " + this.stationInfos.available_bikes;
        localStorage.setItem("adresse", this.stationInfos.address);
    }

    preventBooking() {
        document.getElementById(this.alertElt).innerHTML = '<div class="alert alert-danger" role="alert"> Réservation non disponible </div>';
        document.getElementById(this.formElt).style.display = "none";
    }
    

}