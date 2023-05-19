import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { Helmet } from 'react-helmet-async';

const AddProduct = () => {
    const[isAdmin, setIsAdmin] = useState(null);
    const[catagorisName, setCatagorisName] = useState([]);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

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
                    const productname = form.productName.value;
                    const productprice = form.productPrice.value;
                    const productoriginalprice = form.productoriginalPrice.value;
                    const productcondition = form.productCondition.value;
                    const usetime = form.useTime.value;
                    const mobilenumber = form.mobileNumber.value;
                    const location = form.location.value;
                    const productcategory = form.productCategory.value;
                    const description = form.description.value;

                    axios.post(`https://b612-used-products-resale-server-side-nabil-newaz.vercel.app/add-product`, {
                        "product_category": productcategory,
                        "product_name": productname,
                        "product_img": imagedata.data.url,
                        "product_resellPrice": productprice,
                        "product_originalPrice": productoriginalprice,
                        "product_condition": productcondition,
                        "product_useTime": usetime,
                        "product_mobilenumber": mobilenumber,
                        "product_location": location,
                        "product_description": description,
                        "product_sellerID": user.uid,
                        "product_postTime": new Date().getTime(),
                        "isAdvertised": false,
                        "isBooked": false
                    },
                        {
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    )
                        .then(function () {
                            form.reset();
                            navigate('/dashboard/my-products');
                            toast.success('Product Added Successfully')
                        })
                        .catch(function () {
                            toast.error('Something Went Wrong')
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
                        <input name='productName' type="productName" required placeholder="Enter Product Name" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Product Selling Price</span>
                        </label>
                        <input name='productPrice' type="productPrice" required placeholder="Enter Product Selling Price" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-semibold">Product Category</span>
                        </label>
                        <select required id="productCategory" name='productCategory' className="select select-bordered">
                            {catagorisName.map(catagoryName =>
                                <option value={catagoryName._id}>{catagoryName.category_name}</option>
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
                <button type="submit" className="btn w-full  bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost">Submit</button>
            </div>
        </form>
    </div>
    );
};

export default AddProduct;