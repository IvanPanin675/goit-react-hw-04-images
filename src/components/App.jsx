import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

import Modal from './Modal/Modal';

import ImageGallery from './ImageGallery/ImageGallery';

import { searchImage } from '../shared/services/image-api';

import Loader from './Loader/Loader';

import Button from './Button/Button';

export class App extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImage();
    }
  }

  async fetchImage() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchImage(search, page);
      this.setState(({ images }) => ({ images: [...images, ...data.hits] }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  searchImage = ({ search }) => {
    this.setState({ search, images: [], page: 1 });
  };

  onImageClick = data => {
    this.setState({
      largeImageURL: data,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  render() {
    const { loading, images, largeImageURL, showModal } = this.state;
    const { searchImage, onImageClick, closeModal, loadMore } = this;
    return (
      <>
        <Searchbar onSubmit={searchImage} />
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
}
