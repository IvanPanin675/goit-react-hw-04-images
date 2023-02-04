import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

import Modal from './Modal/Modal';

import ImageGallery from './ImageGallery/ImageGallery';

import { searchImage } from '../shared/services/image-api';

import Loader from './Loader/Loader';

import Button from './Button/Button';

export function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        const data = await searchImage(search, page);
        setImages(prevState => [...prevState, ...data.hits]);
      } catch(error) {console.log(error.message)
      } finally {
        setLoading(false);
      }
    };

    if (search === '') {
      return;
    }

    fetchImage();

  }, [search, page, setLoading, setImages]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const searchImages = searchIm => {
    setSearch(searchIm);
    setImages([]);
    setPage(1);
  };

  const onImageClick = data => {
    setLargeImageURL(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={searchImages} />
      {Boolean(images.length) && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}
      {loading && <Loader />}
      {Boolean(images.length) && !loading && (
        <Button loadMore={loadMore}>Load more</Button>
      )}
      {showModal && (
        <Modal close={closeModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
}
