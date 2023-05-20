import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Shared/Spinner/Spinner';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useCart } from 'react-use-cart';
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const ProductDetails = () => {
    const proId = useParams();
    const { userDetails } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(null);
    const [product, setProducts] = useState(null);
    const { addItem } = useCart();
    const navigate = useNavigate();

    const setToCart = (pro) => {
        if (userDetails?.id) {
            addItem(pro);
            toast.success('Add Product to Cart Succefully');
        }
        else {
            navigate('/login');
            toast.error('You Are Not Logged In');
        }
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://fakestoreapi.com/products/${proId.id}`)
            .then(response => {
                setProducts(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                toast.error('API Not Working Properly');
                console.log(error);
                setIsLoading(false);
            });
    }, [proId]);

    return (
        <PhotoProvider>
            <div>
                <div className={isLoading ? 'block' : 'hidden'}>
                    <Spinner></Spinner>
                </div>
                <div className={isLoading ? 'hidden' : 'text-gray-700 body-font overflow-hidden bg-white'}>
                    <div className="container px-5 py-5 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap items-center">
                            <PhotoView key={product?.id} src={product.image}>
                                <img alt={product?.id} className="lg:w-1/2 w-full object-cover md:p-20 p-10 object-center rounded border border-gray-200" src={product?.image} />
                            </PhotoView>
                            <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{product?.category}</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.title}</h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <div className="rating rating-sm">
                                            <input type="radio" name="rating-6" className="mask mask-star-2" checked={Math.floor(product?.rating?.rate) == 1 ? true : false} />
                                            <input type="radio" name="rating-6" className="mask mask-star-2" checked={Math.floor(product?.rating?.rate) == 2 ? true : false} />
                                            <input type="radio" name="rating-6" className="mask mask-star-2" checked={Math.floor(product?.rating?.rate) == 3 ? true : false} />
                                            <input type="radio" name="rating-6" className="mask mask-star-2" checked={Math.floor(product?.rating?.rate) == 4 ? true : false} />
                                            <input type="radio" name="rating-6" className="mask mask-star-2" checked={Math.floor(product?.rating?.rate) == 5 ? true : false} />
                                        </div>
                                        <span className="text-gray-600 ml-3">{product?.rating?.count} Reviews</span>
                                    </span>
                                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                        <a className="text-gray-500">
                                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                            </svg>
                                        </a>
                                        <a className="ml-2 text-gray-500">
                                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                            </svg>
                                        </a>
                                        <a className="ml-2 text-gray-500">
                                            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                                <p className="leading-relaxed">{product?.description}</p>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="title-font font-bold text-3xl text-gray-900">${product?.price}</span>
                                    <button className="btn btn-base-200 ml-auto" onClick={() => setToCart(product)}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PhotoProvider>
    );
};

export default ProductDetails;