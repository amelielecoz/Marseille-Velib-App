
//crée la class carte

class Map {
    constructor(){
        this.mapTile = null;
        this.markers = [];
        this.markerClusters = new L.MarkerClusterGroup(); // initialisation du groupe de clusters
        this.APIUrl = "https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=c3b2a4d1db7b0ee5133b1b7fa4f5a6bc17d6d6e0";
        this.iconGreen = L.icon({
            iconUrl: '../images/green.svg',
            iconSize: [45, 45], 
            iconAnchor: [22, 50],
            className : 'markerActive'
        })
        this.iconRed = L.icon({
            iconUrl: '../images/red.svg',
            iconSize: [45, 45], 
            iconAnchor: [22, 50],
            className : 'markerInactive'
        })
    }

    /**
     * Charge la carte depuis OpenStreetMap de façon asynchrone et l'ajoute sur this.map
     * @param {HTMLElement} element 
     */
    load(element) {
        this.mapTile = L.map(element).setView([43.300000, 5.400000], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>'
        }).addTo(this.mapTile);
        this.addMarkers();
        console.log(this.markers)
    }

    //chargement des stations
    
    addMarkers() {
        this.ajax = new Ajax(this.APIUrl);
        this.ajax.ajaxGet(this.APIUrl, (stations) => {
        stations.forEach((station) => {
            if (station.status === "OPEN" && station.available_bikes !== 0) {
                let marker = L.marker([station.position.lat, station.position.lng]).setIcon(this.iconGreen);
                this.markers.push(marker);   
                this.markerClusters.addLayer(marker); 
                //Gestion de l'affichage des détails au clic sur le marqueur
                marker.addEventListener('click', function (e) {
                    this.booking = new Booking("alert", "form", "adresse", "velos-disponibles", "places-disponibles", station);
                    this.booking.authorizeBooking();
                })   
            } else {
                let marker = L.marker([station.position.lat, station.position.lng]).setIcon(this.iconRed);
                this.markers.push(marker);
                this.markerClusters.addLayer(marker); 
                //Gestion de l'affichage des détails au clic sur le marqueur
                marker.addEventListener('click', function (e) {
                    this.booking = new Booking("alert", "form");
                    this.booking.preventBooking();
                })  
            }
            

            })
           this.mapTile.addLayer(this.markerClusters);
        })
    
    }
    /**
     * Gère l'évenement au clic sur la station
     * @param {event} event 
     * @param {Function} cb 
     */
    addEventListener (event, cb) {
        this.popup.addEventListener('add', () => {
            this.popup.addEventListener(event, cb);
        })
    }
    
}


