const API_KEY='9d3f1a03c8msh718b5aa6b28ed75p151f13jsnc0c4e2b9e17e';
const url="https://news67.p.rapidapi.com/v2/topic-search";

window.addEventListener("load",() => fetchNews("Rajasthan"));

function reload(){
    window.location.reload();
}


async function fetchNews(query){
    const lang="en";
    const apiUrl=`${url}?search=${query}&languages=${lang}`;
    try{    
        const res=await fetch(apiUrl,{
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'news67.p.rapidapi.com',
            },
        });
        if(res.ok){
            const data=await res.json();
            // console.log(data);
            bindData(data.news);
        }else{
            console.error("API request failed");
        }
    }catch(e){
        console.error("Error fetching data");
    }
}


function bindData(articles){
    const cardContainer=document.querySelector("#cards-container");
    const newsCardTemplate=document.querySelector("#template-card");

    cardContainer.innerHTML="";
        articles.forEach(article => {
            if(!article.Image) return;
            const cardClone=newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone,article);
            cardContainer.appendChild(cardClone);
        });
        // console.log("inBinDdata");

}


function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector("#news-img");
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#news-src");
    const newsDesc=cardClone.querySelector("#news-des");

    newsImg.src=article.Image;
    newsTitle.innerHTML= article.Title;
    newsDesc.innerHTML=article.Summary;

    const date=new Date(article.PublishedOn).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=` ${date}`; //${article.Source}  ̇

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.Url, "_blank");
    });
    // console.log("InfillData");
}


const searchButton=document.querySelector(".search-button");
const searchText=document.querySelector(".news-input");
let curSelectedNav=null;


function onNavItemClick(id){
    fetchNews(id);
    if(searchText) searchText.value="";
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}


searchText.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
        const query=searchText.value;
        if(!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove('active');
        curSelectedNav=null;
    }
});


searchButton.addEventListener('click',() =>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
});


// For Dark Mode
const toggle_btn=document.querySelector("#toggle");
toggle_btn.addEventListener('change',()=>{
    if(toggle_btn.checked){
        document.body.classList.add('darkMode');
    }
    else{
        document.body.classList.remove('darkMode');
    }  
});

