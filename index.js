import{a as P,S as O,i as y}from"./assets/vendor-CNqCr-V-.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();async function v(t,e){return(await P.get("https://pixabay.com/api/",{params:{key:"53154523-05709ccc1510dd918919f2375",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}const c="/goit-js-hw-12/assets/icons-DsMv-Dn6.svg",w=document.querySelector(".loader"),b=document.querySelector(".gallery"),L=document.querySelector(".js-load-more");let k=new O(".gallery-link",{captionsData:"alt",captionDelay:250});function B(t){return t.map(function(e){const{webformatURL:a,largeImageURL:n,tags:s,likes:o,views:i,comments:M,downloads:x}=e;return`<li class="gallery-item">
            <div class="gallery-img-container">
            <a class="gallery-link" href="${n}">
              <img class="image" src="${a}" alt="${s}" data-source="${n}"  /></a>
            </div>
            <div class="desc-container">
              <ul class="desc-list">
              <li class="icons"><svg class="icon" width="24" height="24">
            <use href="${c}#icon-like"></use>
          </svg><span>${o}</span></li>
              <li class="icons"><svg class="icon" width="24" height="24">
            <use href="${c}#icon-views"></use>
          </svg><span>${i}</span></li>
              <li class="icons"><svg class="icon" width="24" height="24">
            <use href="${c}#icon-comments"></use>
          </svg><span>${M}</span></li>
              <li class="icons"><svg class="icon" width="24" height="24">
            <use href="${c}#icon-downloads"></use>
          </svg><span>${x}</span></li>
              </ul>
            </div>
          </li>`}).join("")}function $(t){if(!t.hits.length){y.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"rgb(255, 215, 163)"});return}const e=B(t.hits);b.insertAdjacentHTML("beforeend",e),k.refresh()}function H(){b.innerHTML=""}function S(){w.classList.add("is-shown")}function q(){w.classList.remove("is-shown")}function j(){L.classList.add("btn-is-shown")}function d(){L.classList.remove("btn-is-shown")}const p=document.querySelector(".form"),f=document.querySelector("button[type=submit]"),C=document.querySelector('input[name="search-text"]'),g=document.querySelector(".js-load-more");let l,r=1,u=0;const h=15;f.disabled=!0;C.addEventListener("input",t=>{f.disabled=t.target.value.trim()===""});function D(){const t=document.querySelector(".gallery .gallery-item:last-child");t&&window.scrollBy({top:t.getBoundingClientRect().height*2,behavior:"smooth"})}function m(t){y.show({message:t,position:"topRight",backgroundColor:"rgb(255, 215, 163)"})}g.addEventListener("click",async t=>{S();try{r+=1;const e=await v(l,r);u=Math.ceil(e.totalHits/h),g.textContent=`Page: ${r} of ${u}`,$(e),r>=u&&(d(),m(`We're sorry, but you've reached the end of search results. Total images found: ${e.totalHits}.`)),D()}catch(e){console.log("error",e)}finally{q()}});p.addEventListener("submit",async t=>{g.textContent="Load more",d(),S();try{if(r=1,t.preventDefault(),H(),l=document.querySelector('input[name="search-text"]').value.trim(),!l)return;const e=await v(l,r);$(e),e.totalHits>h?j():e.hits.length<h&&e.hits.length!==0&&(d(),m(`We're sorry, but you've reached the end of search results. Total images found: ${e.totalHits}.`)),p.reset(),f.disabled=!0}catch(e){console.log(e),m("Oops! Something went wrong. Please try again later.")}finally{q()}});
//# sourceMappingURL=index.js.map
