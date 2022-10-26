
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
  description: "L'Argentina è bella"
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
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let counter = 0;
let autoplayCounter = 0;


// Aggiungo tutte le foto al DOM, sia nello slilder principale che nel thumbnails
addImagesToDom();
// Mi prendo tutti i container che ho creato per metterci le foto per poter poi gestire l'autoplay che aggiunge e rimuove le classi
const allHiddenImgContainer = Array.from(document.getElementsByClassName("img-container")) 

//Mostro la prima foto togliendo la classe al primo elemento della HTML collection. 
allHiddenImgContainer[counter].classList.remove("d-none")

// Mi prendo tutte le foto nel thumbnail per poter gestire il click
//Convertendo la HTML collection in array ho accesso a tutti i metodi che abbiamo fatto oggi
const allPhotosInThumbnail = Array.from(document.getElementsByClassName("img"));
allPhotosInThumbnail[counter].classList.add("active")

// Uso questa funzione semplicemente per aggiungere la proprietà custom index alle foto dello slider e alle thumbnail, così da poterlo usare dopo per comparazione 
addIndex();




nextBtn.addEventListener("click", function(){
  nextPrev(true)
})

prevBtn.addEventListener("click", function(){
  nextPrev(false)
})






function nextPrev(isNext){

  let photoCurrentlyShown = allHiddenImgContainer.filter( photo => !photo.classList.contains("d-none"))
  photoCurrentlyShown[0].classList.add("d-none");
  
  if(isNext){


    if(autoplayCounter +1 === allPhotosInThumbnail.length){
      allPhotosInThumbnail[autoplayCounter].classList.remove("active")
      autoplayCounter =  0;
      allPhotosInThumbnail[autoplayCounter].classList.add("active");
      allHiddenImgContainer[autoplayCounter].classList.remove("d-none")
    }else {
      allPhotosInThumbnail[autoplayCounter].classList.remove("active")
      allPhotosInThumbnail[++autoplayCounter].classList.add("active")
      allHiddenImgContainer[autoplayCounter].classList.remove("d-none")
    }
  }else {

    if(autoplayCounter === 0){
      allPhotosInThumbnail[autoplayCounter].classList.remove("active")
      autoplayCounter = allPhotosInThumbnail.length -1;
      allPhotosInThumbnail[autoplayCounter].classList.add("active");
      allHiddenImgContainer[autoplayCounter].classList.remove("d-none")
    }else {
      allPhotosInThumbnail[autoplayCounter].classList.remove("active")
      allPhotosInThumbnail[--autoplayCounter].classList.add("active")
      allHiddenImgContainer[autoplayCounter].classList.remove("d-none")
    }
  }
}

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
  //Mi prendo il container e la foto del thumbnail sul quale ho cliccato andando a filtrare l'array di container basandomi sull'indice che avevo assegnato come proprietà custom al momento dell'iniezione nel DOM
  let photoContainerClicked = allHiddenImgContainer.filter( photo => photo.index === this.index);
  let photoThumbnailClicked = allPhotosInThumbnail.filter( photo => photo.index === this.index);

  //Se il container che ho cliccato non contiene la classe d-none, vuol dire che è quello che in quel momento è attivo, quindi non faccio nulla.
  if(!photoContainerClicked[0].classList.contains("d-none")){
    console.log("Ho cliccato sulla foto già selezionata")
  }else {
    //Altrimenti mi vado a prendere la foto attualmente mostrata filtrando di nuovo l'array per gli elemennti che non contengono la classe d-none
    // Qui ho fatto un pò al contrario perché per la thumbnail ho aggiunto invece che rimosso una classe, quindi anche il controllo è al contrario.
    let photoCurrentlyShown = allHiddenImgContainer.filter( photo => !photo.classList.contains("d-none"))
    let thumbnailCurrentlyShown = allPhotosInThumbnail.filter( photo => photo.classList.contains("active"))
    // Aggiungo la classe D-none a la foto attualmente mostrata
    photoCurrentlyShown[0].classList.add("d-none")
    thumbnailCurrentlyShown[0].classList.remove("active")
    // La tolgo a quella su cui ho cliccato
    photoContainerClicked[0].classList.remove("d-none")
    photoThumbnailClicked[0].classList.add("active")
  }
  autoplayCounter = this.index
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