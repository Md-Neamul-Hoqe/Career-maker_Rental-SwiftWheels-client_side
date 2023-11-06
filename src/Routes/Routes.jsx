import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Cars from "../Pages/Cars/Cars";
import Bikes from "../Pages/Bikes/Bikes";

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
        path: "/rent-car",
        element: <Cars></Cars>,
      },
      {
        path: "/rent-bike",
        element: <Bikes></Bikes>,
      },
    ],
  },
]);

export default Routes;
