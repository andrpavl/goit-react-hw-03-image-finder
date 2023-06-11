import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { images } = this.props;
    return (
      <ul className="gallery">
        {images &&
          images.map(image => (
            <ImageGalleryItem key={image.id} image={image} />
          ))}
      </ul>
    );
  }
}
