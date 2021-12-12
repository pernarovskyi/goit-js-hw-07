import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

// galleryContainer.addEventListener('click', onGalleryContainerClick);

const instance = basicLightbox.create(`<img src="" />`);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
             class="gallery__image"
             src="${preview}"
             data-source="${original}"
             alt="${description}"
           />
        </a>
      </div>`;
    })
    .join('');
}

function onGalleryContainerClick(e) {
  e.preventDefault();

  const isElementWithOriginalImgSrc = e.target.classList.contains('gallery__image');

  if (!isElementWithOriginalImgSrc) {
    return;
  }

  onOpenModalWindow(e);
}

function onOpenModalWindow(e) {
  let modalImage = instance.element().querySelector('img');
  modalImage.src = e.target.dataset.source;

  instance.show();

  window.addEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(e) {
  if (!(e.code === 'Escape')) {
    return;
  }

  instance.close();

  window.removeEventListener('keydown', onEscKeyPress);
}
