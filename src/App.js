import logo from './logo.svg';
import React from 'react';
import Gallery from './components/gallery/gallery.component';

const App = () => {
  const images = [
    {
      id: 1,
      imageUrl: '/images/image-1.webp',
    },
    {
      id: 2,
      imageUrl: '/images/image-2.webp',
    },{
      id: 3,
      imageUrl: '/images/image-3.webp',
    },{
      id: 4,
      imageUrl: '/images/image-4.webp',
    },{
      id: 5,
      imageUrl: '/images/image-5.webp',
    },{
      id: 6,
      imageUrl: '/images/image-6.webp',
    },{
      id: 7,
      imageUrl: '/images/image-7.webp',
    },{
      id: 8,
      imageUrl: '/images/image-8.webp',
    },{
      id: 9,
      imageUrl: '/images/image-9.webp',
    },{
      id: 10,
      imageUrl: '/images/image-10.jpeg',
    },{
      id: 11,
      imageUrl: '/images/image-11.jpeg',
    },
  ];
  return (
    <div className='gallery-container'>
      {/* {images.map((item) => ( // No need to destructure here
        <Gallery key={item.id} item={item} /> // Pass the entire item object
      ))} */}
      <Gallery images={images} />
      
    </div>
  );
}

export default App;
