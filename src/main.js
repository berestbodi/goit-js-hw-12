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

const onFormSubmit = event => {
  event.preventDefault();
  const form = event.target;

  clearGallery();
  showLoader();

  const query = form.elements['search-text'].value.trim();

  getImagesByQuery(query)
    .then(response => {
      if (!response.total) {
        hideLoader();
        iziToast.error({
          title:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      hideLoader();
      createGallery(response.hits);
    })
    .catch(err => {
      hideLoader();
      iziToast.error({
        title: 'An error occurred while fetching images. Please try again!',
        position: 'topRight',
      });
      console.error(err);
    });
};

form.addEventListener('submit', onFormSubmit);
