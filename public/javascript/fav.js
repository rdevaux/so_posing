let favori = document.querySelector('.f');
fav = false;

favori.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(fav)
    if (fav) {
        fav = false;
        favori.src=("/images/fav-false.png");
    } else {
        fav = true; 
        favori.src=("/images/fav-true.png");
    }
});
