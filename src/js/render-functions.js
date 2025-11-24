// createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
// clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
// showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
// hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export function createGallery(images) {
  const markup = images
    .map(imageInfo => {
      return `
    <li class="gallery-item">
      <a href="${imageInfo.largeImageURL}">
        <img
          src="${imageInfo.webformatURL}"
          alt="${imageInfo.tags}"
          loading="lazy"
        />
        <div class="image-info">
          <ul class="image-info-list">
            <li class="image-info-item">
              <p>Likes</p>
              <span>${imageInfo.likes}</span>
            </li>
            <li class="image-info-item">
              <p>Views</p>
              <span>${imageInfo.views}</span>
            </li>
            <li class="image-info-item">
              <p>Comments</p>
              <span>${imageInfo.comments}</span>
            </li>
            <li class="image-info-item">
              <p>Downloads</p>
              <span>${imageInfo.downloads}</span>
            </li>
          </ul>
        </div>
      </a>
    </li>
      `;
    })
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
