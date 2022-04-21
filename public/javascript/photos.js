// GESTION DU DOUBLE CLIQUE

const divPhoto = document.querySelectorAll('.divPhoto')
touchtime = 0;
Array.from(divPhoto).forEach(element => {
    element.addEventListener('click', (e) => {
        if (touchtime == 0) {
            // reperage du premier click
            touchtime = new Date().getTime();
        } else {
            // compare le premier click a ce click la et regarde si ils sont dans le laps de temps donné
            if (((new Date().getTime()) - touchtime) < 800) {
                // double click validé
                console.log("double clicked");
                element.style.display = "none";
                touchtime = 0;
            } else {
                // double click non validé on remet le temps a 0
                touchtime = new Date().getTime();
            }
        }
    })
})