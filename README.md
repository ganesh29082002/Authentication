Sure! I've added the frontend and backend dependencies to the README file. Here's the updated README:

# MERN Stack Authentication with JWT and Nodemailer

<p align="center">
  <img src="https://living.acg.aaa.com/content/dam/aaa-living/devtest/what-is-two-factor-authentication.gif" alt="Authentication Gif" width="700"/>
</p>

This project is a complete authentication system implemented in the MERN (MongoDB, Express, React, Node.js) stack. It includes essential features such as user registration, login, logout, password reset, and forgot password functionality. JSON Web Tokens (JWT) are used for secure authentication, and Nodemailer is integrated to handle password reset emails.
---
<span style="color:#0366d6">**Note:** The code for this project is available in the "master" branch. Please make sure to switch to the "master" branch to access the complete and latest version of the code.</span>
---
## Prerequisites

Before running the project, make sure you have the following prerequisites installed:

1. **Node.js**: Node.js is a JavaScript runtime that allows you to run JavaScript code outside of a web browser. You can download and install Node.js from the official website: [https://nodejs.org/](https://nodejs.org/)

2. **MongoDB**: MongoDB is a popular NoSQL database used for storing and retrieving data. You can download and install MongoDB from the official website: [https://www.mongodb.com/](https://www.mongodb.com/)

3. **React.js**: React.js is a popular JavaScript library used for building user interfaces. To install React.js, you can use the following command:

```bash
npx create-react-app your_app_name
cd your_app_name
```

## Frontend Dependencies

```json
"dependencies": {
  "axios": "^1.4.0",
  "cookie-parser": "^1.4.6",
  "react": "^18.2.0",
  "react-bootstrap": "^2.8.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.14.2",
  "react-scripts": "^5.0.1",
  "web-vitals": "^2.1.4"
}
```

## Backend Dependencies

```json
"dependencies": {
  "axios": "^1.4.0",
  "bcrypt": "^5.1.0",
  "bcryptjs": "^2.4.3",
  "body-parser": "^1.20.2",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.1",
  "mongoose": "^7.4.0",
  "multer": "^1.4.5-lts.1",
  "nodemailer": "^6.9.4",
  "nodemon": "^3.0.1",
  "validator": "^13.9.0"
}
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your_username/your_repository.git
cd your_repository
```

2. Install server dependencies:

```bash
cd server
npm install
```

3. Install client dependencies:

```bash
cd client
npm install
```

4. Set up environment variables:

Create a `.env` file in the `server` directory and add the following variables:

```bash
PORT=3000            # Port on which the server will run
MONGO_URI=your_uri   # MongoDB connection string
JWT_SECRET=your_secret   # Secret key for JWT token generation
EMAIL_USERNAME=your_email_username   # Email account for Nodemailer (e.g., Gmail)
EMAIL_PASSWORD=your_email_password   # Email account password for Nodemailer
```

5. Run the application:

In one terminal, start the server:

```bash
cd server
npm start
```

In another terminal, start the React app:

```bash
cd client
npm start
```

The server will start running on the specified port (default is 3000), and the React app will be accessible on [http://localhost:3000](http://localhost:3000).

## Usage

### User Registration

- Navigate to the registration page and provide your email and password to create an account.

### User Login

- On the login page, enter your registered email and password to log in to your account.

### User Logout

- To logout, click the "Logout" button, which will end your current session.

### Password Reset

- If you forget your password, click the "Forgot Password" link on the login page.
- Provide your registered email address to receive a password reset link via email.

### Forgot Password

- Check your email inbox for the password reset link.
- Click on the link and follow the instructions to reset your password.

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, please open an issue or submit a pull request.

---

Feel free to use and modify this authentication system in your MERN stack projects. If you have any questions or need further assistance, please don't hesitate to reach out.

**Happy coding!**
