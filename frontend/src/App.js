import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CarDetail from "./pages/Car/CarDetail";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import MyBooking from "./pages/Customer/MyBookings/MyBooking";

function App() {
  // const [renderView, setRenderView] = useState("main");
  // const [carDetails, setCarDetails] = useState(null);
  // const [myBookings, setMyBookings] = useState(null);
  // const [indexOfArray, setIndexOfArray] = useState();
  // const [openModal, setOpenModal] = useState(false);

  // function switchRenderView(view, data, index) {
  //   console.log("switched view");
  //   setRenderView(view);
  //   setCarDetails(data);
  //   setIndexOfArray(index);
  //   setOpenModal(true);
  // }

  // {
  //   switch (renderView) {
  //     case "main":
  //       console.log("main view");
  //       return (
  //         <Routes>
  //           <Route
  //             path="/"
  //             exact
  //             element={<Home onSwitch={switchRenderView} />}
  //           ></Route>
  //         </Routes>
  //       );
  //     // return (
  //     //   <Routes>
  //     //     <Route
  //     //       path="/"
  //     //       exact
  //     //       element={<Home onSwitch={switchRenderView} />}
  //     //     ></Route>
  //     //     <Route
  //     //       path="my_bookings"
  //     //       element={<MyBooking onSwitch={switchRenderView} />}
  //     //     ></Route>
  //     //   </Routes>
  //     // );

  //     case "img":
  //       return (
  //         <Routes>
  //           <Route
  //             path="/"
  //             exact
  //             element={
  //               <CarDetail
  //                 carInfo={carDetails}
  //                 selectedCar={indexOfArray}
  //                 onSwitch={switchRenderView}
  //               />
  //             }
  //           ></Route>
  //         </Routes>
  //       );
  //     case "about":
  //       return (
  //         <Routes>
  //           <Route
  //             path="/"
  //             exact
  //             element={<Home onSwitch={switchRenderView} />}
  //           ></Route>
  //         </Routes>
  //       );

  //     case "garage":
  //       return (
  //         <Routes>
  //           <Route
  //             path="/"
  //             exact
  //             element={<Home onSwitch={switchRenderView} />}
  //           ></Route>
  //         </Routes>
  //       );

  //     case "register":
  //       return (
  //         <Routes>
  //           <Route
  //             path="/"
  //             exact
  //             element={
  //               <div>
  //                 <Home onSwitch={switchRenderView} />
  //                 <Register
  //                   open={openModal}
  //                   onClose={() => setOpenModal(false)}
  //                 />
  //               </div>
  //             }
  //           ></Route>
  //         </Routes>
  //       );

  //     case "my_bookings":
  //       return (
  //         <Routes>
  //           <Route
  //             path="my_bookings"
  //             element={<MyBooking onSwitch={switchRenderView} />}
  //           ></Route>
  //         </Routes>
  //       );

  //     default:
  //       return (
  //         <Routes>
  //           <Route
  //             path="my_bookings"
  //             element={<MyBooking onSwitch={switchRenderView} />}
  //           ></Route>
  //         </Routes>
  //       );
  //       break;
  //   }
  // }

  return (
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route path="/car_details" element={<CarDetail />}></Route>
      <Route path="/my_bookings" element={<MyBooking />}></Route>
    </Routes>
  );
}

export default App;
