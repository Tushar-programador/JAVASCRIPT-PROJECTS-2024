const quoteContainer= document.getElementById('quote-container')
const qouteText= document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn= document.getElementById('twitter')
const newQuoteBtn= document.getElementById('new-quote')
const loadr=document.getElementById('loader')


// show new Quotes
function newQuotes(){   
    loading();
    // pick a random Quotes
    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //check if Author fielf is blank
    if(!quote.author){
        authorText.textContent= "Unknown"
    }
    else{
        authorText.textContent=quote.author;
    }
    // check is quote lenght is long
    if(quote.text.length<40){
        qouteText.classList.add('long-quote');
        // console.log(1);
    }else{
        qouteText.classList.remove('long-quote');
        // console.log(2);
    }

    qouteText.textContent=quote.text;
    compelet();
}

// get Quotes from API 
async function getQuotes(){
    loading();
    const apiurl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const respone=await fetch(apiurl);
        apiQuotes=await respone.json();
        newQuotes();
    }catch(error){
        
        //catch Error here
    }
}

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// hide loading
function compelet(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

function tweetQuote(){
    const twitterurl=`https://twitter.com/intent/tweet?text=${quote.textContent}-${authorText.textContent}`;
    window.open(twitterurl, '_blank');
}

//Event Listner 
newQuoteBtn.addEventListener('click',newQuotes);
twitterBtn.addEventListener('click',tweetQuote);
//On load 
getQuotes(); 

// newQuotes();
// loading();