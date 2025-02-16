import { createBrowserRouter } from "react-router-dom";
import Appuser from "../Components/User/Appuser";
import Appadmin from "../Components/Admin/Appadmin";
import Addproduct from "../Components/Admin/Addproduct";
import Addcategory from "../Components/Admin/Addcategory";
import Addbrand from "../Components/Admin/Addbrand";
import Dashboard from "../Components/Admin/Dashboard";
import Addprdt from "../Components/Admin/Addprdt";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Appuser />,
    },
    {
        path: "/admin",
        element: <Appadmin />,
        children: ([
            {
                path: "",
                element: <Dashboard />
            },
            {
                path: "add-product",
                element: <Addproduct />
            },
            {
                path: "add-category",
                element: <Addcategory />
            },
            {
                path: "add-brand",
                element: <Addbrand />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "add-products",
                element: <Addprdt />
            }
        ])
    }
])
