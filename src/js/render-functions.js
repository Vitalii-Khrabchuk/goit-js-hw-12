import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import sprite from '../img/icons.svg';

const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.js-load-more');

// ===========================================================

let lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

// ===========================================================

export function createGallery(images) {
  return images
    .map(function (img) {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = img;
      return `<li class="gallery-item">
            <div class="gallery-img-container">
            <a class="gallery-link" href="${largeImageURL}">
              <img class="image" src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}"  /></a>
            </div>
            <div class="desc-container">
              <ul class="desc-list">
              <li class="icons"><svg class="icon" width="24" height="24">
            <use href="${sprite}#icon-like"></use>
          </svg><span>${likes}</span></li>
              <li class="icons"><svg class="icon" width="24" height="24">
            <use href="${sprite}#icon-views"></use>
          </svg><span>${views}</span></li>
              <li class="icons"><svg class="icon" width="24" height="24">
            <use href="${sprite}#icon-comments"></use>
          </svg><span>${comments}</span></li>
              <li class="icons"><svg class="icon" width="24" height="24">
            <use href="${sprite}#icon-downloads"></use>
          </svg><span>${downloads}</span></li>
              </ul>
            </div>
          </li>`;
    })
    .join('');
}
// ===========================================================

export function makeMarkup(res) {
  if (!res.hits.length) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      backgroundColor: 'rgb(255, 215, 163)',
    });
    return;
  }

  const markup = createGallery(res.hits);
  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
// ===========================================================

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-shown');
}

export function hideLoader() {
  loader.classList.remove('is-shown');
}

export function showLoadMoreButton() {
  btnLoadMore.classList.add('btn-is-shown');
}

export function hideLoadMoreButton() {
  btnLoadMore.classList.remove('btn-is-shown');
}