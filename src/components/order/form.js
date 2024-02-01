import React, { useState } from "react";

const OrderForm = ({ isValid, formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="bgCol1 px-5 py-8 border border-black border-1 rounded-lg">
      <div className=" flex flex-col gap-4">
        <div className="lg:flex gap-5 w-full">
          <div className="flex flex-col gap-2 lg:w-1/2 w-full items-start">
            <label htmlFor="fname" className="text-md">
              First Name
            </label>
            <input
              id="fname"
              name="fname"
              type="text"
              value={formData.fname}
              onChange={handleInputChange}
              className="block w-full p-3 bgCol1 myFont1 border border-black rounded-md"
            />
            {!isValid && (
              <p className="myFont1 -mt-2 text-red-500">name cannot be empty</p>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-1/2 w-full items-start">
            <label htmlFor="lname" className="text-md">
              Last Name
            </label>
            <input
              id="lname"
              name="lname"
              type="text"
              value={formData.lname}
              onChange={handleInputChange}
              className="block w-full p-3 bgCol1 myFont1 border border-black rounded-md"
            />
            {!isValid && (
              <p className="myFont1 -mt-2 text-red-500">
                last name cannot be empty
              </p>
            )}
          </div>
        </div>
        <div className="lg:flex gap-5 w-full">
          <div className="flex flex-col gap-2 lg:w-1/2 w-full items-start">
            <label htmlFor="email" className="text-md">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full p-3 bgCol1 myFont1 border border-black rounded-md"
            />
            {!isValid && (
              <p className="myFont1 -mt-2 text-red-500">enter valid email</p>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-1/2 w-full items-start">
            <label htmlFor="contact" className="text-md">
              Contact Number
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              value={formData.contact}
              onChange={handleInputChange}
              className="block w-full p-3 bgCol1 myFont1 border border-black rounded-md"
            />
            {!isValid && (
              <p className="myFont1 -mt-2 text-red-500">enter valid contact</p>
            )}
          </div>
        </div>
        <div className="flex gap-5 w-full">
          <div className="flex flex-col gap-2 w-full items-start">
            <label htmlFor="address" className="text-md">
              Full Address
            </label>
            <textarea
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              className="block w-full p-3 bgCol1 myFont1 h-24 resize-none border border-black rounded-md"
            />{" "}
            {!isValid && (
              <p className="myFont1 -mt-2 text-red-500">
                address cannot be empty
              </p>
            )}
          </div>
        </div>
        <div className="lg:flex gap-5 w-full">
          <div className="flex flex-col gap-2 lg:w-1/2 w-full items-start">
            <label htmlFor="city" className="text-md">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleInputChange}
              className="block w-full p-3 bgCol1 myFont1 border border-black rounded-md"
            />{" "}
            {!isValid && (
              <p className="myFont1 -mt-2 text-red-500">city cannot be empty</p>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-1/2 w-full items-start">
            <label htmlFor="state" className="text-md">
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleInputChange}
              className="block w-full p-3 bgCol1 myFont1 border border-black rounded-md"
            />{" "}
            {!isValid && (
              <p className="myFont1 -mt-2 text-red-500">
                state cannot be empty
              </p>
            )}
          </div>
        </div>
        <div className="lg:flex gap-5 w-full">
          <div className="flex flex-col gap-2 lg:w-1/2 w-full items-start">
            <label htmlFor="pincode" className="text-md">
              Postal / zip code
            </label>
            <input
              id="pincode"
              name="pincode"
              type="text"
              value={formData.pincode}
              onChange={handleInputChange}
              className="block w-full p-3 bgCol1 myFont1 border border-black rounded-md"
            />
            {!isValid && (
              <p className="myFont1 -mt-2 text-red-500">enter valid zip</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
