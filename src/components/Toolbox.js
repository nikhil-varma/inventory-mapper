import React from "react";

const Toolbox = (props) => {
  const { handleVisibilityState, visibleBoxes } = props;
  return (
    <div className="image-view-toolbox">
      <button onClick={handleVisibilityState}>
        {visibleBoxes.length ? "Hide" : "Show"} All boxes
      </button>
    </div>
  );
};

export default Toolbox;
