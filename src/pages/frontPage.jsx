import React, { useEffect, useState } from "react";
import img from "../assets/blurImg.png";
import shirt from "../assets/main.png";
import insta from "../assets/mdi_instagram.png";
import p11 from "../assets/p1-1.png";
import p12 from "../assets/p1-2.png";
import axios from "axios";
import { successNotify, errorNotify } from "./utils/notification";

import { Link } from "react-router-dom";

function FrontPage() {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/product/get`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
      })
      .catch((err) => console.log("err : ", err));
  }, []);

  const toWaitlist = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorNotify("Invalid email format");
      return;
    }

    axios
      .post(`${apiUrl}/api/v1/auth/waitlist`, { email })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          successNotify("Waitlist joined");
        }
        if (res.status == 400) {
          errorNotify("Alreday joined");
        }
      })
      .catch((err) => console.log("err : ", err));
  };

  return (
    <div className="">
      <div
        className="relative bgCol1 h-screen"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover ",
          backgroundPosition: "center",
        }}
      >
        <div className="w-[90%] mx-auto h-full flex flex-col items-center justify-center">
          <h1 className="myFont px-5 lg:text-7xl md:text-6xl sm:text-5xl text-4xl md:mb-8 mb-3 text-center text-black">
            Hoodiny Studios
          </h1>
          <p className="myFont1 mt-4 lg:text-4xl sm:text-3xl text-2xl">
            Coming Soon
          </p>
          <Link
            to={
              "https://www.instagram.com/studentpreneur.club?igsh=a2RpdXd3cW00NXk5 "
            }
          >
            <button className="md:py-3 py-1 lg:px-14 md:px-10 sm:px-6 px-3 flex md:space-x-8 space-x-3 justify-evenly items-center bgCol2 mt-12 mx-auto border-2 border-black hover:bg-zinc-200">
              <h1 className="myFont lg:text-2xl md:text-xl sm:text-lg text-sm">
                Follow Our Journey
              </h1>
              <span>
                <img className="" src={insta} alt="" />
              </span>
            </button>
          </Link>
          <div className="flex lg:flex-row flex-col md:w-[60%] sm:w-[85%] w-[97%] mt-12 lg:space-x-3 space-y-2 mx-auto lg:items-end items-center justify-center">
            <div className="w-full flex flex-col gap-2 w-1/2 items-start">
              <label htmlFor="email" className="text-lg myFont1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-3 bgCol1 myFont1 border border-black rounded-md "
              />
            </div>
            <button
              className="bg-black w-full text-white myFont lg:text-lg md:text-md text-sm w-fit text-xm px-4 py-[12px]"
              onClick={toWaitlist}
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto flex flex-col justify-center">
        {/* bottom cards */}
        <h3 className="md:mt-16 mb-5 myFont md:text-2xl sm:text-xl text-lg text-center">
          Hoodiny Originals
        </h3>
        <div className="w-[80%] mx-auto mb-[200px]">
          <div className="flex flex-wrap gap-9 justify-center items-center">
            {products &&
              products.map((item) => (
                <div className="relative flex flex-col items-center mt-2  border border-black">
                  <Link to={`/product/${item._id}`}>
                    <div
                      className="md:w-[300px] w-[250px] md:h-[350px] h-[280px]"
                      style={{
                        backgroundImage: `url(${item.images[0]})`,
                        backgroundSize: "cover ",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    {/* <img src={item.images[0]} className="w-[300px] " /> */}

                    <button className="bg-black text-white myFont w-full md:text-2xl sm:text-xl p-4">
                      Buy Now
                    </button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
