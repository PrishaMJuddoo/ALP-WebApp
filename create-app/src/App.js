import React from "react";
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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Error" element={<Error />} />
          <Route path="/Blank" element={<Blank />} />
          <Route path="/Buttons" element={<Buttons />} />
          <Route path="/Cards" element={<Cards />} />
          <Route path="/Charts" element={<Charts />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Tables" element={<Tables />} />
          <Route path="/Animation" element={<Animation />} />
          <Route path="/Border" element={<Border />} />
          <Route path="/Color" element={<Color />} />
          <Route path="/Other" element={<Other />} />
          <Route path="/AddSchool" element={<AddSchool />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
