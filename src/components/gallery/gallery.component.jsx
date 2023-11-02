import './gallery.styles.scss';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { Row, Col } from 'react-bootstrap';

const Gallery = ({ images }) => {

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
      <Masonry
        columnsCount={5}
        gutter="2px"
        position="center"
      >
        {images.map((item, index) => (
          <div
            className="image-container"
            key={item.id}
          >
            <img
              src={item.imageUrl}
              alt=""
              className={`gallery-image ${getColumnNumber(index, 11) === 4 ? 'big-image' : ''}`}
            />
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );

  function getColumnNumber(index, numColumns) {
    return Math.floor(index / (images.length / numColumns)) + 1;
  }
};



export default Gallery;
