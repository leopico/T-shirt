import { imageElements } from "@/constants/constant";
import { handleImageUpload } from "@/libs/shapes";
import React from "react";

function UploadSection({
  handleActiveElment,
  isActive,
  imageInputRef,
  fabricRef,
  shapeRef
}) {

  return (
    <div className="flex h-20 md:h-28 items-center justify-center space-x-4">
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
                  `w-8 md:w-12 h-8 md:h-12 bg-black hover:bg-black/85 rounded
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
