import React from "react";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <div>
            {/* <Navbar /> */}
            <Header />
            <Home />
          </div>
        }
      ></Route>
      {/* <Route path="/" element={<Home />}></Route> */}
    </Routes>
  );
}

export default App;
