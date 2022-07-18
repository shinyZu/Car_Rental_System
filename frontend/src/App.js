import React from "react";
import "./App.css";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Navbar from "./components/NavBar/Navbar";
import About from "./pages/About/About";
import Garage from "./pages/Garage/Garage";
import Main from "./pages/Main";
import MyDialog from "./components/Dialog/Dialog";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <div>
            <Home />
            <Main />
          </div>
        }
      ></Route>
      {/* <Route path="/about" element={<About />}></Route> */}
    </Routes>
  );
}

export default App;
