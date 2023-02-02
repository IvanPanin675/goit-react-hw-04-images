import { useState, useEffect, useRef } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

import Modal from './Modal/Modal';

import ImageGallery from './ImageGallery/ImageGallery';

import { searchImage } from '../shared/services/image-api';

import Loader from './Loader/Loader';

import Button from './Button/Button';

export function App () {
  const [search, setSearch] = useState('');
  const searchRef = useRef(search);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageRef = useRef(page);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  // state = {
  //   search: '',
  //   images: [],
  //   loading: false,
  //   error: null,
  //   page: 1,
  //   showModal: false,
  //   largeImageURL: '',
  // };

  useEffect(() => { 
      if (searchRef !== search || pageRef !== page) {
        fetchImage();
        searchRef.current = search;
        pageRef.current = page;
    }
  },[search, page])
  
  // componentDidUpdate(prevProps, prevState) {
  //   const { search, page } = this.state;
  //   if (prevState.search !== search || prevState.page !== page) {
  //     this.fetchImage();
  //   }
  // }

  async function fetchImage () {
    try {
      setLoading(true);
      const data = await searchImage(search, page);
      setImages([...images, ...data.hits]);
    } catch (error) {
      setError(error.message);
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const loadMore = () => {
    setPage(page + 1);
  };

  const searchImages = ({ search }) => {
    setSearch(search)
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
        <Searchbar onSubmit={()=>searchImages()} />
        {Boolean(images.length) && <ImageGallery images={images} onImageClick={onImageClick} />}
        {loading && <Loader/>}
        {(Boolean(images.length) && !loading) && (
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
