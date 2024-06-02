export const renderMarkup = arr => {
  return arr
    .map(
      ({ urls, description }) => `<li class="gallery__item">
        <img src="${urls.small}" alt="${description}">
    </li>`
    )
    .join('');
};
