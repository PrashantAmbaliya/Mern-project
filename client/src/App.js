import './App.css';
import {Routes, Route} from "react-router-dom"
import Homepage from './components/Homepage';
import Cart from './components/Cart';
import Signup from './components/Signup';


function App() {
  return (
    <div className="App">
      
      <Routes>
          <Route path='/' element={<Homepage />}/>
          {/* <Route path='/:productID' element={}/> */}
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/signup' element={<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;
