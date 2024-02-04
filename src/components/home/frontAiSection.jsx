import React from "react";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";

function AiSection({ frontAIImage, setFrontAiImage, setLoading }) {
  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const generate = () => {
    // if (prompt.length > 5) {
    setLoading(true);
    console.log(prompt);
    axios
      .post(
        `${apiUrl}/api/v1/product/generateAiImage`,
        { prompt },
        {
          headers: {
            Authorization: localStorage.getItem("header"),
          },
        }
      )
      .then((data) => {
        console.log("Data:", data.data[0].url);
        setFrontAiImage((prevFrontAIImage) => ({
          ...prevFrontAIImage,
          image: {
            withBackground: data.data[0].url,
            noBackground: data.data[0].url,
          },
        }));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    // }
  };


  return (
    <div className="flex">
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
