import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path:'/'
            }
        ]
    }
]);

export default Routes;