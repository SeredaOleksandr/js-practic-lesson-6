import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos } from './js/unsplash-api';
import { renderMarkup } from './js/render-functions';

const gallery = document.querySelector('.js-gallery');
const form = document.querySelector('.js-search-form');
const loader = document.querySelector('.js-loader');

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

const onSubmit = async e => {
  e.preventDefault();
  gallery.innerHTML = '';
  showLoader();

  const searchQuery =
    e.currentTarget.elements['user-search-query'].value.trim();

  if (searchQuery === '') {
    return alert('Empty query');
  }

  try {
    const { data } = await getPhotos(searchQuery);

    if (data.results.length === 0) {
      return iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }

    iziToast.info({
      message: `We found ${data.total} photos`,
    });

    gallery.innerHTML = renderMarkup(data.results);
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
form.addEventListener('submit', onSubmit);
