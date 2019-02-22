// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès

class Ajax {
    
    ajaxGet(url, callback) {
        this.req = new XMLHttpRequest();
        this.req.open("GET", url);
        // this.req.setRequestHeader("Access-Control-Allow-Origin", "*");
        // this.req.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        // this.req.setRequestHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
        this.req.addEventListener("load", () => {
            if (this.req.status >= 200 && this.req.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requête
                callback(JSON.parse(this.req.responseText));
            } else {
                console.error(this.req.status + " " + this.req.statusText + " " + url);
            }
        });
        this.req.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + url);
        });
        this.req.send(null);
    }

}