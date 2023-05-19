import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const AddProduct = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [catagorisName, setCatagorisName] = useState([]);

    const imageHostKey = import.meta.env.VITE_REACT_APP_imgbb_Key;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const decodedToken = jwt_decode(localStorage.getItem('token'));
            if (decodedToken.sub === 1) {
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
            if (!isAdmin) {
                navigateNotAdmin();
                toast.error('You Are Not Admin')
            }
        }, 50);
        return () => clearTimeout(timer);
    });

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/categories`)
            .then(response => {
                setCatagorisName(response.data)
            })
            .catch(error => {
                toast.error('API Not Working Properly');
                console.log(error);
            });
    }, []);;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        setIsLoading(true);

        const producttitle = form.productTitle.value;
        const productprice = form.productPrice.value;
        const productcategory = form.productCategory.value;
        const description = form.description.value;

        const formData = new FormData()
        const image = form.productImage.files[0]
        formData.append("image", image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        const fetchImgData = async () => await fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imagedata => {
                if (imagedata.success) {
                    axios.post('https://fakestoreapi.com/products', {
                        title: producttitle,
                        price: productprice,
                        description: description,
                        image: imagedata.data.url,
                        category: productcategory
                    }, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((response) => {
                            toast.success('Your Product Added Successfully')
                            form.reset();
                            setIsLoading(false);
                        })
                        .catch((error) => {
                            toast.error('Something Wrong');
                        });
                }

            })
        fetchImgData(() => { })

    }

    return (
        <div className='pt-2 md:px-10 lg:pl-0 px-2 lg:px-50'>
            <Helmet>
                <title>Add Product - Admin Dashboard - eShop</title>
            </Helmet>
            <div>
                <p className='text-2xl uppercase font-semibold'>Add product</p>
                <p className='mb-4 uppercase text-sm'>add your new items for sell</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='gap-3 lg:flex'>
                    <div className='w-full'>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Product Title</span>
                            </label>
                            <input name='productTitle' type="productTitle" required placeholder="Enter Product Name" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Product Selling Price</span>
                            </label>
                            <input name='productPrice' type="number" step="0.01" required placeholder="Enter Product Selling Price" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Product Category</span>
                            </label>
                            <select required id="productCategory" name='productCategory' className="select select-bordered capitalize">
                                {catagorisName.map((catagoryName, index) =>
                                    <option key={index} value={catagoryName}>{catagoryName}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Product Image</span>
                            </label>
                            <input name='productImage' type="file" required placeholder="Enter Mobile Number" className="input pt-2 input-bordered w-full" />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Description</span>
                            </label>
                            <input name='description' required id='description' type="text" placeholder="Type here" className="input input-bordered w-full h-[132px]" />
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <button type="submit" className={isLoading ? 'btn w-full loading bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost' : 'btn w-full bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost'}>Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;