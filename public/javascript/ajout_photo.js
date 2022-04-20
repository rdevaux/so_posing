const inputFile = document.querySelector('#photo');
const imgCentrale = document.querySelector('.imgCentrale');

inputFile.addEventListener('change', (e) => {    
    if(inputFile.files[0].size > 2000000) {
        alert('La taille du fichier est trop élevé ! (max 2mo)')
        inputFile.value = '';
        imgCentrale.src = '/images/img_choisir_photo.svg';
    } else {
        imgCentrale.src = window.URL.createObjectURL(inputFile.files[0]);
    }
})