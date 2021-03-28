import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 200px;
  height: 150px;
`;

const ThumbnailView = (props) => {
  const { images, selectedImage, handleImageSelection } = props;

  const getImageStateClass = (selectedImage, image) => {
    return selectedImage === image ? "active" : "";
  };

  return (
    <div className="gallery">
      {Object.keys(images).map((image) => (
        <div
          key={image}
          className={`image-thumbnail ${getImageStateClass(
            selectedImage,
            image
          )}`}
          onClick={() => handleImageSelection(image)}
        >
          <Image src={`images/${image}.jpg`} alt={image} />
        </div>
      ))}
    </div>
  );
};

export default ThumbnailView;
