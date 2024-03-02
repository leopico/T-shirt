import { imageElements } from "@/constants/constant";
import { bgRemove, handleImageUpload } from "@/libs/shapes";
import React, { useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";

function UploadSection({
  handleActiveElment,
  isActive,
  imageInputRef,
  fabricRef,
  shapeRef,
}) {
  const [loader, setLoader] = useState(false);

  const handleRemoveBg = async () => {
    await bgRemove({ fabricRef, shapeRef, setLoader });
  }

  return (
    <div className="flex h-36 items-center justify-center space-x-4">
      <ul className="flex space-x-2 md:space-x-4">
        {
          imageElements.map((item) => (
            <li key={item.name}
              onClick={() => {
                if (Array.isArray(item.value)) return;
                handleActiveElment(item);
              }}
            >
              <button
                className={
                  `w-8 md:w-12 h-8 md:h-12 bg-black hover:bg-black/90 rounded
                        ${isActive(item.value) && "bg-black/85"}
                      `}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className=" p-2 md:p-4 object-center"
                />
              </button>
            </li>
          ))
        }
        <div onClick={handleRemoveBg}>
          <button className="w-8 md:w-12 h-8 md:h-12 bg-black/90 hover:bg-black rounded">
            {
              loader ? (

                <CircleLoader size={15} color="green" />
              ) : (
                <img
                  src="/assets/eraser.svg"
                  alt="bg-remove"
                  className="p-2 object-center"
                />
              )
            }
          </button>
        </div>
      </ul>
      <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        accept="image/*"
        onChange={(e) => {
          e.stopPropagation();
          handleImageUpload({
            file: e.target.files[0],
            canvas: fabricRef,
            shapeRef,
          })
        }}
      />
    </div>
  );
}

export default UploadSection;
