const User = require("../model/User");
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const OtpSchema = require("../model/userOtpModel")
require("dotenv").config();


require("dotenv").config();
// new way
// exports.register =(req,res,next)=>{
//     res.send("register Route")
// }

// Generate random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}; 

const register = async (req, res, next) => {
  
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          return res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email :email });
        console.log(oldUser)
        if (oldUser) {
          res.status(400).json({message :"User Already Exist. Please Login"});
          return ;
        }
    
        //Encrypt user password
        const salt = await bcrypt.genSalt(10);
        encryptedPassword = await bcrypt.hash(password, salt);
    
        // Create user in our database
        const user = await User.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
      return  res.status(201).json(user);
      } catch (err) {
        return  res.status(400).json({message:"duplicate key"});
      }
};

const sendOtp = async(req,res)=>{
  try {
    
    const {email} = req.body;
    console.log(email)
    const transporter = nodemailer.createTransport({
      // Replace with your email provider settings
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL, // Replace with your email address
        pass: process.env.PASSWORD, // Replace with your email password or use an app-specific password
      },
    });
   const generatedOTP = generateOTP();
    const mailOptions = {
      from: process.env.EMAIL, // Replace with your email address
      to: email,
      subject: 'OTP Verification for Register',
      text: `Your OTP for verification is: ${generatedOTP}`,
    };

    const oldUser = await OtpSchema.findOne({ email :email });
        console.log(oldUser)
        if (oldUser) {
          res.status(400).json({message :"User Already Exist. Please Login"});
          return ;
        }
    
        //Encrypt user password
        const salt = await bcrypt.genSalt(10);
        encryptedOtp = await bcrypt.hash(generatedOTP, salt);
    
        // Create user in our database
        const otp = await OtpSchema.create({
          email: email.toLowerCase(),
          otp:encryptedOtp,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          createdAt:Date.now(),
          expiresAt:Date.now() + 360000  /// valide for 6 hour
        });
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success:true,
      message:"otp send sucessfull"
    })
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(400).json({
      success:false,
      message:"otp send sucessfull"
    })
  }
}

const verifyOtp =async(req,res)=>{
const{otp , email} = req.body;
try {
  const oldUser = await OtpSchema.findOne({ email :email });
  console.log(oldUser)
  if(oldUser.expiresAt < Date.now()){
    User.updateOne({email:email},{verified :true})
     res.status(400).json({
      success: "Not verified",
      message:"otp verification time out"
  
    })
  }
  if(oldUser && (await bcrypt.compare(otp, oldUser.otp))) {
    await OtpSchema.deleteMany({ email :email })
  res.status(200).json({
    success: "verified",
    message:"otp verified sucessfull"

  })
  } else{
    res.status(400).json({
      success: "Not verified",
      message:"otp verification feild"
  
    })
  }
} catch (error) {
  console.error('Error sending email:', error);
  res.status(400).json({
    success:false,
    message:"otp verification feild"
  })
  
}



}

const login = async(req, res, next) => {
  // res.send("login Route");
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
      return
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email :email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        // {
        //   expiresIn: "2h",
        // }
      );

      // save user token
      user.token = token;
      // await user.save();
      // user
      return res.cookie("access_token", token, {
        httpOnly: true,
        secure:false,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "none", // Add this line to allow cross-site cookies (if needed)
      })
      .status(200)
      .json(user);

    }
    else{ 
     return  res.status(400).json({message : "Invalid Credentials"});}
   
  } catch (err) {
    
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

};

const forgotpassword = (req, res, next) => {
  res.send("forgotpassword Route");
};

const resetpassword = (req, res, next) => {
  res.send("resetpassword Route");
};

const wlcom = async(req, res, next) => {
  try {
    const data = await User.findById(req.user.user_id);
    res.json(data);
    // console.log(res.json(product))
  } catch (error) {
    res.json({ message: error });
  }
    // res.send(req.user);
    return
  };
 
  const noRouteFound=(req, res) => {
    res.status(404).json({
      success: "false",
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      },
    }); }
module.exports = {
  register,
  sendOtp,
  login,
  forgotpassword,
  resetpassword,
  wlcom,
  noRouteFound,
  verifyOtp
};
