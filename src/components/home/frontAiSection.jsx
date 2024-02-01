import React from "react";
import axios from "axios";
import { FaArrowRightLong } from "react-icons/fa6";

function AiSection({ frontAIImage, setFrontAiImage, setLoading }) {
  const apiUrl = process.env.REACT_APP_BASE_URL;

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

  const bgRemove = () => {
    setLoading(true);
    const apiKey = process.env.REACT_APP_BG_REMOVE_KEY;
    const url = "https://api.remove.bg/v1.0/removebg";
    const formData = new FormData();
    formData.append("image_url", frontAIImage.image.withBackground);
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
          setFrontAiImage((prevFrontAIImage) => ({
            ...prevFrontAIImage,
            image: {
              ...prevFrontAIImage.image,
              noBackground: reader.result,
            },
          }));
        };
        setLoading(false);
        reader.readAsDataURL(res.data);
      })
      .catch((err) => console.log(err));
  };

  const toggleAiBg = () => {
    if (!frontAIImage.image.withBackground) return;

    if (!frontAIImage.image.noBackground) {
      bgRemove();
    }
    setFrontAiImage({
      ...frontAIImage,
      background: !frontAIImage.background,
    });
  };

  return (
    <div className="flex">
      <textarea
        placeholder="Enter your style prompt and let AI design your clothes..."
        className="h-20 w-full bgCol1 px-2 focus:outline-none resize-none"
        onChange={(e) =>
          setFrontAiImage({ ...frontAIImage, prompt: e.target.value })
        }
      ></textarea>
      <div className="w-[200px] flex flex-col">
        {frontAIImage.background ? (
          <button className="w-fit h-1/2 mx-auto" onClick={toggleAiBg}>
            background
          </button>
        ) : (
          <button className="w-fit h-1/2 mx-auto" onClick={toggleAiBg}>
            no background
          </button>
        )}
        <button className="bgCol1 w-full h-1/2 text-2xl" onClick={generate}>
          <FaArrowRightLong className="mx-auto pr-1 hover:pr-0 duration-100" />
        </button>
      </div>
    </div>
  );
}

export default AiSection;
