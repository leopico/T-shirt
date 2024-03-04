import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { bgRemove } from "@/libs/shapes";
import CircleLoader from "react-spinners/CircleLoader";

function AiSection({ setLoading, fabricRef, shapeRef, setSrc, handleDrawer }) {
  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [promptAiImage, setPromptAiImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      // console.log(`promptAiImage: ${promptAiImage}`);
      const newUniqueId = uuidv4();
      await axios
        .post(
          `${apiUrl}/api/v1/product/generateAiImage`,
          {
            "prompt": promptAiImage,
            "uniqueId": newUniqueId,
          },
          {
            headers: {
              Authorization: localStorage.getItem("header"),
            },
          }
        );
      setTimeout(async () => {
        await fetchImages(newUniqueId);
        setLoading(false);
      }, 60000);

      if (window.innerWidth <= 768) {
        handleDrawer();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const fetchImages = async (newUniqueId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/product/fetchImage/${newUniqueId}`);
      // console.log(`response: ${response.data.image1}`);
      const base64ImageData = await response.data;
      const modifiedSrc = Object.values(base64ImageData).map(imageData => `data:image/png;base64,${imageData}`);
      setSrc(modifiedSrc);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemoveBg = async () => {
    await bgRemove({ fabricRef, shapeRef, setLoader });
  };


  return (
    <>
      <div className="flex justify-between items-center h-36">
        <div className="w-2/4 sm:w-3/4 h-full flex justify-center items-center">
          <textarea
            placeholder="Enter your style prompt and let AI design your mouse pad..."
            className="h-20 w-full bg-[#59575400] pl-1 md:pl-3 focus:outline-none resize-none placeholder:text-gray-500"
            onChange={(e) => setPromptAiImage(e.target.value)}
          ></textarea>
        </div>
        <div
          className="w-2/4 sm:w-1/4 h-full flex flex-col items-center justify-center 
          border-l border-black/55">
          <div className="flex justify-center items-center h-full border-b border-black/10 w-full">
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
          </div>
          <div className="flex justify-center items-center h-full w-full">
            <Button onClick={() => generate()}>Generate</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AiSection;
