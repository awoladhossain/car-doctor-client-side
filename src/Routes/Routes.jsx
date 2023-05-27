import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import LogIn from "../Pages/Login/LogIn";
import SingUp from "../Pages/SingUp/SingUp";
import BookServices from "../Pages/BookServices/BookServices";
import Bookings from "../Pages/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";
// import BookServices from "../Pages/BookServices/BookServices";

/* eslint-disable no-unused-vars */
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/login',
          element:<LogIn></LogIn>
        },
        {
          path: '/singup',
          element: <SingUp></SingUp>
        },
        {
          path: '/book/:id',
          element:<PrivateRoute><BookServices></BookServices></PrivateRoute>,
          loader: ({params})=> fetch(`https://newcar-project.vercel.app/services/${params.id}`)
        },
        {
          path: '/bookings',
          element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
        }
      ]
    },
  ]);
  export default router;