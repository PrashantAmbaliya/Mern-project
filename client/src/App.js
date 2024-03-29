import './App.css';
import { Routes, Route } from "react-router-dom"
import Homepage from './components/Homepage';
import Cart from './components/Cart';
import Signup from './components/Signup';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';



function App() {
  return (

    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        {/* <Route path='/:productID' element={}/> */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Routes>
      <ToastContainer />
    </div>

  );
}

export default App;
