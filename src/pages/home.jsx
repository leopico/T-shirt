import { useState, useEffect } from "react";
import SelectSize from "../components/home/selectSize";
import FrontPrintStyle from "../components/home/frontPrintStyle";
import mouse from "../assets/mousepad.png";
import grid from "../assets/background.png";
import { Link } from "react-router-dom";
import ItemCard from "../components/home/items";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "axios";

const Home = () => {
  let [products, setProducts] = useState(null);
  let [view, setView] = useState("front");
  let [size, setSize] = useState("");
  let [frontPrintStyle, setFrontPrintStyle] = useState("text");
  let [frontLoading, setFrontLoading] = useState(false);

  // for Text
  let [frontText, setFrontText] = useState({
    text: "",
    value: "printFont1 text-lg",
    label: "Dingos",
    print: "printFont1 text-lg",
  });

  // for AI generated Image
  let [frontAIImage, setFrontAiImage] = useState({
    prompt: null,
    image: {
      withBackground: null,
      noBackground: null,
    },
    background: true,
  });

  // for Uploaded Image
  let [frontUploadImage, setFrontUploadImage] = useState({
    image: {
      withBackground: null,
      noBackground: null,
    },
    background: true,
  });

  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const createProduct = () => {
    // if (size && color && category) {
    // const postData = {
    //   user: localStorage.getItem("token"),
    //   size,
    //   color,
    //   category,
    //   printStyle,
    //   ...(printStyle === "text" && { text }),
    //   ...(printStyle === "text" && { font: fontStyle.font }),
    //   ...(printStyle === "prompt" && { image }),
    // };
    // const header = {
    //   headers: {
    //     Authorization: localStorage.getItem("header"),
    //   },
    // };
    // axios
    //   .post(`${apiUrl}/api/v1/product/create`, postData, header)
    //   .then((response) => {
    //     navigate("/order", { state: { productId: response.data.product._id } });
    //     console.log("POST request successful:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error making POST request:", error);
    //   });
    // }
    // alert("create product")
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/product/get`, {
        headers: {
          Authorization: localStorage.getItem("header"),
        },
      })
      .then((data) => {
        // console.log("Data:", data);
        setProducts(data.data.products);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div
      className="pb-28 sm:pb-56"
      style={{
        backgroundImage: `url(${grid})`,
        backgroundSize: "cover",
      }}
    >

      {!localStorage.getItem("header") ? (
        <div className="flex pt-10 w-[80%] mx-auto">
          <Link
            className="thankyoubtn text-black ml-auto"
            // onClick={() => setShowSignIn(!showSignIn)}
            to={"/signin"}
          >
            LogIn
          </Link>
        </div>
      ) : (
        <div className="flex pt-10 w-[80%] mx-auto">
          <Link
            className="thankyoubtn text-black ml-auto"
            onClick={() => localStorage.setItem("header", "")}
            to={"/signin"}
          >
            Log out
          </Link>
        </div>
      )}

      <div className="relative py-10 flex h-full w-full justify-center items-center">
        <center className="w-[90%] h-[600px]">

          <div className="bgCol1 flex w-full justify-between items-center border border-black">
            <div className="px-1 md:px-7 lg:px-16 py-2 md:py-4 border border-r-black">
              <SelectSize setSize={setSize} />
            </div>
            <div className="">
              <h1 className="myFont text-xs md:text-lg lg:text-2xl">By hoodiny studios</h1>
            </div>
            <div className="px-1 md:px-7 lg:px-16 py-3 md:py-5 border border-l-black text-xs">
              <h1 className="myFont">stickers</h1>
            </div>
          </div>

          <div className="relative border border-black">
            {/* Front image */}

            <img src={mouse} className="w-[600px] h-2/3" alt="logo" />

            {frontPrintStyle == "text" && (
              <div className="absolute w-40 top-[50%] left-[43%] md:left-[45%] transform -translate-x-1/2 -translate-y-1/2">
                <h1
                  className={`${frontText.print} text-white text-[40px] md:text-5xl`}>
                  {frontText.text}
                </h1>
              </div>
            )}

            {frontPrintStyle == "prompt" && (
              <>
                <div className="w-[600px]">
                  <img
                    src={
                      frontAIImage.background
                        ? frontAIImage.image.withBackground
                        : frontAIImage.image.noBackground
                    }
                    className="absolute sm:w-[500px] sm:h-[380px] md:w-[490px] md:h-[390px] top-[50%] rounded-3xl left-[50%] transform -translate-x-1/2 -translate-y-1/2"
                    alt="centered-logo"
                  />
                </div>
                {frontLoading && (
                  <h1 className="absolute w-24 text-yellow-500/85 text-lg sm:text-2xl md:text-4xl font-bold top-[50%] left-[49%] transform -translate-x-1/2 -translate-y-1/2">
                    <TbFidgetSpinner size={50} className="animate-spin" />
                  </h1>
                )}
              </>
            )}

            {frontPrintStyle == "upload" && (
              <>
                <div className="w-[600px]">
                  <img
                    src={
                      frontUploadImage.background
                        ? frontUploadImage.image.withBackground != null &&
                        URL.createObjectURL(
                          frontUploadImage.image.withBackground
                        )
                        : frontUploadImage.image.noBackground
                    }
                    className="absolute sm:w-[500px] sm:h-[380px] md:w-[490px] md:h-[390px] top-[50%] rounded-3xl left-[50%] transform -translate-x-1/2 -translate-y-1/2"
                    alt="centered-logo"
                  />
                </div>
              </>
            )}

          </div>
          {view == "front" && (
            <FrontPrintStyle
              frontPrintStyle={frontPrintStyle}
              setFrontPrintStyle={setFrontPrintStyle}
              setLoading={setFrontLoading}
              frontText={frontText}
              setFrontText={setFrontText}
              frontAIImage={frontAIImage}
              setFrontAiImage={setFrontAiImage}
              frontUploadImage={frontUploadImage}
              setFrontUploadImage={setFrontUploadImage}
            />
          )}

          <div className="footer">
            <div className="wishlist flex items-center justify-center border border-r-black">Wishlist</div>
            <div className="price">Rs 648.00</div>
            <button className="paydbtn" onClick={createProduct}>
              Buy Now
            </button>
          </div>
        </center>
      </div>
      {/* bottom cards */}
      {/* <div className="sm:pt-10 md:pt-36">
        <h3 className="mt-16 mb-5 myFont text-xl text-center">Pre-designed</h3>
        <div className="w-[80%] mx-auto pb-10 lg:pb-20">
          <div className="flex flex-wrap gap-9 justify-center items-center">
            {products &&
              products.map((item) => <ItemCard key={item._id} {...item} />)}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
