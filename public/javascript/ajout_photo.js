const inputFile = document.querySelector('#photo');
const imgCentrale = document.querySelector('.imgCentrale');

inputFile.addEventListener('change', (e) => {    
    imgCentrale.src = window.URL.createObjectURL(inputFile.files[0]);
})