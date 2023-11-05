import "./gallery.styles.scss";
import React, { useState, useEffect } from "react";

const Gallery = ({ images, handleDrag, handleDrop }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  var [imagesAll, setImages] = useState([]);
  imagesAll = imagesAll.slice().sort((a, b) => a.order - b.order);

  const handleSelectAll = () => {
    if (selectedImages.length > 0) {
      setSelectedImages([]);
    } else {
      setSelectedImages(imagesAll.map((item) => item.id));
    }
  };

  const handleDeleteSelected = () => {
    const remainingImages = imagesAll.filter(
      (item) => !selectedImages.includes(item.id)
    );
    setImages(remainingImages);
    setSelectedImages([]);
    imagesAll.forEach((item, index) => {
      item.order = index + 1;
    });
  };

  useEffect(() => {
    setImages(images);
  }, []);

  const handleImageClick = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };
  return (
    <div>
      <div class="container first">
        <div className="row mt-5 mb-4 px-2">
          <div className="col col-lg-6">
            <h2 className="title">Image Gallery</h2>
            <span className="file-num">
              {selectedImages.length === 1
                ? selectedImages.length + " file selected"
                : selectedImages.length + " files selected"}
            </span>
            <span className="clicked-file">(Click on the image to select)</span>
          </div>
          <div className="col col-lg-6">
            <button
              className="btn btn-outline-dark mx-1 mt-2"
              onClick={handleSelectAll}
            >
              {selectedImages.length > 0 ? "Clear Selection" : "Select All"}
            </button>
            {selectedImages.length > 0 && (
              <button
                className="btn btn-outline-danger mx-1 mt-2"
                onClick={handleDeleteSelected}
              >
                Delete Selection
              </button>
            )}
          </div>
        </div>
      </div>
      <div class="container-xl second">
        {imagesAll.map((item, index) => (
          <div
            className={`item ${
              selectedImages.includes(item.id) ? "selected" : ""
            }`}
          >
            <label className="image-label">
              <div className="image-container">
                <input
                  type="checkbox"
                  checked={selectedImages.includes(item.id)}
                  onChange={() => handleImageClick(item.id)}
                  style={{ display: "none" }}
                />
                <img
                  className="gallery-image"
                  src={item.imageUrl}
                  alt=""
                  id={item.id}
                  draggable={true}
                  onDragStart={(ev) => handleDrag(ev, item.id)}
                  onDragOver={(ev) => ev.preventDefault()}
                  onDrop={(ev) => handleDrop(ev)}
                />
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
