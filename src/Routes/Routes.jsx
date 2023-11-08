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
import PrivateRoutes from "../Auth/PrivateRoutes";

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
        element: (
          <PrivateRoutes>
            <Details></Details>
          </PrivateRoutes>
        ),
      },
      {
        path: "add-service",
        element: (
          <PrivateRoutes>
            <AddService></AddService>
          </PrivateRoutes>
        ),
      },
      {
        path: "update-service/:id",
        element: (
          <PrivateRoutes>
            <UpdateService></UpdateService>
          </PrivateRoutes>
        ),
      },
      {
        path: "my-services",
        element: (
          <PrivateRoutes>
            <MyServices></MyServices>
          </PrivateRoutes>
        ),
      },
      {
        path: "schedules",
        element: (
          <PrivateRoutes>
            <Schedules></Schedules>
          </PrivateRoutes>
        ),
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
