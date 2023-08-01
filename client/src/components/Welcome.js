import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const [getdata, setdata] = useState([]);
  const handleLogout = () => {
    // Clear the access_token from localStorage when logging out
    localStorage.removeItem("access_token");
    // Redirect the user to the login page or home page after logout
    // You can add your own redirect logic based on your routes
    window.location.assign("/login");
  };
  useEffect((req, res) => {
    if (!localStorage.getItem("access_token")) {
      window.location.assign("/login");
    }
    GetUser();

    //  setdata(response)
  }, []);
  const GetUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api", {
        headers: {
          Authorization: `${localStorage.getItem("access_token")}`,
        },
      });

      console.log(response.data);
      setdata(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const isAuthenticated = localStorage.getItem("access_token") !== null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>
        Wellcome {getdata.email} and your name is {getdata.first_name}
      </h1>
      {isAuthenticated ? (
        <>
          {/* Show the logout button if the user is authenticated */}
          <button onClick={handleLogout}> Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
