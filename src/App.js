import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import './App.css';

import EditUser from "./components/EditUser";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NewUser from "./components/NewUser";

function App() {
  return (
    <div>
      <Routers>
        <Navbar />
        <div className="container" style={{marginTop:'30px'}}>
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/newuser" element={<NewUser />} />
            <Route exact path="/edit/:id" element={<EditUser />} />
          </Routes>
        </div>
      </Routers>
    </div>
  );
}

export default App;
