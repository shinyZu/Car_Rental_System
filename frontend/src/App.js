import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Car from "./pages/Car/CarDetail";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {
  const [renderView, setRenderView] = useState("main");
  const [carDetails, setCarDetails] = useState(null);
  const [indexOfArray, setIndexOfArray] = useState();
  const [openModal, setOpenModal] = useState(false);

  function switchRenderView(view, data, index) {
    console.log("switched view");
    setRenderView(view);
    setCarDetails(data);
    setIndexOfArray(index);
    setOpenModal(true);
  }

  {
    switch (renderView) {
      case "main":
        console.log("main view");
        return (
          <Routes>
            <Route
              path="/"
              exact
              element={<Home onSwitch={switchRenderView} />}
            ></Route>
          </Routes>
        );

      case "img":
        return (
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Car
                  carInfo={carDetails}
                  selectedCar={indexOfArray}
                  onSwitch={switchRenderView}
                />
              }
            ></Route>
          </Routes>
        );
      case "about":
        return (
          <Routes>
            <Route
              path="/"
              exact
              element={<Home onSwitch={switchRenderView} />}
            ></Route>
          </Routes>
        );

      case "garage":
        return (
          <Routes>
            <Route
              path="/"
              exact
              element={<Home onSwitch={switchRenderView} />}
            ></Route>
          </Routes>
        );

      case "register":
        return (
          <Routes>
            <Route
              path="/"
              exact
              element={
                <div>
                  <Home onSwitch={switchRenderView} />
                  <Register
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                  />
                </div>
              }
            ></Route>
          </Routes>
        );

      default:
        break;
    }
  }
}

export default App;
