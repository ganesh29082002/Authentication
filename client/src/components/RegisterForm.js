import React, { useState } from "react";
import "./RegisterForm.css";

import axios from "axios";

const RegisterForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // Extracting form data from the state
  const { first_name, last_name, email, password } = formData;

  // Handler function to update form data when input fields change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler function to submit the form data to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your logic for handling form submission here
    try {
      const data = await axios.post(
        "http://localhost:8000/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Redirect to home page after successful registration
      if (data) {
        window.location.assign('/');
      }
    } catch (error) {
      // Handle registration error
      if (error.response && error.response.status === 400) {
        alert('You have already registered');
        // Set the error message received from the server (if needed)
        localStorage.removeItem('access_token');
      } else {
        console.error(error);
        // Handle other errors (if needed)
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* First Name Input */}
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={first_name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Last Name Input */}
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={last_name}
            onChange={handleChange}
            required
          />
        </div>
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
        {/* Password Input */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
