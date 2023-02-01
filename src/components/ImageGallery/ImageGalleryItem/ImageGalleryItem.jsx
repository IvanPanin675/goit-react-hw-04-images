import css from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ previevImg, largeImageURL, onImageClick }) => {
  return (
    <li
      className={css.imageGalleryItem}
      onClick={() => {
        onImageClick(largeImageURL);
      }}
    >
      {' '}
      <img src={previevImg} className={css.imageGalleryItemImage} alt=""></img>
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  preview: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
