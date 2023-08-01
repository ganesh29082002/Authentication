const auth = require("../middelware/Authentication");
const { register,login,forgotpassword,resetpassword,wlcom, noRouteFound,sendOtp,verifyOtp} = require("../controllers/Authentication");

const router = require("express").Router();
router.post("/register",register);
router.post("/sendotp",sendOtp);
router.post("/verifyOtp",verifyOtp);
router.post("/login",login);
router.post("/forgotpassword",forgotpassword);
router.post("/resetpassword/:token",resetpassword);
router.get("/",auth,wlcom);
router.post("*",noRouteFound);



module.exports= router;