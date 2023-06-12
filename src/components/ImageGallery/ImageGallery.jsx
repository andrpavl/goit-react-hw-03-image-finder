import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import css from './ImageGallery.module.css'
export class ImageGallery extends Component {
  render() {
    const imgId = nanoid();
    const { images } = this.props;
    return (
      <>
        <ul className={css.gallery}>
          {images &&
            images.map(image => <ImageGalleryItem key={imgId} image={image} />)}
        </ul>
      </>
    );
  }
}
