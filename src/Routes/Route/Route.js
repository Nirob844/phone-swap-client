import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Products from "../../Pages/Products/Products/Products";
import CategoryProducts from "../../Pages/Products/Categories/Categories/CategoryProducts";
import CategoryLayout from "../../Layout/CategoryLayout";
import Login from "../../Pages/Login/Login/Login";
import SignUp from "../../Pages/Login/Signup/Signup";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },

        ],
    },
    {
        path: "/products",
        element: <CategoryLayout />,
        children: [
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/products/:category",
                element: <CategoryProducts />,
            },
        ]
    }
]);