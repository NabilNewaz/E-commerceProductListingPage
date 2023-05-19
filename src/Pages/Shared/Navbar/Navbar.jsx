import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { GiLoincloth } from "react-icons/gi";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { AuthContext } from '../../../Contexts/Authprovider/Authprovider';
import Spinner from '../Spinner/Spinner';
import { AiOutlineShoppingCart, AiFillHome } from "react-icons/ai";
import { useCart } from 'react-use-cart';
import { MdDeleteForever } from "react-icons/md";
import Sticky from 'react-stickynode';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const { user, userDetails, Logout,loading } = useContext(AuthContext);
    const [apiLoading, isapiLoading] = useState(null);
    const location = useLocation();
    const handleLogOut = () => {
        Logout();
    }

const {
    isEmpty,
    emptyCart,
    totalUniqueItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    } = useCart();

    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

const handelPurchase = () =>{
    const resultCart = items.map(obj => ({ productId: obj.id, quantity: obj.quantity }));
    const current = new Date();
    const date = `${current.getFullYear()}-${current.toLocaleDateString('en-US', {month: '2-digit'})}-${current.toLocaleDateString('en-US', {day: '2-digit'})}`;
    axios.post('https://fakestoreapi.com/carts', {
            userId: userDetails.id,
            date: date,
            products:resultCart 
        }, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            isapiLoading(true);
            emptyCart();
            toast.success('Your Purchase Completed. Find Them in Purchse Report')
            isapiLoading(false);
        })
        .catch((error) => {
            toast.error('Your Purchase Not Completed');
        });
}


    return (
        <div className='sticky top-0 z-50'>
            <Sticky>
                <div className="navbar bg-base-100 md:px-10 px-2 lg:px-50">
                    <div className="navbar-start">
                        <div className="dropdown">
                        <NavLink to='/'>
                            <label tabIndex={0} className="btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost btn-circle">
                                <AiFillHome className="h-5 w-5"></AiFillHome>
                            </label>
                        </NavLink>
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
                            <div className={(location.pathname.slice(1, 10) === 'dashboard') ? 'hidden' : 'block dropdown dropdown-end'}>
                                <label tabIndex={0} className="btn bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost mr-1 btn-circle md:flex"><div className={isEmpty ? 'hidden' : 'badge absolute top-[-5px] right-[-2px]'}>{totalUniqueItems}</div><AiOutlineShoppingCart className="h-5 w-5"></AiOutlineShoppingCart></label>
                                <ul tabIndex={0} className="dropdown-content grid overflow-x-hidden menu mt-3 p-2 shadow max-h-[80vh] w-69 bg-base-100 rounded-box gap-1">
                                    {items.map((item) => (
                                        <li key={item.id}>
                                            <div className='flex flex-col md:flex-row bg-base-200 text-black justify-between'>
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
                                                <div className='flex justify-between gap-3 items-center'>
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
                                                    <div>
                                                        <span onClick={() => removeItem(item.id)} className="btn bg-base-300 hover:bg-gray-700 hover:text-white btn-ghost btn-circle"><MdDeleteForever className="text-2xl text-red-500"></MdDeleteForever></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    <li className={isEmpty ? 'block' : 'hidden'}>
                                        <div>
                                            <p className='md:w-96 w-60 py-16 text-slate-400 flex justify-center text-xl font-bold'>Your Cart Is Empty</p>
                                        </div>
                                    </li>
                                    <li className={isEmpty ? 'hidden' : 'block'}>
                                        <div className='flex justify-between bg-primary text-white'>
                                            <div>
                                                <p className='font-semibold text-xl'>Total Price</p>
                                            </div>
                                            <div>
                                                <p className='font-semibold text-xl'>${cartTotal.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div onClick={()=> handelPurchase()} className={apiLoading ? 'btn mt-2 loading bg-gray-600 hover:bg-gray-700 text-white font-semibold text-xl' : 'btn mt-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold text-xl'}>
                                            <button className='mt-[-5px]'>Purchase Now</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={loading ? 'block' : 'hidden'}>
                            <Spinner></Spinner>
                        </div>
                        <div className={loading ? 'hidden' : 'flex'}>
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
                                        <div className='flex flex-col gap-0 justify-start bg-base-300 pointer-events-none'>
                                            <p className='font-bold text-warp capitalize'>{userDetails?.name?.firstname} {userDetails?.name?.lastname}</p>
                                            <p>{userDetails?.email}</p>
                                        </div>
                                    </li>
                                    <li onClick={ScrollToTop}><NavLink to='/profile'>Profile</NavLink></li>
                                    <li onClick={ScrollToTop} className={userDetails.id == 1 ? 'block' : 'hidden'}><NavLink to='/dashboard'>Dashboard</NavLink></li>
                                    <li onClick={ScrollToTop}><NavLink to='/purchase/history'>Purchase Report</NavLink></li>
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
            </Sticky>
        </div>
    );
};

export default Navbar;