import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export function ImageGallery(props) {
  const { images } = props;

  return (
    <>
      <ul className={css.gallery}>
        {images?.map(image => (
          <ImageGalleryItem key={image.id} image={image} />
        ))}
      </ul>
    </>
  );
}
