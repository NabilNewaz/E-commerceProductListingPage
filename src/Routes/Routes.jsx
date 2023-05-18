import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import LoginCheck from "./LoginCheck";
import Notfound from "../Pages/Notfound/Notfound";

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
          path: "*",
          element: <Notfound></Notfound>
        }
      ],
    },
  ])

  export default router;