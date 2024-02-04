import React, { useState } from "react";
import Address from "../components/order/addressselect";
import OrderForm from "../components/order/form";
import Cart from "../components/order/ordercart";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const OrderPage2 = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const [isValid, setIsValid] = useState(true);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  console.log(location);
  const productId = location.state.productId;
  // console.log(productId);

  const initPayment = (data) => {
    const options = {
      key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID,
      amount: data.hoodinyOrder.price,
      currency: "INR",
      name: "testName",
      description: "Test Transaction",
      image:
        "https://th.bing.com/th/id/OIP.zqpKQxEeK-ILz7WLp9qQegHaHa?rs=1&pid=ImgDetMain",
      order_id: data.hoodinyOrder.razorpayOrderId,
      prefill: {
        name: data.hoodinyOrder.name,
        email: data.hoodinyOrder.email,
        contact: data.hoodinyOrder.phone,
      },
      handler: async (response) => {
        console.log("In handler try");
        console.log(response);
        try {
          const verifyUrl = `${apiUrl}/api/v1/order/verifyPayment`;

          const dumb = await axios.post(verifyUrl, response, {
            headers: {
              Authorization: localStorage.getItem("header"),
            },
          });
          console.log(dumb);
          console.log("In handler");
          navigate("/thankyou");
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#EAE5DD",
      },
    };
    // console.log("options: ", options);
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    if (
      !formData.fname ||
      !formData.lname ||
      !formData.email ||
      !formData.email.includes("@") ||
      !formData.contact ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
      try {
        const orderUrl = `${apiUrl}/api/v1/order/create`;
        const { data } = await axios.post(orderUrl, {
          productId: productId,
          size: location.state.size,
          color: location.state.color,
          email: formData.email,
          name: formData.fname + " " + formData.lname,
          address: formData.address,
          phone: formData.contact,
          city: formData.city,
          state: formData.state,
          zip: formData.pincode,
        });
        console.log(data);
        initPayment(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="my-12 lg:w-[80%] w-[90%] mx-auto">
      <h2 className="myFont1 md:text-3xl sm:text-2xl text-xl">
        Enter Details and Order Summary
      </h2>

      <center className="mt-6">
        <div className="md:flex md:flex-row md:space-x-2 space-y-4 gap-8 w-full">
          <div className="md:w-[65%] w-full">
            <OrderForm
              isValid={isValid}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="flex flex-col gap-3 md:w-[35%] w-full">
            <Cart price={location.state.price} />
            <>
              <button
                onClick={handlePayment}
                className="w-full bg-black text-white md:text-lg text-md md:p-5 p-3 rounded-xl"
              >
                Proceed to Pay
              </button>
            </>
          </div>
        </div>
      </center>
    </div>
  );
};

export default OrderPage2;
