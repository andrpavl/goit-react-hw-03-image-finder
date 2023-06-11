import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = { isModalOpen: false };

  closeModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };
  render() {
    const { isModalOpen } = this.state;
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;

    return (
      <div>
        <li className="gallery-item">
          <img src={webformatURL} alt={tags} onClick={this.closeModal} />
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
