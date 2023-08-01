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
  // tate to store status to handel loading
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
  
    try {
      // send data to backend and store it in data 
      const data = await axios.post(
        "http://localhost:8000/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",  // no need to specify header
          },
        }
      );
      // Redirect to home page after successful registration
      if (data) {
        setLoading(false);
        // if user registered but verification pending then redirect user to verification page
        if (data.data.userStatus == "PENDING") {
          alert(data.data.message);
          window.location.assign(`/otpverification/${email}`);
        }
      }
    } catch (error) {
      // Handle registration error
      setLoading(false);
      if (error.response && error.response.status === 400) {
        //user exit and verified then give aler and redirect to log page
        alert(error.response.data.message);
        localStorage.removeItem("access_token"); // remove value of local storage i.e similer to logout
        window.location.assign(`/login`); //redirect
      } else {
        console.error(error);
        // Handle other errors (if needed)
      }
    }
  };
  return (
    // if loading is start then show loading spinner else show nothing
    <>
      {" "}
      {loading && (
        <p className="loading">
          <span className="spinner"></span> Loading...
        </p>
      )}
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

          {/* if loading is start then make button disable  */}
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
