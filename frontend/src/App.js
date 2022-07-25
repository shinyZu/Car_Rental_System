import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CarDetail from "./pages/Car/CarDetail";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import MyBooking from "./pages/Customer/MyBookings/MyBooking";
import MyPayments from "./pages/Customer/MyPayments/MyPayments";
import Confirmation from "./pages/Customer/Confirmation/Confirmation";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import ViewCustomerPage from "./pages/Admin/ViewCustomers/ViewCustomer";
import Income from "./pages/Admin/Income/Income";
import ManageDrivers from "./pages/Admin/Drivers/Driver";
import RentalRequests from "./pages/Admin/Rentals/Rentals";
import RentalReturns from "./pages/Admin/Returns/Returns";
import Maintenance from "./pages/Admin/Maintenance/Maintenance";
import ManageCar from "./pages/Admin/ManageCars/ManageCar";
import NotFound from "./pages/Session/NotFound";
import DriverSchedule from "./pages/Driver/Driver";
import { AuthProvider } from "./pages/Session/Auth";
import TestLogin from "./pages/Login/Test/TestLogin";
import Profile from "./pages/Login/Test/Profile";
import RequireAuth from "./pages/Session/RequireAuth";
import MyProfile from "./pages/Customer/MyProfile/MyProfile";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/car_details" element={<CarDetail />}></Route>
        <Route
          path="/my_bookings"
          element={
            <RequireAuth>
              <MyBooking />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/my_payments"
          element={
            <RequireAuth>
              <MyPayments />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/my_profile"
          element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/confirmation_details"
          element={
            <RequireAuth>
              <Confirmation />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/manage_car"
          element={
            <RequireAuth>
              <ManageCar />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/manage_customer"
          element={
            <RequireAuth>
              <ViewCustomerPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/manage_driver"
          element={
            <RequireAuth>
              <ManageDrivers />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/rental_requests"
          element={
            <RequireAuth>
              <RentalRequests />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/return_details"
          element={
            <RequireAuth>
              <RentalReturns />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/maintenance"
          element={
            <RequireAuth>
              <Maintenance />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/income"
          element={
            <RequireAuth>
              <Income />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/driver_schedule"
          element={
            <RequireAuth>
              <DriverSchedule />
            </RequireAuth>
          }
        ></Route>
        <Route path="*" element={<NotFound />} />

        <Route
          path="/driver_profile"
          element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          }
        />
        {/* //------------------------ */}
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="/testLogin" element={<TestLogin />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

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
