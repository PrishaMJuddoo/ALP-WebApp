<<<<<<< Updated upstream
import React from "react";
import Index from "./pages/Index";
=======
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminIndex from "./pages/AdminIndex";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
=======
import AddTeacher from "./pages/AddTeacher";
import AddClass from "./pages/AddClass";
import TeacherIndex from "./pages/TeacherIndex";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const [token, setToken] = useState(null);
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    const storedRoleId = window.localStorage.getItem("role_id");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedRoleId) {
      setRoleId(storedRoleId);
    }
  }, []);

  useEffect(() => {
    console.log("Current token:", token);
    console.log("Current role_id:", roleId);
  }, [token, roleId]);

>>>>>>> Stashed changes
  return (
    <div className="App">
      <Router>
        <Routes>
<<<<<<< Updated upstream
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
=======
          <Route path="/Login" element={<Login setToken={setToken} setRoleId={setRoleId} />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route element={<PrivateRoutes token={token} />}>
            <Route path="/" element={<Navigate to={roleId === '1' ? '/admin' : '/teacher'} />} />
            <Route path="/admin" element={<AdminIndex />} />
            <Route path="/teacher" element={<TeacherIndex />} />
            <Route path="/Error" element={<Error />} />
            <Route path="/Blank" element={<Blank />} />
            <Route path="/Buttons" element={<Buttons />} />
            <Route path="/Cards" element={<Cards />} />
            <Route path="/Charts" element={<Charts />} />
            <Route path="/Tables" element={<Tables />} />
            <Route path="/Animation" element={<Animation />} />
            <Route path="/Border" element={<Border />} />
            <Route path="/Color" element={<Color />} />
            <Route path="/Other" element={<Other />} />
            <Route path="/AddSchool" element={<AddSchool />} />
            <Route path="/AddTeacher" element={<AddTeacher />} />
            <Route path="/AddClass" element={<AddClass />} />
          </Route>
>>>>>>> Stashed changes
        </Routes>
      </Router>
    </div>
  );
}

export default App;
