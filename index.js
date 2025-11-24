import{a as g,S as L,i as l}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const w="https://pixabay.com/api/",v="53337460-da8d4afc1a3151b07a1e25c69";async function b(o,t=1){const r={key:v,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};return(await g.get(w,{params:r})).data}const m=document.querySelector(".gallery"),y=document.querySelector(".loader"),S=new L(".gallery a",{captionsData:"alt",captionDelay:250});function q(o){const t=o.map(r=>`
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
  `).join("");m.insertAdjacentHTML("beforeend",t),S.refresh()}function P(){m.innerHTML=""}function M(){y.classList.add("active")}function u(){y.classList.remove("active")}function R(){const o=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}const $=document.querySelector(".form"),E=document.querySelector(".load-more"),c=document.querySelector(".load-more-wrapper");let d="",s=1;const p=15;let f=0;$.addEventListener("submit",O);E.addEventListener("click",x);async function O(o){o.preventDefault(),P(),c.classList.add("hidden"),d=o.target.elements["search-text"].value.trim(),s=1,d&&await h(!1)}async function x(){s+=1,await h(!0)}async function h(o=!1){M();try{const t=await b(d,s,p);if(u(),t.hits.length===0){l.error({title:"Sorry, no images found. Try again!",position:"topRight"});return}q(t.hits),f=Math.ceil(t.totalHits/p),s<f?c.classList.remove("hidden"):(c.classList.add("hidden"),s!==1&&l.info({title:"We're sorry, but you've reached the end of search results.",position:"topRight"})),o&&R()}catch(t){u(),console.error(t),l.error({title:"Error loading images",position:"topRight"})}}
//# sourceMappingURL=index.js.map
