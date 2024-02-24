import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { handleAiImageUpload } from "@/libs/shapes";

function AiSection({ setLoading, fabricRef, shapeRef }) {
  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [src, setSrc] = useState("");
  const [promptAiImage, setPromptAiImage] = useState(null);

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
        setPromptAiImage(null);
      }, 60000);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const fetchImages = async (newUniqueId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/product/fetchImage/${newUniqueId}`);
      // console.log(`response: ${response.data.image1}`);
      const base64ImageData = await response.data.image1;
      await handleAiImageUpload({ src: `data:image/png;base64, ${base64ImageData}`, canvas: fabricRef, shapeRef });
      setSrc(`data:image/png;base64, ${base64ImageData}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center h-28">
        <div className="w-2/4 sm:w-3/4 h-full flex justify-center items-center">
          <textarea
            placeholder="Enter your style prompt and let AI design your mouse pad..."
            className="h-20 w-full bg-[#59575400] focus:outline-none resize-none placeholder:text-gray-500"
            onChange={(e) => setPromptAiImage(e.target.value)}
          ></textarea>
        </div>
        <div className="w-2/4 sm:w-1/4 h-full flex items-center justify-center border-l border-black/55">
          <Button className="bg-black" onClick={() => generate()}>generate</Button>
        </div>
      </div>
      {
        src && (
          <img
            src={src}
            alt="ai-generate"
            className="w-0 h-0 object-fill hidden"
          />
        )
      }
    </>
  );
}

export default AiSection;
