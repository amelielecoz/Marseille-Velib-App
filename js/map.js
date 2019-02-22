
//crée la class carte

class Map {
    constructor(){
        this.mapTile = null;
        this.markers = [];
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
                let marker = L.marker([station.position.lat, station.position.lng]).addMarkerActive().addTo(this.mapTile);
                this.markers.push(marker);         
            } else {
                let marker = L.marker([station.position.lat, station.position.lng]).setIcon(this.iconRed).addTo(this.mapTile);
                this.markers.push(marker); 
            }
            

            })
           
        })
    
    }
    
}


