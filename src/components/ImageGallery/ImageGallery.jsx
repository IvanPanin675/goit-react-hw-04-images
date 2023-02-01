import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import css from './imageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onImageClick }) => {
  const elements = images.map(({ id, webformatURL, largeImageURL }) => (
    <ImageGalleryItem
      key={id}
      previevImg={webformatURL}
      largeImageURL={largeImageURL}
      onImageClick={onImageClick}
    />
  ));
  return <ul className={css.imageGallery}>{elements}</ul>;
};

export default ImageGallery;

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.propType = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
