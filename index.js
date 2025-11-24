import{a as L,S as b,i as s}from"./assets/vendor-DvfmeZXB.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function r(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(t){if(t.ep)return;t.ep=!0;const i=r(t);fetch(t.href,i)}})();const w="https://pixabay.com/api/",v="53337460-da8d4afc1a3151b07a1e25c69";async function S(o,e=1){const r={key:v,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e};return(await L.get(w,{params:r})).data}const y=document.querySelector(".gallery"),h=document.querySelector(".loader"),l=document.querySelector(".load-more-wrapper"),c=document.querySelector(".load-more"),M=new b(".gallery a",{captionsData:"alt",captionDelay:250});function q(o){const e=o.map(r=>`
    <li class="gallery-item">
      <a href="${r.largeImageURL}">
        <img
          src="${r.webformatURL}"
          alt="${r.tags}"
          loading="lazy"
        />
        <div class="image-info">
          <ul class="image-info-list">
            <li><p>Likes</p><span>${r.likes}</span></li>
            <li><p>Views</p><span>${r.views}</span></li>
            <li><p>Comments</p><span>${r.comments}</span></li>
            <li><p>Downloads</p><span>${r.downloads}</span></li>
          </ul>
        </div>
      </a>
    </li>
  `).join("");y.insertAdjacentHTML("beforeend",e),M.refresh()}function P(){y.innerHTML=""}function R(){h.classList.add("active")}function $(){h.classList.remove("active")}function A(){l&&(l.classList.remove("hidden"),c&&(c.disabled=!1))}function n(){l&&(l.classList.add("hidden"),c&&(c.disabled=!0))}const B=document.querySelector(".form"),E=document.querySelector(".load-more");let f="",a=1;const m=15;let p=0;B.addEventListener("submit",H);E.addEventListener("click",I);async function H(o){if(o.preventDefault(),f=o.target.elements["search-text"].value.trim(),!f){s.warning({title:"Please enter a search query.",position:"topRight"});return}a=1,P(),n(),await g({isLoadMore:!1})}async function I(){a>=p||(a+=1,await g({isLoadMore:!0}))}async function g({isLoadMore:o=!1}={}){R();try{const e=await S(f,a,m);if(!e||!Array.isArray(e.hits)||e.hits.length===0)if(a===1){s.error({title:"Sorry, no images found. Try a different query!",position:"topRight"}),n();return}else{n(),s.info({title:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}q(e.hits);const r=Number.isFinite(e.totalHits)?e.totalHits:0;p=Math.ceil(r/m)||0,a<p?A():(n(),a!==1&&s.info({title:"We're sorry, but you've reached the end of search results.",position:"topRight"})),o&&O()}catch(e){console.error(e),s.error({title:"Error loading images",position:"topRight"})}finally{$()}}function O(){const o=document.querySelector(".gallery-item");if(!o)return;const e=o.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
