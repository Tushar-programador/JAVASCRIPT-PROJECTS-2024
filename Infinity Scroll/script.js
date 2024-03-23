const Imagecontainer = document.getElementById('image-container');
const loader=document.getElementById('loader');


let photosArray=[];
let imagesLoaded=0;
let ready=false;
let totalImages=0;


const count=30;
const apikey='Sak9y9TieGPTBufTQJBRIFeWkGCOugX-FrDRMwh1EmI';
const apiURL=`https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;  

// this function check that pages is completly loaded
function imageLoaded(){
    console.log("Image loaded")
    imagesLoaded++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready = ',ready)
    }
}



// Helper Funtion ot set multiple attributes in in single
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

// create Element for links and photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log(totalImages);
    // Run Funcion for Each Array
    photosArray.forEach((photo)=>{
        // create <a> to link to Unplash
        const item =  document.createElement('a')
        
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        // Create <img> for Photo
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt:photo.alt_description, 
            title:photo.alt_description 
        })
        //Event Listner, check when page is finished loadng
        img.addEventListener('load',imageLoaded);
        // Put the image inside the anchor elemnt
        item.appendChild(img);
        Imagecontainer.appendChild(item);  
    });
}
// get Phtos 
async function getphotos(){
    try{
        const respones=await fetch(apiURL);
        photosArray =await respones.json();
        displayPhotos();
        }catch(error){
            console.log(error);
            console.log("Error aaah agya")
    }
}

//check to see if scrolling is happen
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>= document.body.offsetHeight-1000 &&  ready ){
        ready = false;
        getphotos();
        console.log("load more");

    }
});
getphotos();