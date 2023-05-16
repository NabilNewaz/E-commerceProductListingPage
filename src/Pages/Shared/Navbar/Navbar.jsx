import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { GiLoincloth } from "react-icons/gi";
import { RiMenuUnfoldFill } from "react-icons/ri";

const Navbar = () => {
    const location = useLocation();
    const [user, setUser] = useState([]);
    const handleLogOut = () => {

    }

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-1">
                            <li><NavLink to='/'>Home</NavLink></li>
                        </ul>
                    </div>
                    <Link to='/' className="ml-2 text-2xl md:hidden font-bold flex items-center normal-case"><GiLoincloth />eShop</Link>
                </div>
                <div className="navbar-center hidden md:block">
                    <Link to='/' className="font-bold text-3xl flex items-center normal-case"><GiLoincloth />eShop</Link>
                </div>
                <div className="navbar-end">
                    <button className="btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost mr-1 btn-circle hidden md:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <div className={(location.pathname.slice(1, 10) === 'dashboard') ? 'block lg:hidden' : 'hidden'}>
                        <label htmlFor="dashboard-drawer" className="btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost mr-1 btn-circle">
                            <RiMenuUnfoldFill className='text-2xl' />
                        </label>
                    </div>
                    <div className={user?.uid ? 'dropdown dropdown-end' : 'hidden'}>
                        <label tabIndex={0} className="btn btn-ghost hover:bg-base-content hover:text-base-200 btn-active btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co/X2xMzwL/defultuser.png'} alt='' />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box gap-1">
                            <li>
                                <div className='flex flex-col gap-0 justify-start bg-base-300'>
                                    <p className='font-bold text-warp'>{user?.displayName}</p>
                                    <p>{user?.email}</p>
                                </div>
                            </li>
                            <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                            <hr />
                            <li><button onClick={handleLogOut} to='/'>Logout</button></li>
                        </ul>
                    </div>
                    <div className={user?.uid ? 'hidden' : 'block'}>
                        <NavLink to='/login' state={{ from: location }} replace className={({ isActive }) => isActive ? 'btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost bg-base-content text-base-200' : 'btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost'}>Login</NavLink>
                    </div>
                    <div className={user?.uid ? 'hidden' : 'block ml-1'}>
                        <NavLink to='/signup' state={{ from: location }} replace className={({ isActive }) => isActive ? 'btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost bg-base-content text-base-200' : 'btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost'}>SignUP</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;