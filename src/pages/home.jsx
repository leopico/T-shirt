import { useState, useEffect } from "react";
import SelectView from "../components/home/selectView";
import SelectSize from "../components/home/selectSize";
import SelectColor from "../components/home/selectcolor";
import SelectCategory from "../components/home/selectCategory";
import FrontPrintStyle from "../components/home/frontPrintStyle";
import img from "../assets/main.png";
import front from "../assets/main.png";
import back from "../assets/main1.png";
import side1 from "../assets/OIG1.png";
import side2 from "../assets/OIG2.png";
import side3 from "../assets/OIG3.png";
import grid from "../assets/background.png";
import { Link, useNavigate } from "react-router-dom";
import Items from "../components/order/items";
import ItemCard from "../components/home/items";
import axios from "axios";

const Home = () => {
  // let [showSignIn, setShowSignIn] = useState(false);
  let [products, setProducts] = useState(null);
  let [view, setView] = useState("front");
  let [showView, setShowView] = useState(false);
  let [size, setSize] = useState("");
  let [color, setColor] = useState("");
  let [category, setCategory] = useState("");
  let [frontPrintStyle, setFrontPrintStyle] = useState("text");
  let [backPrintStyle, setBackPrintStyle] = useState("text");
  let [frontLoading, setFrontLoading] = useState(false);
  let [backLoading, setBackLoading] = useState(false);
  // for Text
  let [frontText, setFrontText] = useState({
    text: "",
    value: "printFont1 text-lg",
    label: "Dingos",
    print: "printFont1 text-lg",
  });
  let [backText, setBackText] = useState({
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
    // image: {
    //   withBackground:
    //     "https://th.bing.com/th/id/R.19dd1c0054da751855b7c0a243910e65?rik=MKqvVxOYs8qY1Q&riu=http%3a%2f%2fclipart-library.com%2fimages%2frcnr6RXei.jpg&ehk=ilUXrsNJ3oQVy1XWIC1cTjwF00XXgFm7cdq1y9d%2fflI%3d&risl=&pid=ImgRaw&r=0",
    //   noBackground:
    //     "https://th.bing.com/th/id/OIG.lHtJpivzlvMDkSAWIHlL?w=1024&h=1024&rs=1&pid=ImgDetMain",
    // },
    background: true,
  });
  let [backAIImage, setBackAiImage] = useState({
    prompt: null,
    image: {
      withBackground:
        "https://th.bing.com/th/id/R.19dd1c0054da751855b7c0a243910e65?rik=MKqvVxOYs8qY1Q&riu=http%3a%2f%2fclipart-library.com%2fimages%2frcnr6RXei.jpg&ehk=ilUXrsNJ3oQVy1XWIC1cTjwF00XXgFm7cdq1y9d%2fflI%3d&risl=&pid=ImgRaw&r=0",
      noBackground:
        "https://th.bing.com/th/id/OIG.lHtJpivzlvMDkSAWIHlL?w=1024&h=1024&rs=1&pid=ImgDetMain",
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
  let [backUploadImage, setBackUploadImage] = useState({
    image: {
      withBackground: null,
      noBackground: null,
    },
    background: true,
  });

  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();

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
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/product/get`, {
        headers: {
          Authorization: localStorage.getItem("header"),
        },
      })
      .then((data) => {
        console.log("Data:", data);
        setProducts(data.data.products);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${grid})`,
        backgroundSize: "cover",
      }}
    >
      {/* {!localStorage.getItem("header") ? (
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
      )} */}
      <div className="relative  py-20  flex h-full w-[80%] mx-auto">
        <div className="w-[20%] h-[600px] p-2 bg-[#E2DBD1] border border-black overflow-y-auto">
          <div className="flex flex-col items-center justify-between">
            <img className="h-[200px]" src={img} alt="" />
            <img className="h-[200px]" src={img} alt="" />
            <img className="h-[200px]" src={img} alt="" />
          </div>
        </div>
        <center className="w-[60%] h-[600px]">
          <div className="bgCol1 flex w-full justify-between items-center px-4 py-1 border border-black">
            <SelectSize setSize={setSize} />
            <SelectColor color={color} setColor={setColor} />
            <SelectCategory setCategory={setCategory} />
          </div>
          <div className="relative main bg-[#E2DBD1]">
            <SelectView
              view={view}
              setView={setView}
              showView={showView}
              setShowView={setShowView}
            />
            {/* Front image */}
            {view == "front" && (
              <img src={front} className="w-80 py-7" alt="logo" />
            )}

            {/* back image */}
            {view == "back" && (
              <img src={back} className="w-80 py-7" alt="logo" />
            )}

            {view == "front" && (
              <>
                {frontPrintStyle == "text" && (
                  <div className="absolute w-24 top-[40%] left-[51%] transform -translate-x-1/2 -translate-y-1/2">
                    <h1 className={`${frontText.print}`}>{frontText.text}</h1>
                  </div>
                )}
              </>
            )}
            {view == "back" && (
              <>
                {backPrintStyle == "text" && (
                  <div className="absolute w-24 top-[40%] left-[51%] transform -translate-x-1/2 -translate-y-1/2">
                    <h1 className={`${backText.print}`}>{backText.text}</h1>
                  </div>
                )}
              </>
            )}

            {view == "front" && (
              <>
                {frontPrintStyle == "prompt" && (
                  <>
                    <img
                      src={
                        frontAIImage.background
                          ? frontAIImage.image.withBackground
                          : frontAIImage.image.noBackground
                      }
                      className="absolute w-24 top-[47%] left-[51%] transform -translate-x-1/2 -translate-y-1/2"
                      // alt="centered-logo"
                    />
                    {frontLoading && (
                      <h1 className="absolute w-24 text-yellow-500 text-xl font-bold top-[47%] left-[51%] transform -translate-x-1/2 -translate-y-1/2">
                        loading
                      </h1>
                    )}
                  </>
                )}
              </>
            )}

            {view == "back" && (
              <>
                {backPrintStyle == "prompt" && (
                  <>
                    <img
                      src={
                        backAIImage.background
                          ? backAIImage.image.withBackground
                          : backAIImage.image.noBackground
                      }
                      className="absolute w-24 top-[47%] left-[51%] transform -translate-x-1/2 -translate-y-1/2"
                      // alt="centered-logo"
                    />
                    {backLoading && (
                      <h1 className="absolute w-24 top-[47%] left-[51%] transform -translate-x-1/2 -translate-y-1/2">
                        loading
                      </h1>
                    )}
                  </>
                )}
              </>
            )}
            {view == "front" && (
              <>
                {frontPrintStyle == "upload" && (
                  <>
                    <img
                      src={
                        frontUploadImage.background
                          ? frontUploadImage.image.withBackground != null &&
                            URL.createObjectURL(
                              frontUploadImage.image.withBackground
                            )
                          : frontUploadImage.image.noBackground
                      }
                      className="absolute w-24 top-[47%] left-[51%] transform -translate-x-1/2 -translate-y-1/2"
                      // alt="centered-logo"
                    />
                    {frontLoading && (
                      <h1 className="absolute w-24 top-[47%] left-[51%] transform -translate-x-1/2 -translate-y-1/2">
                        loading
                      </h1>
                    )}
                  </>
                )}
              </>
            )}

            {view == "back" && (
              <>
                {backPrintStyle == "upload" && (
                  <>
                    <img
                      src={
                        backUploadImage.background
                          ? backUploadImage.image.withBackground != null &&
                            URL.createObjectURL(
                              backUploadImage.image.withBackground
                            )
                          : backUploadImage.image.noBackground
                      }
                      className="absolute w-24 top-[47%] left-[51%] transform -translate-x-1/2 -translate-y-1/2"
                      // alt="centered-logo"
                    />
                    {backLoading && (
                      <h1 className="absolute w-24 top-[47%] left-[51%] transform -translate-x-1/2 -translate-y-1/2">
                        loading
                      </h1>
                    )}
                  </>
                )}
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
          {view == "back" && (
            <FrontPrintStyle
              frontPrintStyle={backPrintStyle}
              setFrontPrintStyle={setBackPrintStyle}
              setLoading={setBackLoading}
              frontText={backText}
              setFrontText={setBackText}
              frontAIImage={backAIImage}
              setFrontAiImage={setBackAiImage}
              frontUploadImage={backUploadImage}
              setFrontUploadImage={setBackUploadImage}
            />
          )}

          <div className="footer">
            <div className="price">Rs 648.00</div>
            <button className="paydbtn" onClick={createProduct}>
              Buy Now
            </button>
          </div>
        </center>
        <div className="w-[20%] h-[600px] p-2 bg-[#E2DBD1] border border-black overflow-y-auto">
          <div className="flex flex-col gap-2 items-center justify-between">
            <img className="h-[200px]" src={side1} alt="" />
            <img className="h-[200px]" src={side2} alt="" />
            <img className="h-[200px]" src={side3} alt="" />
          </div>
        </div>
      </div>
      {/* bottom cards */}
      {/* <h3 className="mt-16 mb-5 myFont text-xl">Pre-designed</h3>
      <div className="w-[80%] mx-auto">
        <div className="flex flex-wrap gap-9 justify-center items-center">
          {products &&
            products.map((item) => <ItemCard key={item._id} {...item} />)}
        </div>
      </div> */}
    </div>
  );
};

export default Home;
