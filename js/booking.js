//crée la classe réservation pour gérer l'ajout du nom

class Booking {
    constructor(alert, form) {
        this.alert = alert;
        this.form = form
    }

    authorizeBooking() {
        document.getElementById(this.alert).innerHTML ='<div class="alert alert-success" role="alert"> Réservation possible </div>';
        document.getElementById(this.form).style.display= 'block';
        // document.getElementById("adresse").innerHTML = "Retrouvez votre vélo à l'adresse suivante : " + address ;
        // document.getElementById("places-disponibles").innerHTML = "Places disponibles : " + nombreStands;    
        // document.getElementById("velos-disponibles").innerHTML = "Vélos disponibles : " + nombreVelos;
        // localStorage.setItem("adresse", address);
    }

    preventBooking() {
        document.getElementById(this.alert).innerHTML = '<div class="alert alert-danger" role="alert"> Réservation non disponible </div>';
        document.getElementById(this.form).style.display = "none";
    }
    

}