import React from "react";
import { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  console.log(formData);

  const { email } = formData;
  const [loading, setLoading] = useState(false);

  // to get a input value and set it 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [resetRequested, setResetRequested] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // send data to backend and store it in data
      const data = await axios.post(
        "http://localhost:8000/api/forgotpassword",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // no need to specify header
          },
        }
      );
      setLoading(false);
      setResetRequested(true);
      // Redirect to home page after successful registration
    } catch (error) {
      // Handle registration error
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      {/* for loading  */}
      {loading && (
        <p className="loading">
          <span className="spinner"></span> Loading...
        </p>
      )}
      {resetRequested ? (
        <p>
          Password reset link sent to your email. Check your inbox and follow
          the instructions.
        </p>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>

            {/* if loading is start then make button disable  */}
            <button type="submit" disabled={loading}>
              reset password
            </button>
          </form>
        </div>
      )}
    </>
  );
}
