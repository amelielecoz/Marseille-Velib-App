class Marker {

    constructor() {


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

    addMarkerActive() {
        setIcon(this.iconGreen)
    }

    addMarkerUnactive() {
        setIcon(this.iconRed)
    }
}
