import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos, userParams } from './js/unsplash-api';
import { renderMarkup } from './js/render-functions';

const gallery = document.querySelector('.js-gallery');
const form = document.querySelector('.js-search-form');
const loader = document.querySelector('.js-loader');
const loadMoreBtn = document.querySelector('.js-load-more');

iziToast.settings({
  progressBar: false,
  timeout: 4000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
});

const showLoader = () => {
  loader.classList.remove('is-hidden');
};

const hideLoader = () => {
  loader.classList.add('is-hidden');
};

const showBtn = () => {
  loadMoreBtn.classList.remove('is-hidden');
};

const hideBtn = () => {
  loadMoreBtn.classList.add('is-hidden');
};

const onSubmit = async e => {
  e.preventDefault();
  gallery.innerHTML = '';
  userParams.page = 1;
  showLoader();

  userParams.searchQuery =
    e.currentTarget.elements['user-search-query'].value.trim();

  if (userParams.searchQuery === '') {
    return alert('Empty query');
  }

  try {
    const { data } = await getPhotos();

    if (data.results.length === 0) {
      hideBtn();
      return iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }

    iziToast.info({
      message: `We found ${data.total} photos`,
    });

    gallery.innerHTML = renderMarkup(data.results);
    if (data.total > userParams.perPage) {
      showBtn();
    }
  } catch (error) {
    console.log(error);
  } finally {
    e.target.reset();
    hideLoader();
  }

  //   getPhotos(searchQuery)
  //     .then(({ data }) => {
  //       if (data.results.length === 0) {
  //         return alert(
  //           'Sorry, there are no images matching your search query. Please try again!'
  //         );
  //       }

  //       alert(`We found ${data.total} photos`);
  //       gallery.innerHTML = renderMarkup(data.results);
  //     })
  //     .catch(error => console.log(error))
  //     .finally(() => {
  //       e.target.reset();
  //       hideLoader();
  //     });
};

const onClick = async e => {
  userParams.page += 1;
  showLoader();
  try {
    const { data } = await getPhotos();
    gallery.insertAdjacentHTML('beforeend', renderMarkup(data.results));

    // Функція для скролл.

    const { height: cartHeight } = document
      .querySelector('.js-gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cartHeight * 2,
      behavior: 'smooth',
    });

    // Пошук останньої сторінки.

    const lastPage = Math.ceil(data.total / userParams.perPage);
    if (lastPage === userParams.page) {
      hideBtn();

      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

form.addEventListener('submit', onSubmit);

loadMoreBtn.addEventListener('click', onClick);
