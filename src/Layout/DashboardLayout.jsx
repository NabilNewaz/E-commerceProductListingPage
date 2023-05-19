import React, { useEffect, useState } from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import jwt_decode from "jwt-decode";

const DashboardLayout = () => {
    const [isAdmin, setIsAdmin] = useState(null)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const decodedToken = jwt_decode(localStorage.getItem('token'));
            if (decodedToken.sub === 1) {
                setIsAdmin(true);
            }
        };
    }, []);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 lg:bg-transparent text-base-content gap-2 md:pl-10">
                        {
                            isAdmin && <>
                                <li className="bg-base-300 rounded-lg"><NavLink to='/dashboard/all-products'>All Products</NavLink></li>
                                <li className="bg-base-300 rounded-lg"><NavLink to='/dashboard/add-product'>Add Product</NavLink></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
            <div className='md:px-10 px-0 lg:px-50'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default DashboardLayout;