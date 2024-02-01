import React from "react";

function SelectView({ view, setView, showView, setShowView }) {
  return (
    <div className="absolute flex flex-col left-0 m-3">
      <button className=" bgCol2 px-3" onClick={() => setShowView(!showView)}>
        {view} v
      </button>
      {showView && (
        <>
          <button
            onClick={() => {
              setView("front");
              setShowView(false);
            }}
          >
            front
          </button>
          <button
            onClick={() => {
              setView("back");
              setShowView(false);
            }}
          >
            back
          </button>
        </>
      )}
    </div>
  );
}

export default SelectView;
