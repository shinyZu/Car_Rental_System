import React, { useState } from "react";
import "./App.css";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Navbar from "./components/NavBar/Navbar";
import About from "./pages/About/About";
import Garage from "./pages/Garage/Garage";
import Main from "./pages/Main";
import MyDialog from "./components/Dialog/Dialog";
import CarInfo from "./pages/Car/CarInfo";
import Car from "./pages/Car/Car";

function App() {
  const [renderView, setRenderView] = useState("main");

  function switchRenderView(view) {
    console.log("switched view");
    setRenderView(view);
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
        // return <Car />;
        return (
          <Routes>
            <Route
              path="/"
              exact
              element={<Car onSwitch={switchRenderView} />}
            ></Route>
          </Routes>
        );
      case 2:
        break;

      default:
        break;
    }
  }

  // return (
  // <Routes>
  //   <Route path="/" exact element={<Home />}></Route>
  // </Routes>

  // <Router>
  //   <Navbar />
  //   <Switch>
  //     <Route path="/" component={Home} />
  //     <Route path="/about" component={About} />
  //     {/* <Route path="*" component={NotFound} /> */}
  //   </Switch>
  // </Router>
  // );
}

export default App;
