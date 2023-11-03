import './gallery.styles.scss';
import React, { useState,useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';



const Gallery = ({ images }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesAll, setImages] = useState([]);

  const handleSelectAll = () => {
    if (selectedImages.length > 0) {
      // If all images are already selected, clear the selection
      setSelectedImages([]);
    } else {
      // Otherwise, select all images
      setSelectedImages(imagesAll.map((item) => item.id));
    }
  };

  const handleDeleteSelected = () => {
    const remainingImages = imagesAll.filter((item) => !selectedImages.includes(item.id));
    console.log(remainingImages);
    setImages(remainingImages);
    setSelectedImages([]);
  };
  
  useEffect(() => {
    setImages(images);
  }, [])

  const handleImageClick = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    // console.log(result.destination);
    else if(result.destination){
      const reorderedImages = reorder(
        imagesAll,
        result.source.index,
        result.destination.index
      );
      setImages(reorderedImages);
    }
  
   
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container-fluid">
        <div className="row mt-3 mb-4 px-2">
          <div className="col col-lg-6">
            <h2 className='title'>Image Gallery</h2>
            <h5>{selectedImages.length} files selected</h5>
          </div>
          <div className="col col-lg-6">
            <button className='btn btn-outline-dark mx-1' onClick={handleSelectAll}>
              {selectedImages.length > 0 ? "Clear Selection" : "Select All"}
            </button>
            {selectedImages.length > 0 && (
              <button className='btn btn-outline-danger mx-1' onClick={handleDeleteSelected}>
                Delete Selected Items
              </button>
            )}
          </div>
        </div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
          <Droppable  droppableId="image-gallery" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="masonry-container"
              >
                <Masonry columnsCount={4} gutter="2px" position="center">
                  {imagesAll.map((item, index) => (
                    <label className="image-label">
                <div
                          className={`masonry-item ${selectedImages.includes(item.id) ? 'selected' : ''}`}
                        >
                        
                          <Draggable key={String(item.id)} draggableId={String(item.id)} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                    
                              className='image-container'
                              key={item.id}
                            >
                              <input
                                type="checkbox"
                                checked={selectedImages.includes(item.id)}
                                onChange={() => handleImageClick(item.id)}
                                style={{ display: 'none' }}
                              />
                              <img
                                src={item.imageUrl}
                                alt=""
                                className={`gallery-image ${getColumnNumber(index, 11) === 4 ? 'big-image' : ''}`}
                              />
                            </div>
                            )}
                    </Draggable>
                         
                        </div>
                        </label>
                    
                  ))}
                </Masonry>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ResponsiveMasonry>
      </div>
    </DragDropContext>
  );

  function getColumnNumber(index, numColumns) {
    return Math.floor(index / (images.length / numColumns)) + 1;
  }
};

export default Gallery;
