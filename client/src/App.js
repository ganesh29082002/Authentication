import logo from './logo.svg';
import './App.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import OtpVerification from './components/OtpVerification';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
   <>
  
   
  

   <BrowserRouter>
   
   <Routes>
      <Route path='/' element={ <Welcome/>} />
      <Route path='/login' element={<LoginForm/>} />
      <Route path='/register' element={ <RegisterForm/>} />
      <Route path='/otpverification/:email' element={<OtpVerification/>} />
      <Route path='/forgetpassword' element={<ForgotPassword/>} />
      <Route path='/resetpassword/:token' element={<ResetPassword/>} />



    
  
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
