import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from '../ImageGallery/ImageGallery.module.css';

export class ImageGalleryItem extends Component {
  state = { isModalOpen: false };
  closeModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { isModalOpen } = this.state;
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <div>
        <li className={css.galleryItem}>
                <img className={css.itemImage } src={webformatURL} alt={tags} onClick={this.closeModal} />
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              largeImageURL={largeImageURL}
              tags={tags}
              onClose={this.closeModal}
            />
          )}
        </li>
      </div>
    );
  }
}
