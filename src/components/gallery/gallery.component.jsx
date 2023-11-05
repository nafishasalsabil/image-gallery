import "./gallery.styles.scss";
import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Gallery = ({ images, handleDrag, handleDrop }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  var [imagesAll, setImages] = useState([]);
  imagesAll = imagesAll.slice().sort((a, b) => a.order - b.order);
  console.log(images);

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
    console.log(imagesAll);
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
  // return (
  //   <div className="container-fluid">
  //     <div className="row mt-3 mb-4 px-2">
  //       <div className="col col-lg-6">
  //         <h2 className="title">Image Gallery</h2>
  //         <span className="file-num">
  //           {selectedImages.length === 1
  //             ? selectedImages.length + " file selected"
  //             : selectedImages.length + " files selected"}
  //         </span>
  //         <span className="clicked-file">(Click on the image to select)</span>
  //       </div>
  //       <div className="col col-lg-6">
  //         <button
  //           className="btn btn-outline-dark mx-1"
  //           onClick={handleSelectAll}
  //         >
  //           {selectedImages.length > 0 ? "Clear Selection" : "Select All"}
  //         </button>
  //         {selectedImages.length > 0 && (
  //           <button
  //             className="btn btn-outline-danger mx-1"
  //             onClick={handleDeleteSelected}
  //           >
  //             Delete Selected Items
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //     <ResponsiveMasonry
  //       columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
  //     >
  //       <Masonry columnsCount={4} gutter="2px" position="center">
  //         {imagesAll
  //           .map((item, index) => (
  //           <label className="image-label">
  //             <div
  //                   className={`masonry-item ${
  //           selectedImages.includes(item.id) ? "selected" : ""
  //         } ${index === 0 ? "first-column" : ""}`}
  //             >
  //               <div className="image-container" key={item.id}>
  //                 <input
  //                   type="checkbox"
  //                   checked={selectedImages.includes(item.id)}
  //                   onChange={() => handleImageClick(item.id)}
  //                   style={{ display: "none" }}
  //                 />
  //                 <img
  //                   src={item.imageUrl}
  //                   alt=""
  //                   id={item.id}
  //                   className={`gallery-image ${
  //                     getColumnNumber(index, 11) === 4 ? "big-image" : ""
  //                   }`}
  //                   draggable={true}
  //                   onDragStart={(ev) => handleDrag(ev, item.id)}
  //                   onDragOver={(ev) => ev.preventDefault()}
  //                   onDrop={(ev) => handleDrop(ev)}
  //                 />
  //               </div>
  //             </div>
  //           </label>
  //         ))}
  //       </Masonry>
  //     </ResponsiveMasonry>
  //   </div>
  // );
  return(<div>
  <div class="container-fluid first">

     <div className="row mt-3 mb-4 px-2">
         <div className="col col-lg-6">
           <h2 className="title">Image Gallery</h2>
           <span className="file-num">
             {selectedImages.length === 1
               ? selectedImages.length + " file selected"
               : selectedImages.length + " files selected"}
/         </span>
           <span className="clicked-file">(Click on the image to select)</span>
         </div>
         <div className="col col-lg-6">
           <button
             className="btn btn-outline-dark mx-1"
             onClick={handleSelectAll}
           >
             {selectedImages.length > 0 ? "Clear Selection" : "Select All"}
           </button>
           {selectedImages.length > 0 && (
             <button
             className="btn btn-outline-danger mx-1"
               onClick={handleDeleteSelected}
             >
               Delete Selected Items
             </button>
           )}
         </div>
      </div></div>
      <div class="container-fluid second">
   {imagesAll.map((item, index) => (
  
    <div className={`item ${
            selectedImages.includes(item.id) ? "selected" : ""}`}>
              <label className="image-label">
            <div className="image-container">
            <input
                    type="checkbox"
                    checked={selectedImages.includes(item.id)}
                    onChange={() => handleImageClick(item.id)}
                    style={{ display: "none" }}
                    draggable={true}
                    onDragStart={(ev) => handleDrag(ev, item.id)}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDrop={(ev) => handleDrop(ev)}
                  />
      <img className="gallery-image" src={item.imageUrl} alt=""/>
      </div>
      </label>
    </div>
  
   ))}
  
    </div>
    </div>
  );

  function getColumnNumber(index, numColumns) {
    return Math.floor(index / (images.length / numColumns)) + 1;
  }
};

export default Gallery;
