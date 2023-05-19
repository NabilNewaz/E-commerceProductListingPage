import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import LoginCheck from "./LoginCheck";
import Notfound from "../Pages/Notfound/Notfound";
import Profile from "../Pages/Profile/Profile";
import Privateroute from "./PrivateRoute";
import Purchase from "../Pages/Purchase/Purchase";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AllProducts from "../Pages/Dashboard/AllProducts";
import AddProduct from "../Pages/Dashboard/AddProduct";
import Signup from "../Pages/Signup/Signup";
import CategoryWiseProducts from "../Pages/CategoryWiseProducts/CategoryWiseProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <LoginCheck><Login></Login></LoginCheck>
      },
      {
        path: '/signup',
        element: <LoginCheck><Signup></Signup></LoginCheck>
      },
      {
        path: '/profile',
        element: <Privateroute><Profile></Profile></Privateroute>
      },
      {
        path: '/purchase/history',
        element: <Privateroute><Purchase></Purchase></Privateroute>
      },
      {
        path: '/category/:id',
        loader: ({ params }) => fetch(`https://fakestoreapi.com/products/category/${params.id}`),
        element: <CategoryWiseProducts></CategoryWiseProducts>
      },
      {
        path: "*",
        element: <Notfound></Notfound>
      }
    ],
  },
  {
    path: '/dashboard',
    element: <Privateroute><DashboardLayout></DashboardLayout></Privateroute>,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
      },
      {
        path: '/dashboard/all-products',
        element: <AllProducts></AllProducts>
      },
      {
        path: '/dashboard/add-product',
        element: <AddProduct></AddProduct>
      }
    ]
  }
])

export default router;