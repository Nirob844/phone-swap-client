import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Products from "../../Pages/Products/Products/Products";
import CategoryProducts from "../../Pages/Products/Categories/Categories/CategoryProducts";
import CategoryLayout from "../../Layout/CategoryLayout";
import Login from "../../Pages/Login/Login/Login";
import SignUp from "../../Pages/Login/Signup/Signup";
import DashboardLayout from "../../Layout/DashboardLayout";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import Blog from "../../Pages/Blog/Blog";
import About from "../../Pages/About/About";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import SellerRoute from "../SellerRoute/SellerRoute";
import MyProduct from "../../Pages/Dashboard/MyProduct/MyProduct";


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
                path: "/blog",
                element: <Blog />,
            },
            {
                path: "/about",
                element: <About />,
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
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes>
            <DashboardLayout />
        </PrivateRoutes>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/my-orders',
                element: <MyOrders />
            },
            {
                path: '/dashboard/add-product',
                element: <SellerRoute><AddProduct /></SellerRoute>
            },
            {
                path: '/dashboard/my-product',
                element: <SellerRoute><MyProduct /></SellerRoute>
            },
            {
                path: '/dashboard/all-users',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
        ]
    }
]);