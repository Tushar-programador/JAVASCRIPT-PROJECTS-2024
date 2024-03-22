const Imagecontainer = document.getElementById('image-container');
const loader=document.getElementById('loader');
let photosArray=[];


const count=10;
const apikey='Sak9y9TieGPTBufTQJBRIFeWkGCOugX-FrDRMwh1EmI';
const apiURL=`https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;  


function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

// create Element for links and photos
function displayPhotos(){
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
    if(window.innerHeight+window.scrollY>= document.body.offsetHeight-1000){
        getphotos();
        console.log("load more");

    }
});
getphotos();