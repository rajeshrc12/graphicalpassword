
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Circle from './Circle';
import Signup from "./Signup";
function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/circle' element={<Circle/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
