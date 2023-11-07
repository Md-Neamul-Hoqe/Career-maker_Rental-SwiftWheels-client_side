import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Cars from "../Pages/Cars/Cars";
import Bikes from "../Pages/Bikes/Bikes";
import SignIn from "../Pages/Credential/SignIn";
import SignUp from "../Pages/Credential/SignUp";
import AddService from "../Pages/AddService/AddService";
import MyServices from "../Pages/MyServices/MyServices";
import Schedules from "../Pages/Schedules/Schedules";
import Details from "../Pages/Details/Details";
import UpdateService from "../Pages/UpdateService/UpdateService";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "rent-car",
        element: <Cars></Cars>,
      },
      {
        path: "rent-bike",
        element: <Bikes></Bikes>,
      },
      {
        path: "services/:id",
        element: <Details></Details>,
      },
      {
        path: "add-service",
        element: <AddService></AddService>,
      },
      {
        path: "update-service/:id",
        element: <UpdateService></UpdateService>,
      },
      {
        path: "my-services",
        element: <MyServices></MyServices>,
      },
      {
        path: "schedules",
        element: <Schedules></Schedules>,
      },
      {
        path: "signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default Routes;
