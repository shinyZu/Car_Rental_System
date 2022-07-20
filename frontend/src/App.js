import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Car from "./pages/Car/Car";

function App() {
  const [renderView, setRenderView] = useState("main");
  const [carDetails, setCarDetails] = useState(null);
  const [indexOfArray, setIndexOfArray] = useState();

  function switchRenderView(view, data, index) {
    console.log("switched view");
    setRenderView(view);
    setCarDetails(data);
    setIndexOfArray(index);
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
