import React from "react";

function SelectView({ view, setView, showView, setShowView }) {
  return (
    <div className="flex flex-col w-full">
      <button className="bgCol2" onClick={() => setShowView(!showView)}>
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
