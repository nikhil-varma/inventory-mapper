import React, { useEffect, useState } from "react";
import { generateGroupData, getProductCountForImage } from "../utils";
import BoundingBox from "./BoundingBox";
import Table from "./Table";
import Toolbox from "./Toolbox";

const ImageMapper = (props) => {
  const { selectedImage, metadata, productMetadata } = props;
  const [visibleBoxes, setVisibleBoxes] = useState([]);

  const columns = [
    {
      Header: "Product Code",
      accessor: "code",
    },
    {
      Header: "Warehouse Count",
      accessor: "overallCount",
    },
    {
      Header: "Current count",
      accessor: "localisedCount",
    },
  ];

  useEffect(() => {
    setVisibleBoxes(metadata.map((box) => box.id));
  }, [metadata]);

  const handleVisibilityState = () => {
    if (visibleBoxes.length) {
      setVisibleBoxes([]);
    } else {
      setVisibleBoxes(metadata.map((box) => box.id));
    }
  };

  const mapBoundingBoxWith = (imageObject) => {
    const isSelectedBoxVisible = (id) => visibleBoxes.indexOf(id);

    const handleBoxState = (id) => {
      const index = isSelectedBoxVisible(id);
      if (index === -1) {
        setVisibleBoxes([...visibleBoxes, id]);
      } else {
        setVisibleBoxes(visibleBoxes.filter((i) => i !== id));
      }
    };

    return imageObject.map((box, idx) => {
      const [width, height] = box.imgSize;
      const [origins, offsets] = box.rect;
      console.log(box.className, box.code);
      return (
        <div key={`${selectedImage}-box-${idx}`}>
          <BoundingBox
            className={box.className}
            x={origins[0] * width}
            y={origins[1] * height}
            width={offsets[0] * width}
            height={offsets[1] * height}
            stroke={2}
            isVisible={isSelectedBoxVisible(box.id) !== -1}
            handleBoxState={() => handleBoxState(box.id)}
            code={box.code}
          />
        </div>
      );
    });
  };

  return (
    <div className="image-view">
      <Toolbox
        handleVisibilityState={handleVisibilityState}
        visibleBoxes={visibleBoxes}
      />
      <div className="bounding-boxes">{mapBoundingBoxWith(metadata)}</div>
      <img src={`images/${selectedImage}.jpg`} alt={selectedImage} />
      <Table
        data={getProductCountForImage(
          productMetadata,
          generateGroupData({ img: metadata })
        )}
        columns={columns}
      />
    </div>
  );
};

export default ImageMapper;
