import React, { useRef, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import CropperModal from "./CropperModal";


function UploadSection({ setFrontUploadImage }) {
  const [src, setSrc] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);

  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleImgChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <CropperModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          src={src}
          setFrontUploadImage={setFrontUploadImage}
        />
        <a href="/" onClick={handleInputClick}>
          <FcAddImage className="w-14 h-14 md:w-20 md:h-20 p-2"/>
        </a>
        <small className="myFont text-[8px] md:text-[10px]">Click to select image</small>
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImgChange}
          />
      </div>
    </div>
  );
}

export default UploadSection;
