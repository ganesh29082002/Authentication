import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


const LoginForm = () => {
  // State to store form data and error messages
  const [FormData, setFormData] = useState({
    email: '',
    password: ''
  });
  // to set error if any eeror occurs
  const [error, setError] = useState('');
    // tate to store status to handel loading
    const [loading, setLoading] = useState(false);

  // Handler function to update form data when input fields change
  const handleChanage = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
    setError(''); // Clear any previous error when the user starts typing again
  };

  // Extracting form data from the state
  const { email, password } = FormData;

  // Handler function to submit the form data to the server
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await axios.post("http://localhost:8000/api/login", FormData);

      if (data.status === 200) {
        setLoading(false);
        const user = data.data;
        localStorage.setItem('access_token', user.token);
        window.location.assign('/');
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.status === 400) {
        setLoading(false);
        console.log(error)
        localStorage.removeItem('access_token');
        setError(error.response.data.message); // Set the error message received from the server
      } else {
        console.error(error);
        setError('An error occurred during login. Please try again.');
      }
    }
  };

  return (
   <>
     {loading && (
        <p className="loading">
          <span className="spinner"></span> Loading...
        </p>
      )}
    <div className="login-container">
      {/* Error message display */}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name='email'
            onChange={handleChanage}
            value={email}
            required
            placeholder="Enter your email"
          />
        </div>
        {/* Password Input */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name='password'
            onChange={handleChanage}
            value={password}
            required
            placeholder="Enter your password"
          />
        </div>
        {/* Submit Button */}
        <button type="submit">Login</button><br />
      <Link to="/forgetpassword">Forget Password</Link>
      </form>
      {/* Registration link */}
      <h3> Or</h3>
      <Link to="/register">New User Registration</Link>
    </div>
    </>
  );
};

export default LoginForm;
