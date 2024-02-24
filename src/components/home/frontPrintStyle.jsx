import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import AiSection from "./frontAiSection";
import UploadSection from "./frontUploadSection";
import { textElements } from "../../constants/constant";
import { Button } from "../ui/button";
import Text from "../settings/Text";
import Color from "../settings/Color";
import { modifyShape } from "@/libs/shapes";

function FrontPrintStyle({
  frontPrintStyle,
  setFrontPrintStyle, //needed
  setLoading,
  frontText,
  setFrontText,
  frontAIImage,
  setFrontAiImage,
  frontUploadImage,
  setFrontUploadImage,
  //fabric
  activeElement,
  handleActiveElment,
  elementAttributes,
  setElementAttributes,
  fabricRef,
  isEditingRef,
}) {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  const isActive = (value) =>
    (activeElement && activeElement.value === value);

  const handleInputChange = (property, value) => {
    if (!isEditingRef.current) isEditingRef.current = true;
    setElementAttributes((prev) => ({ ...prev, [property]: value }));
    modifyShape({
      canvas: fabricRef.current,
      property,
      value,
    });
  };

  return (
    <>
      {/* print options */}
      <div className="flex justify-center space-x-4 p-2 myFont border border-black/10 bg-[#E2DBD1] text-sm">
        <button
          className={`${frontPrintStyle == "text" ? "underline" : ""}`}
          onClick={() => setFrontPrintStyle("text")}
        >
          text
        </button>
        <button
          className={`${frontPrintStyle == "prompt" ? "underline" : ""}`}
          onClick={() => setFrontPrintStyle("prompt")}
        >
          prompt
        </button>
        <button
          className={`${frontPrintStyle == "upload" ? "underline" : ""}`}
          onClick={() => setFrontPrintStyle("upload")}
        >
          upload
        </button>
      </div>

      <div className="flex justify-between w-full border border-black">
        <div className="w-full mx-1 md:mx-3">
          {frontPrintStyle === "text" && (
            <div className="flex w-full h-36 items-center justify-between">
              <ul className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                {
                  textElements.map((item) => (
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
              <div className="md:mr-40">
                <Text
                  fontFamily={elementAttributes.fontFamily}
                  fontSize={elementAttributes.fontSize}
                  fontWeight={elementAttributes.fontWeight}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Color
                  inputRef={colorInputRef}
                  attribute={elementAttributes.fill}
                  handleInputChange={handleInputChange}
                  attributeType='fill'
                />
                <Color
                  inputRef={strokeInputRef}
                  attribute={elementAttributes.stroke}
                  attributeType='stroke'
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {frontPrintStyle === "prompt" && (
            <AiSection
              frontAIImage={frontAIImage}
              setFrontAiImage={setFrontAiImage}
              setLoading={setLoading}
            />
          )}

          {frontPrintStyle === "upload" && (
            <UploadSection
              setFrontUploadImage={setFrontUploadImage}
              frontUploadImage={frontUploadImage}
              setLoading={setLoading}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default FrontPrintStyle;

//   const getS3Link = (file) => {
//     const type = file.type.slice(6);
//     axios
//       .get(`  ${apiUrl}/api/v1/util/presignedurl/:${type}`, {
//         headers: {
//           Authorization: localStorage.getItem("header"),
//         },
//       })
//       .then((res) => {
//         console.log(res.data.url);
//         // uploadToS3(res.data.url, file);
//       })
//       .catch((err) => console.log(err));
//   };

//   const uploadToS3 = (presignedUrl, imageFile) => {
//     // const s3 = new AWS.S3({
//     //   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
//     //   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//     //   region: process.env.REACT_APP_AWS_REGION,
//     //   endpoint: `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.amazonaws.com`,
//     // });
//     // const params = {
//     //   Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
//     //   Key: file.name,
//     //   Body: file,
//     //   ContentType: file.type,
//     // };
//     // s3.upload(params, (err, data) => {
//     //   if (err) {
//     //     console.error("Error uploading file:", err);
//     //   } else {
//     //     console.log("File uploaded successfully:", data);
//     //   }
//     // });

//     console.log(presignedUrl, imageFile);
//     axios
//       .put(presignedUrl, imageFile, {
//         headers: {
//           "Content-Type": imageFile.type,
//           "Access-Control-Allow-Origin": "http://your-react-app-origin.com",
//           "Access-Control-Allow-Methods": "PUT",
//           "Access-Control-Allow-Headers": "*",
//         },
//       })
//       .then(() => {
//         console.log("Image uploaded successfully!");
//       })
//       .catch((error) => console.error("Error uploading image:", error));
//   };
