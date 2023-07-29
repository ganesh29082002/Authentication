import logo from './logo.svg';
import './App.css';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome';
import { BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
   <>
  
   
  

   <BrowserRouter>
   
   <Routes>
      <Route path='/' element={ <Welcome/>} />
      <Route path='/login' element={<LoginForm/>} />
      <Route path='/register' element={ <RegisterForm/>} />
    
  
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
