import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      img => `
    <li class="gallery-item">
      <a href="${img.largeImageURL}">
        <img
          src="${img.webformatURL}"
          alt="${img.tags}"
          loading="lazy"
        />
        <div class="image-info">
          <ul class="image-info-list">
            <li><p>Likes</p><span>${img.likes}</span></li>
            <li><p>Views</p><span>${img.views}</span></li>
            <li><p>Comments</p><span>${img.comments}</span></li>
            <li><p>Downloads</p><span>${img.downloads}</span></li>
          </ul>
        </div>
      </a>
    </li>
  `
    )
    .join('');

  galleryList.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('active');
}

export function hideLoader() {
  loader.classList.remove('active');
}

export function smoothScroll() {
  const firstCard = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;

  window.scrollBy({
    top: firstCard * 2,
    behavior: 'smooth',
  });
}
