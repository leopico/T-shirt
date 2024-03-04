import { useState, useEffect, useRef } from "react";
import SelectSize from "../components/home/selectSize";
import FrontPrintStyle from "../components/home/frontPrintStyle";
import grid from "../assets/background.png";
import { Link } from "react-router-dom";
import ItemCard from "../components/home/items";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "axios";
import "./css/home.css";
import { defaultTextElement, defaultTshirt, tshirtImages } from "../constants/constant";
import { handleCanvasMouseDown, handleCanvasMouseUp, handleCanvasSelectionCreated, handleCanvaseMouseMove, handleResize, initializeBackFabric, initializeFabric } from "../libs/canvas";
import { handleAiImageUpload, handleDelete } from "../libs/shapes";
import Tshirt from "/assets/Fshirt6.png";
import { Transition } from "@headlessui/react";
import Sticker1 from "/assets/sticker1.png";
import Sticker2 from "/assets/sticker2.png";
import Sticker3 from "/assets/sticker3.png";
import SelectColor from "@/components/home/SelectColor";
import SelectView from "@/components/home/selectView";
import PreviewBtn from "../components/home/PreviewBtn";

const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const Home = () => {
  let [products, setProducts] = useState(null);
  let [size, setSize] = useState("");
  let [view, setView] = useState("front");
  let [showView, setShowView] = useState(false);
  const [frontPrintStyle, setFrontPrintStyle] = useState("text");



  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [color, setColor] = useState(defaultTshirt[0]);
  const [category, setCategory] = useState("");
  const [src, setSrc] = useState([]);

  //front view canvas
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const shapeRef = useRef(null);
  const selectedShapeRef = useRef(null);
  const imageInputRef = useRef(null);
  const isEditingRef = useRef(false);

  const [activeElement, setActiveElement] = useState(defaultTextElement);
  const [elementAttributes, setElementAttributes] = useState({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "#aabbcc",
    stroke: "#aabbcc",
  });

  //back view canvas
  const backCanvasRef = useRef(null);
  const backFabricRef = useRef(null);
  const backShapeRef = useRef(null);
  const backSelectedShapeRef = useRef(null);
  const backImageInputRef = useRef(null);
  const backIsEditingRef = useRef(null);

  const handleActiveElment = (elem) => {
    setActiveElement(elem);

    switch (elem.value) {
      case 'reset':
        fabricRef.current.clear();
        setActiveElement(defaultTextElement);
        break;

      case "delete":
        handleDelete(fabricRef.current);
        setActiveElement(defaultTextElement);
        break;

      case "image":
        imageInputRef.current.click();
        break;

      default:
        selectedShapeRef.current = elem.value;
        break;
    }
  };

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

  // useEffect(() => {
  //   axios
  //     .get(`${apiUrl}/api/v1/product/get`, {
  //       headers: {
  //         Authorization: localStorage.getItem("header"),
  //       },
  //     })
  //     .then((data) => {
  //       // console.log("Data:", data);
  //       setProducts(data.data.products);
  //     })
  //     .catch((error) => {
  //       console.error("Fetch error:", error);
  //     });
  // }, []);



  useEffect(() => {
    const canvas = initializeFabric({ fabricRef, canvasRef });
    console.log("front canvas initialized");

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        shapeRef,
        selectedShapeRef
      });
    });

    canvas.on("mouse:move", (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        shapeRef,
        selectedShapeRef
      });
    });

    canvas.on("mouse:up", () => {
      handleCanvasMouseUp({
        canvas,
        shapeRef,
        selectedShapeRef,
        setActiveElement,
      });
    });

    canvas.on("selection:created", (options) => {
      handleCanvasSelectionCreated({
        options,
        isEditingRef,
        setElementAttributes,
      })
    })

    window.addEventListener("resize", () => {
      handleResize({ fabricRef })
    });

    return () => {
      canvas.dispose();

      window.removeEventListener("resize", () => {
        handleResize({
          canvas: null,
        });
      });
    }

  }, [canvasRef, view]);

  useEffect(() => {
    const backcanvas = initializeBackFabric({ backFabricRef, backCanvasRef });
    console.log("back canvas initialized");
    return () => {
      backcanvas.dispose();
    }
  }, [backCanvasRef, view])

  const handleDrawer = () => {
    setDrawer((pre) => !pre);
  };

  const handleImageCLick = async (imageSrc) => {
    // console.log(`Clicked imageSrc:`, imageSrc);
    await handleAiImageUpload({ src: imageSrc, canvas: fabricRef, shapeRef });
    if (drawer) {
      setDrawer((pre) => !pre);
    };
  };

  const handleColorClick = (clickedColor) => {
    setColor(clickedColor);
  };

  const selectedImage = tshirtImages.find((tshirt) => tshirt.color === color) || defaultTshirt[0];

  return (
    <div
      className="pb-28"
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

      <div className="relative h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-0 py-10 w-[95%] mx-auto">

        <div className="hidden lg:flex flex-col items-center justify-between mx-auto bgCol1 h-full w-full border border-black">
          <div className="myFont w-full min-h-[60px] bgCol1 border border-b-black flex items-center justify-center">
            Ai Images
          </div>
          {
            src && src.length > 0 ? (
              <div className="flex flex-col items-center justify-between space-y-3 pl-2 mx-auto overflow-y-auto max-h-[750px]">
                {
                  src.map((imageSrc, index) => (
                    <img
                      className="h-[200px] cursor-pointer"
                      src={imageSrc}
                      key={index}
                      alt={`image - ${index + 1}`}
                      onClick={() => handleImageCLick(imageSrc)}
                    />
                  ))
                }
              </div>
            ) : (
              <h1 className="w-full h-full flex items-center justify-center myFont2 font-extrabold text-lg text-center">
                Generate ai-images
              </h1>
            )
          }
        </div>

        <div className="col-span-4 flex items-center justify-center h-full relative">

          <Transition
            show={drawer}
            enter="transition-opacity duration-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute top-0 left-0 h-full w-56 md:w-64 z-30 bgCol1 shadow-md">
              <div onClick={handleDrawer}
                className="p-1 sm:p-2 lg:p-0 flex justify-between items-center">
                <span className="text-[10px] sm:text-[16px] myFont">Ai Images</span>
                <img src="/assets/close.svg" className="w-8 h-8 sm:w-12 sm:h-12 hover:scale-105 hover:opacity-85 cursor-pointer" alt="close" />
              </div>
              <div className="flex flex-col space-y-2 overflow-y-auto">
                <div className="flex flex-col items-center justify-between space-y-3 mx-auto overflow-y-auto max-h-[550px]">
                  {
                    src && src.length > 0 ? (
                      src.map((imageSrc, index) => (
                        <img
                          className="h-[200px] cursor-pointer"
                          src={imageSrc}
                          alt={`image - ${index + 1}`}
                          onClick={() => handleImageCLick(imageSrc)}
                        />
                      ))
                    ) : (
                        <div className="p-10 mt-40">
                          <TbFidgetSpinner size={50} className="animate-spin" />
                        </div>
                    )
                  }
                </div>
              </div>
            </div>
          </Transition>

          <div className="flex flex-col justify-center items-center w-full border border-black">

            <div className="bgCol1 flex w-full justify-between items-center border px-3 md:px-0 border-b-black h-[60px]">
              <SelectSize setSize={setSize} />
              <SelectColor color={color} handleColorClick={handleColorClick} />
              <div className="box">
                <select
                  className="myFont text-[14px] bgCol1 cursor-pointer w-3 sm:w-auto"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option disabled selected>
                    Category
                  </option>
                  <option value="sweatshirt">Sweatshirt</option>
                  <option value="tshirt">T-shirt</option>
                </select>
              </div>
            </div>

            <div className="relative">
              {/* Front image */}
              {
                view === "front" && (
                  <div id="front-capture">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src={selectedImage.fImage} className="max-w-full max-h-full" alt="Tshirt-F" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-44 sm:w-40 sm:h-56 lg:w-56 lg:h-80 border-red-600 border-4"></div>
                    </div>
                    <div className="w-full h-96 lg:h-[550px]" id="canvas">
                      <canvas className="h-full w-full" ref={canvasRef} />
                    </div>
                  </div>
                )
              }

              {
                view === "back" && (
                  <div id="back-capture">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src={selectedImage.bImage} className="max-w-full max-h-full" alt="Tshirt-F" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-40 sm:w-40 sm:h-56 lg:w-[190px] lg:h-80 border-[#0AC2FF] border-4"></div>
                    </div>
                    <div className="w-full h-96 lg:h-[550px] " id="back-canvas">
                      <canvas className="w-full h-full" ref={backCanvasRef} />
                    </div>
                  </div>
                )
              }

              <div onClick={handleDrawer}
                className="absolute transition-transform duration-300 ease-in-out top-1 sm:top-2 sm:left-2 left-1 lg:hidden z-20 w-10 flex justify-center items-center hover:scale-105 cursor-pointer">
                <img src="/assets/settings.png" alt="setting" />
              </div>

              <div
                className="absolute transition-transform duration-300 
                ease-in-out top-1 sm:top-2 right-1 sm:right-2 z-20 w-20 shadow-xl
                flex justify-center items-center hover:scale-105 cursor-pointer">
                <SelectView
                  view={view}
                  setView={setView}
                  showView={showView}
                  setShowView={setShowView}
                />
              </div>

              {frontPrintStyle === "prompt" && loading && (
                <h1 className="absolute w-24 text-yellow-500/85 text-lg sm:text-2xl md:text-4xl font-bold top-[50%] left-[52%] transform -translate-x-1/2 -translate-y-1/2">
                  <TbFidgetSpinner size={50} className="animate-spin" />
                </h1>
              )}

              {frontPrintStyle === "upload" && loading && (
                <h1 className="absolute w-24 text-yellow-500/85 text-lg sm:text-2xl md:text-4xl font-bold top-[50%] left-[52%] transform -translate-x-1/2 -translate-y-1/2">
                  <TbFidgetSpinner size={50} className="animate-spin" />
                </h1>
              )}

            </div>

            <FrontPrintStyle
              frontPrintStyle={frontPrintStyle}
              setFrontPrintStyle={setFrontPrintStyle}
              setLoading={setLoading}
              activeElement={activeElement}
              handleActiveElment={handleActiveElment}
              elementAttributes={elementAttributes}
              setElementAttributes={setElementAttributes}
              fabricRef={fabricRef}
              isEditingRef={isEditingRef}
              imageInputRef={imageInputRef}
              shapeRef={shapeRef}
              src={src}
              setSrc={setSrc}
              handleDrawer={handleDrawer}
            />

            <div className="footer w-full">
              <div className="wishlist flex items-center justify-center border border-t-black border-r-black">Wishlist</div>
              <div className="price border border-t-black">Rs 648.00</div>
              <PreviewBtn view={view} size={size} category={category} />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center mx-auto bgCol1 h-full border border-black">
          <span className="myFont h-[39px] w-full bgCol1 border border-b-black text-center">
            Stickers
          </span>
          <div className="flex flex-col items-center justify-between space-y-3 pl-2 mx-auto overflow-y-auto max-h-[750px]">
            <img className="h-[200px]" src={Sticker1} alt="ai-image1" />
            <img className="h-[200px]" src={Sticker2} alt="ai-image2" />
            <img className="h-[200px]" src={Sticker3} alt="ai-image3" />
            <img className="h-[200px]" src={Sticker1} alt="ai-image3" />
          </div>
        </div>

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
