import React, { useState } from "react";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";
import CropperAiModal from "./CropperAiModal";
import { v4 as uuidv4 } from "uuid";

function AiSection({ frontAIImage, setFrontAiImage, setLoading }) {
  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [src, setSrc] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);
  const [images, setImages] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
    // console.log(`${frontAIImage.prompt}`);
    const newUniqueId = uuidv4();
    setUniqueId(newUniqueId);
    await axios
      .post(
        `${apiUrl}/api/v1/product/generateAiImage`,
        {
          "prompt": frontAIImage.prompt,
          "uniqueId": newUniqueId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("header"),
          },
        }
      );
      // await fetchImages(newUniqueId);
      setLoading(false);
      setModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchImages = async (newUniqueId) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/product/fetchImage/${newUniqueId}`);
      setImages(response.data.images);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex">
      <CropperAiModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        src={src}
        setFrontAiImage={setFrontAiImage}
      />
      <textarea
        placeholder="Enter your style prompt and let AI design your clothes..."
        className="h-20 w-full bg-[#59575400] px-2 focus:outline-none resize-none"
        onChange={(e) =>
          setFrontAiImage({ ...frontAIImage, prompt: e.target.value })
        }
      ></textarea>
      <div className="w-[60px] flex items-center justify-center bgCol1 border border-l-black">
        <button className="w-full h-1/2 text-2xl" onClick={generate}>
          <FaArrowRightLong className="mx-auto pr-1 hover:pr-0 duration-100" />
        </button>
      </div>
    </div>
  );
}

export default AiSection;
