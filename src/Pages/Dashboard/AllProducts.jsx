import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Spinner from '../Shared/Spinner/Spinner';

const AllProducts = () => {
    const[isAdmin, setIsAdmin] = useState(null);
    const [productDetails, setPeoductDetails] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let closeDeleteModalBtn = document.getElementById('delete-modal-close');
    const closeDeleteModal = () => {
        closeDeleteModalBtn.click();
    }

    let closeEditModalBtn = document.getElementById('edit-modal-close');
    const closeEditModal = () => {
        closeEditModalBtn.click();
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            const decodedToken = jwt_decode(localStorage.getItem('token'));
            if(decodedToken.sub === 1){
                setIsAdmin(true);
            }
        };
      }, []);
    const navigate = useNavigate();

    const navigateNotAdmin = () => {
        navigate('/')
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            if(!isAdmin){
                navigateNotAdmin();
                toast.error('You Are Not Admin')
            }
        }, 50);
        return () => clearTimeout(timer);
    });


    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products`)
          .then(response => {
            setAllProducts(response.data)
            setIsLoading(false);
          })
          .catch(error => {
            toast.error('API Not Working Properly');
            console.log(error);
            setIsLoading(false);
          });
      }, []);;
    
    const handleProductDelete = (productID) => {
        axios.delete(`https://fakestoreapi.com/products/${productID}`)
            .then(function () {
                closeDeleteModal();
                toast.success('Product Deleted')
            })
            .catch(function () {
                toast.error('Something Went Wrong')
            });
    }

    return (
        <PhotoProvider>
            <div className='pt-2 md:px-10 lg:pl-0 px-2 lg:px-50'>
                <Helmet>
                    <title>All Products - Admin Dashboard - eShop</title>
                </Helmet>
                <div>
                    <p className='text-2xl uppercase font-semibold'>all product</p>
                    <p className='mb-4 uppercase text-sm'>all of your product for manage</p>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Product Title</th>
                                <th>Product Price</th>
                                <th className='flex justify-center'>Actions</th>
                            </tr>
                        </thead>
                        <div>
                            <input type="checkbox" id="productdeleteConferm-modal" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <label id="delete-modal-close" htmlFor="productdeleteConferm-modal" type="button" className="cursor-pointer absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </label>
                                    <div className="p-6 text-center">
                                        <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                        <button onClick={() => handleProductDelete(productDetails.id)} htmlFor="productdeleteConferm-modal" data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Yes, I'm sure
                                        </button>
                                        <label htmlFor="productdeleteConferm-modal" data-modal-toggle="popup-modal" type="button" className="cursor-pointer text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" id="producteditModal-modal" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <label id="edit-modal-close" htmlFor="producteditModal-modal" type="button" className="cursor-pointer absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </label>
                                    <div className="p-6 text-center">
                                        <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to advertise this product?</h3>
                                        <button htmlFor="productdeleteConferm-modal" data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Yes, I'm sure
                                        </button>
                                        <label htmlFor="producteditModal-modal" data-modal-toggle="popup-modal" type="button" className="cursor-pointer text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <tbody>
                            <tr className={(allProducts.length <= 0) ? '' : 'hidden'}>
                                <th colSpan="8" className='py-10'>
                                    <div className={ isLoading ? 'block' : 'hidden'}>
                                        <Spinner></Spinner>
                                    </div>
                                    <p className={ isLoading ? 'hidden' : 'text-center text-xl text-gray-400'}>No Products Details</p>
                                </th>
                            </tr>
                            {allProducts.map((product, index) =>
                                <>
                                    <tr key={index}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <PhotoView key={index} src={product.image}>
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={product.image} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </PhotoView>
                                                </div>
                                                <div>
                                                    <div>
                                                        <p>{(product.title).split(' ').slice(0, 5).join(' ')}</p>
                                                        <p>{(product.title).split(' ').slice(5, 10).join(' ')}</p>
                                                        <p>{(product.title).split(' ').slice(10, 15).join(' ')}</p>
                                                        <p>{(product.title).split(' ').slice(15, 20).join(' ')}</p>
                                                    </div>
                                                    <div className="text-sm opacity-50 capitalize">{(product.category)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className='font-semibold'>${product.price}</span>
                                        </td>
                                        <th>
                                            <th className='flex justify-center'>
                                                <label onClick={() => setPeoductDetails(product)} htmlFor="producteditModal-modal" className='btn badge-info btn-xs text-white'>EDIT</label>
                                                <label onClick={() => setPeoductDetails(product)} htmlFor="productdeleteConferm-modal" className="btn btn-error btn-xs text-white ml-2">Delete</label>
                                            </th>
                                        </th>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </PhotoProvider>
    );
};

export default AllProducts;