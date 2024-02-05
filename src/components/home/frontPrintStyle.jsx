import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectFont from "./selectFont";

import AiSection from "./frontAiSection";
import UploadSection from "./frontUploadSection";
import S3FileUpload from "react-s3";
import AWS from "aws-sdk";
// import { upload } from "@testing-library/user-event/dist/upload";

function FrontPrintStyle({
  frontPrintStyle,
  setFrontPrintStyle,
  setLoading,
  frontText,
  setFrontText,
  frontAIImage,
  setFrontAiImage,
  frontUploadImage,
  setFrontUploadImage,
}) {
  
  const handlePrintText = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 7) {
      setFrontText({
        ...frontText,
        text: inputValue,
      });
    } else {
      setFrontText({
        ...frontText,
        text: inputValue.slice(0, 7),
      });
    }
  };

  //   console.log(process.env.REACT_APP_AWS_BUCKET_NAME);
  // useEffect(
  //   () => console.log(frontUploadImage.image),
  //   [frontUploadImage.image]
  // );
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
        <div className="w-full">
          {frontPrintStyle == "text" && (
            <div className="flex w-full">
              <input
                value={frontText.text}
                placeholder="Enter text"
                className="w-1/3 inpt bgCol2 px-2 focus:outline-none"
                onChange={handlePrintText}
              ></input>
              <SelectFont
                className="w-fit"
                frontPrintStyle={frontPrintStyle}
                frontText={frontText}
                setFrontText={setFrontText}
              />
            </div>
          )}
          {frontPrintStyle == "prompt" && (
            <AiSection
              frontAIImage={frontAIImage}
              setFrontAiImage={setFrontAiImage}
              setLoading={setLoading}
            />
          )}
          {frontPrintStyle === "upload" && (
            <UploadSection
              setFrontUploadImage={setFrontUploadImage}
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
