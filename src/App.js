import React, { useState } from "react";
import Gallery from "./components/gallery/gallery.component";

const App = () => {
  const [dragId, setDragId] = useState();
  const [images, setImages] = useState([
    {
      id: 1,
      imageUrl: "./images/image-1.webp",
      order: 1,
    },
    {
      id: 2,
      imageUrl: "./images/image-2.webp",
      order: 2,
    },
    {
      id: 3,
      imageUrl: "./images/image-3.webp",
      order: 3,
    },
    {
      id: 4,
      imageUrl: "./images/image-4.webp",
      order: 4,
    },
    {
      id: 5,
      imageUrl: "./images/image-5.webp",
      order: 5,
    },
    {
      id: 6,
      imageUrl: "./images/image-6.webp",
      order: 6,
    },
    {
      id: 7,
      imageUrl: "./images/image-7.webp",
      order: 7,
    },
    {
      id: 8,
      imageUrl: "./images/image-8.webp",
      order: 8,
    },
    {
      id: 9,
      imageUrl: "./images/image-9.webp",
      order: 9,
    },
    {
      id: 10,
      imageUrl: "./images/image-10.jpeg",
      order: 10,
    },
    {
      id: 11,
      imageUrl: "./images/image-11.jpeg",
      order: 11,
    },
  ]);
  const handleDrag = (ev, id) => {
    setDragId(id);
    console.log(dragId);
    console.log(images);
  };

  const handleDrop = (ev) => {
    const dragBox = images.find((box) => box.id === dragId);
    var idc = ev.currentTarget.id;
    const dropBox = images.find((box) => String(box.id) === String(idc));
    if (dragBox && dropBox) {
      const dragBoxOrder = dragBox.order;
      const dropBoxOrder = dropBox.order;

      const newBoxState = images.map((box) => {
        var curV = ev.currentTarget.id;
        if (box.id === dragId) {
          box.order = dropBoxOrder;
          console.log("hi");
        }
        if (box.id === Number(curV)) {
          box.order = dragBoxOrder;
          console.log(box.order);
        }
        return box;
      });

      setImages(newBoxState);
      console.log(images);
    }
  };

  return (
    <div className="gallery-container">
      <Gallery
        images={images}
        handleDrag={handleDrag}
        handleDrop={handleDrop}
      />
    </div>
  );
};

export default App;
