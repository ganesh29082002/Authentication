 const express  =require("express");
 const router = require("./routes/AuthenicationRoutes")
 const cookieParser = require("cookie-parser");
 const bodyParser=  require("body-parser")

 require("dotenv").config();
 require("./config/Database").connect();
const cors = require("cors");
const app = express();

app.use(cookieParser());
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api", router);

 

 app.listen(process.env.PORT ,() =>{
    console.log(`server is running on port ${process.env.PORT}`)
 })