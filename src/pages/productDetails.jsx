import React, { useEffect, useState } from "react";
import img from "../assets/main.png";
import p11 from "../assets/p1-1.png";
import p12 from "../assets/p1-2.png";
import chart1 from "../assets/sz2.jpg";
import chart2 from "../assets/sz3.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { errorNotify } from "./utils/notification";
import { IoCloseSharp } from "react-icons/io5";

import Slider from "../components/home/slider";

function ProductDetails() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [selSize, setSelSize] = useState(["S", "M", "L", "XL", "XXL"]);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [product, setProduct] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath.slice(9));

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/product/get`)
      .then((res) => {
        console.log(res.data.products);
        const product = res.data.products.filter(
          (item) => item._id == currentPath.slice(9)
        );

        setProduct(product[0]);
        setColor(product[0].color);
      })
      .catch((err) => console.log("err : ", err));
  }, [currentPath]);

  const toSummary = () => {
    if (color && size) {
      navigate("/order", {
        state: { color, size, productId: product._id, price: product.price },
      });
    } else {
      errorNotify("select size");
    }
  };

  return (
    <>
      {product && (
        <div className="w-[90%] mx-auto my-14 md:flex justify-between space-x-4">
          <div className="w-fit sm:h-[600px] h-[450px] overflow-y-auto mx-auto">
            {/* {product.images.map((item) => (
              <div
                className="sm:w-[400px] w-[300px] sm:h-[500px] h-[400px]  mx-auto"
                style={{
                  backgroundImage: `url(${item})`,
                  backgroundSize: "cover ",
                  backgroundPosition: "center center",
                }}
              ></div>
              //   <img src={item} className="w-full" />
            ))} */}
            <Slider images={product.images} />
          </div>

          <div className="lg:w-[650px] md:w-[400px] flex flex-col ">
            <h1 className="myFont lg:text-4xl md:text-3xl sm:text-2xl text-xl md:mt-12 mt-6">
              {product.title}
            </h1>
            <p className="myFont1 font-normal md:text-xl sm:text-lg text-md md:mt-8 mt-4">
              {product.description}
            </p>
            <h1 className="myFont1 md:text-2xl text-lg mt-6">Colors</h1>
            <div className="flex mt-2 space-x-8">
              <div
                className={`md:w-8 w-7 md:h-8 h-7 outline-offset-2 ${
                  color == product.color ? " outline outline-black " : ""
                }`}
                style={{ background: `${product.color}` }}
                onClick={() => setColor(product.color)}
              ></div>
              {/* <div className="w-8 h-8 bg-black"></div>
              <div className="w-8 h-8 bg-white"></div>
              <div className="w-8 h-8 bg-red-500"></div>
              <div className="w-8 h-8 bg-blue-500"></div>
              <div className="w-8 h-8 bg-orange-500"></div> */}
            </div>

            <h1 className="myFont1 md:text-2xl text-lg mt-4">size</h1>
            <div className="flex md:space-x-4 space-x-2 mt-2 myFont1">
              {selSize.map((item) => (
                <button
                  className={`w-12 py-1 md:text-md text-sm text-center ${
                    size == item ? "text-white bg-black" : "bg-white "
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowChart(true)}
              className="w-fit myFont1 md:text-2xl text-lg mt-6 border-2 border-black px-2 hover:bg-black hover:text-white"
            >
              size chart
            </button>

            {showChart && (
              <div
                className="fixed flex items-center top-0 left-0 z-10 h-screen w-screen bgCol1"
                onClick={() => setShowChart(false)}
              >
                <div className=" flex flex-col gap-3 items-end mx-auto">
                  <IoCloseSharp className="md:text-3xl sm:text-2xl text-xl " />
                  <div className="w-fit mx-auto flex md:flex-row flex-col gap-4">
                    <img
                      src={chart1}
                      className="md:w-[400px] sm:w-[300px] w-[280px]"
                      alt=""
                    />
                    <img
                      src={chart2}
                      className="md:w-[400px] sm:w-[300px] w-[280px]"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="md:mt-12 mt-6 flex items-end space-x-10">
              {/* <Link to={"/order"} state={{ color: color, size }}> */}
              <button
                className="md:w-[300px] bg-black p-4 myFont md:text-2xl sm:text-xl text-lg text-white"
                onClick={toSummary}
              >
                Buy Now
              </button>
              {/* </Link> */}
              <div className="">
                <div className="flex items-end space-x-4">
                  <div className="flex flex-col -space-y-2">
                    <h1 className="myFont1 sm:text-md text-sm">Price</h1>
                    <h1 className="myFont1 sm:text-3xl text-2xl">
                      {product.price}
                    </h1>
                  </div>
                  <h1 className="text-2xl mb-1">+</h1>
                  <div className="flex flex-col -space-y-2">
                    <h1 className="myFont1 sm:text-md text-sm">Shipping</h1>
                    <h1 className="myFont1 sm:text-3xl text-2xl">60</h1>
                  </div>
                </div>
                <h1 className="myFont md:text-5xl sm:text-3xl text-2xl">
                  {product.price + 60} rs.
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
