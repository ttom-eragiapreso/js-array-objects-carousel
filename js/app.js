// **Consegna:**
// Riprendiamo l’esercizio carosello e rifacciamolo, questa volta usando un array di oggetti.
// Ogni elemento deve avere un titolo, una descrizione e il riferimento ad una immagine.
// Immagini proposte (non obbligatorie):
// Svezia http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg
// Perù https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg
// Chile https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c
// Argentina https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg
// Colombia https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop
// Le immagini devono essere 5 e nella grafica devono essere presenti:
// - immagine in evidenza
// - thumbnail di tutte le immagine con in evidenza l’immagine attiva
// - bottone avanti e indietro
// Lo screenshot allegato è solo dimostrativo ma cercate di mettere le thumb in basso e non laterlamente
// **Bonus 1:**
// Sperimentiamo attraverso l’uso delle timing functions anche una funzionalità di scorrimento al nostro carosello:al click di un bottone o già dall’inizio possiamo far partire, ad intervalli di tempo a piacere, lo scorrimento delle immagini disponibili nel carosello stesso.
// ****
// **Bonus 2:**
// E se volessi un bottone per invertire la “direzione” del carosello?
// ****

console.log("app loaded")

// Array di oggetti
const allImages = [{
  countryName: "Svezia",
  image: "http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg",
  description: "La Svezia è bella"
},{
  countryName: "Perù",
  image: "https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg",
  description: "Il Perù è bello"
},{
  countryName: "Argentina",
  image: "https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg",
  description: "L'Argentina è bella'"
},{
  countryName: "Colombia",
  image: "https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop",
  description: "La Colombia è bella"
},{
  countryName: "Chile",
  image: "https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c",
  description: "Il Chile è bello"
},]

// Mi prendo l'elementi del DOM che mi servono

const mainWrapper = document.querySelector(".main-wrapper");
const carousel = document.querySelector(".carousel");
const slider = document.querySelector(".slider");
const thumbnails = document.querySelector(".thumbnails");
let counter = 0;
let autplayCounter = 0;


// Aggiungo tutte le foto al DOM, sia nello slilder principale che nel thumbnails
addImagesToDom();
// Mi prendo tutti i container che ho creato per metterci le foto per poter poi gestire l'autoplay che aggiunge e rimuove le classi
const allHiddenImgContainer = Array.from(document.getElementsByClassName("img-container")) 
console.log(allHiddenImgContainer)

//Mostro la prima foto togliendo la classe al primo elemento della HTML collection. 
allHiddenImgContainer[counter].classList.remove("d-none")

// Mi prendo tutte le foto nel thumbnail per poter gestire il click
//Convertendo la HTML collection in array ho accesso a tutti i metodi che abbiamo fatto oggi
const allPhotosInThumbnail = Array.from(document.getElementsByClassName("img"));
console.log(allPhotosInThumbnail)

addIndex();












function addIndex(){

  for(let photo of allPhotosInThumbnail){
    photo.index = counter++
    photo.addEventListener("click", showOnClick)
  }

  counter = 0;

  for(let container of allHiddenImgContainer){
    container.index = counter++
  }

}



function showOnClick(){
  console.log(`Hai cliccato ${this.index}`);

  let photoClicked = allHiddenImgContainer.filter()
}





function addImagesToDom(){

  allImages.forEach( country => {

    let imgContainer = document.createElement("div")
    imgContainer.classList.add("img-container", "d-none")

    imgContainer.innerHTML += `
    <img src=${country.image} alt="" class="">
    <span class="country-name">${country.countryName}</span>
    <span class="country-description">${country.description}</span>`;

    thumbnails.innerHTML += `<img src=${country.image} alt="" class="img">`;

    slider.append(imgContainer)
  })
}