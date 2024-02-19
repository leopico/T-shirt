import React, { useRef, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import CropperModal from "./CropperModal";
import axios from "axios";

function UploadSection({ setFrontUploadImage, frontUploadImage, setLoading }) {
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

  const bgRemove = async () => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_REACT_APP_BG_REMOVE_KEY;
    const url = "https://api.remove.bg/v1.0/removebg";
    const formData = new FormData();

    formData.append(
      "image_file",
      frontUploadImage.image.withBackground,
    );

    formData.append("size", "auto");

    await axios
      .post(url, formData, {
        headers: {
          "X-Api-Key": apiKey,
        },
        responseType: "blob",
      })
      .then((res) => {
        console.log(`res: ${res}`);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFrontUploadImage((prevFrontUploadImage) => ({
            ...prevFrontUploadImage,
            image: {
              ...prevFrontUploadImage.image,
              noBackground: reader.result,
            },
          }));
        };
        setLoading(false);
        reader.readAsDataURL(res.data);
      })
      .catch((err) => {
        alert("Can't remove for your image!")
        setLoading(false);
        console.log(err);
      });
  };

  const toggleUploadBg = () => {
    if (!frontUploadImage.image.withBackground) return;

    if (!frontUploadImage.image.noBackground) {
      bgRemove();
    }
    setFrontUploadImage({
      ...frontUploadImage,
      background: !frontUploadImage.background,
    });
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
        {/* <small className="myFont text-[8px] md:text-[10px] flex">
          <span className="hidden sm:block">Click to select image...</span>
          <span>Please refresh the page when you upload new image!</span>
        </small> */}
        <p className="myFont text-[8px] md:text-[10px]">
          Please refresh the page when you upload new image!
          <span className="hidden sm:flex">Click to select image...</span> 
        </p>
        <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImgChange}
          />
      </div>
      <div className="mx-3 flex flex-col">
        {frontUploadImage.background ? (
          <button className="w-fit h-1/2 mx-auto" onClick={() => toggleUploadBg()}>
            background
          </button>
        ) : (
          <button className="w-fit h-1/2 mx-auto" onClick={() => toggleUploadBg()}>
            no background
          </button>
        )}
      </div>
    </div>
  );
}

export default UploadSection;
