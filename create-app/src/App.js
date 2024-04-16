import Index from "./pages/Index";
import Error from "./pages/Error";
import Blank from "./pages/Blank";
import Buttons from "./pages/Buttons";
import Cards from "./pages/Cards";
import Charts from "./pages/Charts";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tables from "./pages/Tables";
import Animation from "./pages/Animation";
import Border from "./pages/Border";
import Color from "./pages/Color";
import Other from "./pages/Other";
import AddSchool from "./pages/AddSchool";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check local storage for login state during component initialization
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setToken(true); // Set token state to true if user is logged in
    }
  }, []);

  // Log token whenever it's updated
  console.log("Current token:", token);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes token={token} />}>
            <Route path="/" element={<Index token={token} />} />
            <Route path="/Error" element={<Error token={token} />} />
            <Route path="/Blank" element={<Blank token={token} />} />
            <Route path="/Buttons" element={<Buttons token={token} />} />
            <Route path="/Cards" element={<Cards token={token} />} />
            <Route path="/Charts" element={<Charts token={token} />} />

            <Route path="/Tables" element={<Tables token={token} />} />
            <Route path="/Animation" element={<Animation token={token} />} />
            <Route path="/Border" element={<Border token={token} />} />
            <Route path="/Color" element={<Color token={token} />} />
            <Route path="/Other" element={<Other token={token} />} />
            <Route path="/AddSchool" element={<AddSchool token={token} />} />
          </Route>

          <Route path="/Login" element={<Login setToken={setToken} />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
