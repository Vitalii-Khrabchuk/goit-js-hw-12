import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  makeMarkup,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ===================================================================

const form = document.querySelector('.form');
const submitBtn = document.querySelector('button[type=submit]');
const input = document.querySelector('input[name="search-text"]');
const btnLoadMore = document.querySelector('.js-load-more');

// ===================================================================

let searchWord;
let page = 1;
let total_pages = 0;
const perPage = 15;
submitBtn.disabled = true;

// ===================================================================

input.addEventListener('input', evt => {
  submitBtn.disabled = evt.target.value.trim() === '';
});
// ===================================================================

function scroll() {
  const lastItem = document.querySelector('.gallery .gallery-item:last-child');
  if (!lastItem) return;
  window.scrollBy({
    top: lastItem.getBoundingClientRect().height * 2,
    behavior: 'smooth',
  });
}
// ===================================================================

function notification(message) {
  iziToast.show({
    message: message,
    position: 'topRight',
    backgroundColor: 'rgb(255, 215, 163)',
  });
}

// ===================================================================

btnLoadMore.addEventListener('click', async evt => {
  showLoader();
  try {
    page += 1;
    const res = await getImagesByQuery(searchWord, page);

    total_pages = Math.ceil(res.totalHits / perPage);
    btnLoadMore.textContent = `Page: ${page} of ${total_pages}`;

    makeMarkup(res);

    if (page >= total_pages) {
      hideLoadMoreButton();
      notification(
        `We're sorry, but you've reached the end of search results. Total images found: ${res.totalHits}.`
      );
    }

    scroll();
  } catch (error) {
    console.log('error', error);
  } finally {
    hideLoader();
  }
});

// ===================================================================

form.addEventListener('submit', async evt => {
  btnLoadMore.textContent = 'Load more';
  hideLoadMoreButton();
  showLoader();
  try {
    page = 1;
    evt.preventDefault();
    clearGallery();

    searchWord = document
      .querySelector('input[name="search-text"]')
      .value.trim();

    if (!searchWord) {
      return;
    }

    const res = await getImagesByQuery(searchWord, page);

    makeMarkup(res);

    if (res.totalHits > perPage) {
      showLoadMoreButton();
    } else if (res.hits.length < perPage && res.hits.length !== 0) {
      hideLoadMoreButton();
      notification(
        `We're sorry, but you've reached the end of search results. Total images found: ${res.totalHits}.`
      );
    }

    form.reset();
    submitBtn.disabled = true;
  } catch (error) {
    console.log(error);
    notification(`Oops! Something went wrong. Please try again later.`);
  } finally {
    hideLoader();
  }
});
