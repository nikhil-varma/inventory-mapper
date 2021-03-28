import React, { useEffect, useState } from "react";

import "./App.scss";
import ImageMapper from "./components/ImageMapper";
import ThumbnailView from "./components/ThumbnailView";
import { generateGroupData } from "./utils";

function App() {
  const [inventoryData, setInventoryData] = useState({});
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/inventory/")
      .then((res) => res.json())
      .then((res) => {
        setInventoryData(res);
      });
  }, []);

  const handleImageSelection = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="App">
      <div className="thumbnails-container">
        <ThumbnailView
          images={inventoryData}
          handleImageSelection={handleImageSelection}
          selectedImage={selectedImage}
        />
      </div>
      <div className="image-container">
        {selectedImage ? (
          <ImageMapper
            metadata={inventoryData[selectedImage]}
            selectedImage={selectedImage}
            productMetadata={generateGroupData(inventoryData)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
