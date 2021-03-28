import React from "react";
import styled from "styled-components";

const BoundingDiv = styled.div.attrs((props) => ({
  style: {
    background: props.background,
    width: props.width,
    height: props.height,
    borderWidth: `${props.stroke}px`,
    borderColor: `${props.isVisible ? "#ff00c1" : "transparent"}`,
    left: `${props.x}px`,
    top: `${props.y}px`,
  },
}))`
  border-style: solid;
  cursor: pointer;
`;

const BoundingBox = (props) => {
  const {
    x,
    y,
    width,
    height,
    stroke = 1,
    className,
    handleBoxState,
    isVisible,
    code,
  } = props;
  return (
    <BoundingDiv
      isVisible={isVisible}
      onClick={handleBoxState}
      className={`bounding-rect ${className}`}
      x={x}
      y={y}
      width={width}
      height={height}
      stroke={stroke}
    >
      {code ? (
        <div className="box-code-container">
          {code && code !== "NA" ? (
            <div className="box-code">{code} </div>
          ) : null}
        </div>
      ) : null}
    </BoundingDiv>
  );
};

export default BoundingBox;
