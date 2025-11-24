import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalPages = 0;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();

  currentQuery = event.target.elements['search-text'].value.trim();

  if (!currentQuery) return;

  currentPage = 1;
  clearGallery();
  hideLoadMore();
  await fetchImages({ isLoadMore: false });
}

async function onLoadMore() {
  if (currentPage >= totalPages) return;

  currentPage += 1;
  await fetchImages({ isLoadMore: true });
}

async function fetchImages({ isLoadMore = false } = {}) {
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);

    if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
      if (currentPage === 1) {
        iziToast.error({
          title: 'Sorry, no images found. Try a different query!',
          position: 'topRight',
        });
        hideLoadMore();
        return;
      } else {
        hideLoadMore();
        iziToast.info({
          title: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
        return;
      }
    }
    createGallery(data.hits);
    const totalHits = Number.isFinite(data.totalHits) ? data.totalHits : 0;
    totalPages = Math.ceil(totalHits / perPage) || 0;

    if (currentPage < totalPages) {
      showLoadMore();
    } else {
      hideLoadMore();
      if (currentPage !== 1) {
        iziToast.info({
          title: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    }

    if (isLoadMore) {
      doSmoothScroll();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error loading images',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function doSmoothScroll() {
  const firstItem = document.querySelector('.gallery-item');
  if (!firstItem) return;

  const cardHeight = firstItem.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
