import React, { useState } from "react";
import "./otpVerification.css"; // Import the CSS file
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
const OtpVerification = () => {
  const { email } = useParams(); //fetch value feom url
  console.log(email)
  // set values of otp and error
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // function to set value of otp
  const handleOtpChange1 = (e) => {
    setOtp(e.target.value);
    console.log(otp);
  };

  // function to resend otp
  const resendOtp = async () => {
    console.log(email)
    //send otp post request
    const otpDaata = await axios.post("http://localhost:8000/api/sendotp", {
      email,
    });
    console.log(otpDaata);
  };
  // function to verify otp
  const handleVerifyClick = async () => {
    try {
      //verify otp post request
      const data = await axios.post("http://localhost:8000/api/verifyOtp", {
        otp,
        email,
      });

      if (data.status === 200) {
        const user = data.data;
        alert("Otp Validation Successfull.");
        window.location.assign("/login");
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.status === 400) {
        setError("Invalid Otp"); // Set the error message received from the server
      } else {
        console.error(error);
        setError(
          "An error occurred during Otp Verification . Please try again."
        );
      }
    }
  };

  return (
    <div>
      <small>otp send to tour register email</small>
      <input
        type="text"
        value={otp}
        onChange={handleOtpChange1}
        placeholder="Enter OTP"
        maxLength="6"
      />
      <button
        onClick={resendOtp}
        style={{
          border: "none",
          background: "none",
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Resend Otp
      </button>
      <button onClick={handleVerifyClick}>Verify</button>

      <h2>{setError}</h2>
    </div>
  );
};

export default OtpVerification;
