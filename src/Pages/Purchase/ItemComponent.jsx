import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const ItemComponent = ({ product, setIsLoading }) => {
    const [productDetails, setProductDetails] = useState();
    
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${product.productId}`)
            .then(response => {
                if (response.data) {
                    setProductDetails(response.data)
                    setTimeout(function () { setIsLoading(false); }, 500)
                }
            })
            .catch(error => {
                toast.error('API Not Working Properly');
                console.log(error);
            });
    }, [product]);

    return (
        <div className='flex flex-col md:flex-row bg-base-200 text-black justify-between rounded-xl px-8 py-3 mt-1'>
            <div className='flex gap-3 items-center'>
                <div className="avatar">
                    <div className="w-16 mask mask-squircle">
                        <img src={productDetails?.image} />
                    </div>
                </div>
                <div>
                    <p className='pl-5 text-lg dark:text-gray-400'>{productDetails?.title}</p>
                    <p className='text-sm pl-5 capitalize dark:text-gray-400'>{productDetails?.category}</p>
                </div>
            </div>
            <div className='flex justify-between gap-3 items-center mt-2 md:mt-0'>
                <div className="form-control">
                    <p className='text-xl dark:text-gray-400'>${productDetails?.price} x {product.quantity}</p>
                </div>
                <div className='flex'>
                    <span className='font-semibold text-xl dark:text-gray-400'>$</span>
                    <p className='font-semibold text-xl dark:text-gray-400'>{(parseFloat(productDetails?.price) * parseFloat(product.quantity)).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default ItemComponent;