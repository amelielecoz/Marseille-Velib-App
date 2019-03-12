class Ajax {
    
    /**
    * @description Exécute un appel AJAX GET
    * @param {string} URL cible
    * @param {Function} fonction callback appelée en cas de succès
    */
    ajaxGet(url, callback) {
        this.req = new XMLHttpRequest();
        this.req.open("GET", url);
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