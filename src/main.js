import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const loadMoreWrapper = document.querySelector('.load-more-wrapper');

let currentQuery = '';
let currentPage = 1;
let totalPages = 0;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();
  clearGallery();
  loadMoreWrapper.classList.add('hidden');

  currentQuery = event.target.elements['search-text'].value.trim();
  currentPage = 1;

  if (!currentQuery) return;

  await fetchImages();
}

async function onLoadMore() {
  currentPage += 1;
  await fetchImages(true);
}

async function fetchImages(isLoadMore = false) {
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      hideLoader();
      iziToast.error({
        title: 'Sorry, no images found. Try again!',
        position: 'topRight',
      });
      return;
    }
    createGallery(data.hits);
    hideLoader();

    totalPages = Math.ceil(data.totalHits / 15);

    if (currentPage < totalPages) {
      loadMoreWrapper.classList.remove('hidden');
    } else {
      loadMoreWrapper.classList.add('hidden');
      iziToast.info({
        title: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    if (isLoadMore) smoothScroll();
  } catch (error) {
    hideLoader();
    console.error(error);
    iziToast.error({
      title: 'Error loading images',
      position: 'topRight',
    });
  }
}

function smoothScroll() {
  const firstCard = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;

  window.scrollBy({
    top: firstCard * 2,
    behavior: 'smooth',
  });
}
