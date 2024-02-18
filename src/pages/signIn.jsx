import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/api/v1/auth/signin`, { email })
      .then((response) => {
        console.log("Response:", response.data);
        setShowOtp(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  };

  const verifyOtp = () => {
    axios
      .post(`${apiUrl}/api/v1/auth/verifySigninOtp`, { email, otp })
      .then((response) => {
        console.log("Response:", response.data.user.token);
        localStorage.setItem("header", `Bearer ${response.data.user.token}`);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign In
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              for="email"
              className="block text-sm font-medium text-start leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {showOtp && (
            <div>
              <div className="flex items-center justify-between">
                <label
                  for="otp"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  OTP
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  id="otp"
                  name="otp"
                  type="text"
                  autocomplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          )}

          <div>
            {showOtp == false ? (
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={verifyOtp}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Verify
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
