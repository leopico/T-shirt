import React, { useState } from "react";
import axios from "axios";

function UploadSection({ frontUploadImage, setFrontUploadImage, setLoading }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // getS3Link(file);

    setFrontUploadImage((prevFrontUploadImage) => ({
      ...prevFrontUploadImage,
      image: {
        ...prevFrontUploadImage.image,
        withBackground: file,
      },
    }));
  };

  const bgRemove = () => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_REACT_APP_BG_REMOVE_KEY;
    const url = "https://api.remove.bg/v1.0/removebg";
    const formData = new FormData();

    formData.append(
      "image_file",
      frontUploadImage.image.withBackground,
      frontUploadImage.image.withBackground.name
    );
    formData.append("size", "auto");

    axios
      .post(url, formData, {
        headers: {
          "X-Api-Key": apiKey,
        },
        responseType: "blob",
      })
      .then((res) => {
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
      .catch((err) => console.log(err));
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
      <label className="text-violet-600 p-2">
        Upload Image
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      {selectedFile && (
        <div className="ml-4">
          <span className="font-bold">{selectedFile.name}</span>
        </div>
      )}
      <div className="mx-3 flex flex-col">
        {frontUploadImage.background ? (
          <button className="w-fit h-1/2 mx-auto" onClick={toggleUploadBg}>
            background
          </button>
        ) : (
          <button className="w-fit h-1/2 mx-auto" onClick={toggleUploadBg}>
            no background
          </button>
        )}
      </div>
    </div>
  );
}

export default UploadSection;
