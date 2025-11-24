import{a as h,S as g,i as l}from"./assets/vendor-DvfmeZXB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const L="https://pixabay.com/api/",w="53337460-da8d4afc1a3151b07a1e25c69";async function v(o,t=1){const r={key:w,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};return(await h.get(L,{params:r})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),b=new g(".gallery a",{captionsData:"alt",captionDelay:250});function S(o){const t=o.map(r=>`
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
  `).join("");f.insertAdjacentHTML("beforeend",t),b.refresh()}function q(){f.innerHTML=""}function M(){m.classList.add("active")}function c(){m.classList.remove("active")}const P=document.querySelector(".form"),R=document.querySelector(".load-more"),d=document.querySelector(".load-more-wrapper");let u="",s=1,p=0;P.addEventListener("submit",$);R.addEventListener("click",E);async function $(o){o.preventDefault(),q(),d.classList.add("hidden"),u=o.target.elements["search-text"].value.trim(),s=1,u&&await y()}async function E(){s+=1,await y(!0)}async function y(o=!1){M();try{const t=await v(u,s);if(t.hits.length===0){c(),l.error({title:"Sorry, no images found. Try again!",position:"topRight"});return}S(t.hits),c(),p=Math.ceil(t.totalHits/15),s<p?d.classList.remove("hidden"):(d.classList.add("hidden"),l.info({title:"We're sorry, but you've reached the end of search results.",position:"topRight"})),o&&O()}catch(t){c(),console.error(t),l.error({title:"Error loading images",position:"topRight"})}}function O(){const o=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
