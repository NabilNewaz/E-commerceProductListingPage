import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { GiLoincloth } from "react-icons/gi";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { AuthContext } from '../../../Contexts/Authprovider/Authprovider';
import Spinner from '../Spinner/Spinner';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from 'react-use-cart';

const Navbar = () => {
    const { user, userDetails, Logout,loading } = useContext(AuthContext);
    const location = useLocation();
    const handleLogOut = () => {
        Logout();
    }

    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
      } = useCart();

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
                    <button className="btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost mr-1 btn-circle md:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <div className={userDetails?.id ? 'block' : 'hidden'}>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost mr-1 btn-circle md:flex"><AiOutlineShoppingCart className="h-5 w-5"></AiOutlineShoppingCart></label>
                            <ul tabIndex={0} className="dropdown-content menu mt-3 p-2 shadow bg-base-100 rounded-box gap-1">
                                {items.map((item) => (
                                    <li>
                                        <div className='flex flex-col md:flex-row bg-base-200 text-black'>
                                            <div className='flex gap-3'>
                                                <div className="avatar">
                                                    <div className="w-16 mask mask-squircle">
                                                        <img src={item.image} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className='w-40'>{item.title}</p>
                                                </div>
                                            </div>
                                            <div className='flex gap-3 items-center'>
                                                <div className="form-control">
                                                    <label className="input-group">
                                                        <span onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className='w-10 hover:bg-slate-950 hover:text-white cursor-pointer'>+</span>
                                                        <input disabled type="text" placeholder="1" value={item.quantity} className="input pointer-events-none input-bordered w-12 h-8" />
                                                        <span onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className='w-10 hover:bg-slate-950 hover:text-white cursor-pointer'>-</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <p className='font-semibold text-xl'>${item.itemTotal}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                <li>
                                    <div className='flex justify-between bg-primary text-white'>
                                        <div>
                                            <p className='font-semibold text-xl'>Total Price</p>
                                        </div>
                                        <div>
                                            <p className='font-semibold text-xl'>$250</p>
                                        </div>
                                    </div>
                                    <div className='mt-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold text-xl'>
                                        <button className="w-full">Purchase Now</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={loading ? 'block' : 'hidden'}>
                        <Spinner></Spinner>
                    </div>
                    <div className={loading ? 'hidden' : 'block'}>
                        <div className={(location.pathname.slice(1, 10) === 'dashboard') ? 'block lg:hidden' : 'hidden'}>
                            <label htmlFor="dashboard-drawer" className="btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost mr-1 btn-circle">
                                <RiMenuUnfoldFill className='text-2xl' />
                            </label>
                        </div>
                        <div className={userDetails?.id ? 'dropdown dropdown-end' : 'hidden'}>
                            <label tabIndex={0} className="btn btn-ghost hover:bg-base-content hover:text-base-200 btn-active btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL ? user?.photoURL : 'https://i.ibb.co/X2xMzwL/defultuser.png'} alt='' />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box gap-1">
                                <li>
                                    <div className='flex flex-col gap-0 justify-start bg-base-300'>
                                        <p className='font-bold text-warp capitalize'>{userDetails?.name?.firstname} {userDetails?.name?.lastname}</p>
                                        <p>{userDetails?.email}</p>
                                    </div>
                                </li>
                                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                                <hr />
                                <li><button onClick={handleLogOut} to='/'>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className={loading ? 'hidden' : 'block'}>
                        <div className={userDetails?.id ? 'hidden' : 'block'}>
                            <NavLink to='/login' state={{ from: location }} replace className={({ isActive }) => isActive ? 'btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost bg-base-content text-base-200' : 'btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost'}>Login</NavLink>
                        </div>
                    </div>
                    <div className={loading ? 'hidden' : 'block'}>
                        <div className={userDetails?.id ? 'hidden' : 'block ml-1'}>
                            <NavLink to='/signup' state={{ from: location }} replace className={({ isActive }) => isActive ? 'btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost bg-base-content text-base-200' : 'btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost'}>SignUP</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;