import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

function Slider({ images }) {
  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-[400px]"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            {/* <img src={item} className="w-[500px]" /> */}
            <div
              className="sm:w-[400px] w-[300px] sm:h-[500px] h-[400px] mx-auto"
              style={{
                backgroundImage: `url(${item})`,
                backgroundSize: "cover ",
                backgroundPosition: "center center",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
