import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Sticky from 'react-stickynode';

const MainLayout = () => {
    return (
        <div className='flex flex-col h-screen justify-between'>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='md:px-10 px-0 lg:px-50'>
                <Outlet></Outlet>
            </div>
            <div className='md:px-10 px-0 lg:px-50'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;