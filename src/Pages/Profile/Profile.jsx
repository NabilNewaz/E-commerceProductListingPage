import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Profile = () => {

    const { userDetails } = useContext(AuthContext);

    const [image, setImage] = useState(null);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            console.log(event.target.files[0].mozFullPath);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const firstName = form.first_name.value;
        const lastName = form.first_name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const city = form.city.value;
        const street = form.street.value;
        const number = form.number.value;

        if(firstName == userDetails?.name?.firstname && lastName == userDetails?.name?.firstname && email == userDetails?.email && phone == userDetails?.phone && city == userDetails?.address?.city && street == userDetails?.address?.street && number == userDetails?.address?.number){
            toast.error('Please Make Any Changes in User Data');
        } else{
            axios.patch(`https://fakestoreapi.com/users/${userDetails.id}`, {
                email:email,
                name:{
                    firstname:firstName,
                    lastname:lastName
                },
                address:{
                    city:city,
                    street:street,
                    number:number,
                },
                phone:phone
              })
                .then((response) => {
                    toast.success('Successfully Updated Yout Data');
              })
                .catch((error) => {
                    toast.error('Something Wrong');
              }); 
        }     
        
    }

    return (
        <div className='container mx-auto px-2 md:px-5 md:mt-5 mb-5'>
            <Helmet>
                <title>Profile Setting - eShop</title>
            </Helmet>
            <div className='flex gap-2 md:gap-3 flex-col md:flex-row'>
                <div className='border-0 shadow-xl rounded-xl border-black md:w-72 md:max-h-80'>
                    <div className="flex flex-col items-center p-8">
                        <img
                            className="mb-3 h-24 w-24 rounded-full shadow-lg border-2"
                            src={'https://i.ibb.co/X2xMzwL/defultuser.png'}
                            alt={userDetails?.name?.firstname} />
                        <h5 className="mb-1 text-xl font-bold capitalize">
                            {userDetails?.name?.firstname} {userDetails?.name?.lastname}
                        </h5>
                        <div className="badge pb-1">Username: {userDetails?.username}</div>
                        <div className='flex flex-col justify-center text-center mt-2'>
                            <span className="text-md font-semibold">
                                {userDetails?.email}
                            </span>
                            <span className="text-md">
                                {userDetails?.phone}
                            </span>
                            <span className="text-md capitalize">
                                {userDetails?.address?.city}, {userDetails?.address?.street}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col w-full bg-transparent border-0 shadow-xl rounded-lg md:w-4/5 border-black mt-3 md:mt-0 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-wrap items-center justify-between border-b border-gray-300 sm:flex-no-wrap">
                        <div className="relative p-6">
                            <h3 className="flex text-lg font-medium leading-6 capitalize">
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {userDetails?.name?.firstname} {userDetails?.name?.lastname}'s Profile Settings
                            </h3>
                        </div>
                    </div>
                    <div className="uk-card-body">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="relative flex flex-col px-10 py-6 lg:flex-row">
                                <div className="flex justify-start w-full mb-0 lg:w-3/12 xl:w-1/5 lg:m-b0">
                                    <div className="relative w-32 h-32 cursor-pointer group mt-5">
                                    <div className={image ? 'hidden' : 'block'}>
                                            <img id="preview" src={'https://i.ibb.co/X2xMzwL/defultuser.png'} alt='profilepic' className="w-32 h-32 rounded-full " />
                                        </div>
                                        <div className={image ? 'block' : 'hidden'}>
                                            <img id="preview" src={image} alt='profilepic' className="w-32 h-32 rounded-full " />
                                        </div>
                                        <div className="absolute inset-0 w-full h-full">
                                            <input type="file" onChange={onImageChange} id="upload" className="absolute inset-0 z-20 w-full h-full opacity-0 cursor-pointer group" />
                                            <input type="hidden" id="uploadBase64" name="avatar" />
                                            <button className="absolute bottom-0 z-10 flex items-center justify-center w-10 h-10 mb-2 -ml-5 bg-black bg-opacity-75 rounded-full opacity-75 group-hover:opacity-100 left-1/2">
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-9/12 xl:w-4/5 mt-7">
                                    <div>
                                        <div className="mb-2 mt-1 block text-sm font-semibold">
                                            <span>First Name</span>
                                        </div>
                                        <input type="text" name="first_name" defaultValue={userDetails?.name?.firstname} className="input input-bordered w-full mb-2" />
                                    </div>
                                    <div>
                                        <div className="mb-2 mt-1 block text-sm font-semibold">
                                            <span>Last Name</span>
                                        </div>
                                        <input type="text" name="last_name" defaultValue={userDetails?.name?.lastname} className="input input-bordered w-full mb-2" />
                                    </div>
                                    <div className='mt-3'>
                                        <div className="mb-2 mt-1 block text-sm font-semibold">
                                            <span>Your Email</span>
                                        </div>
                                        <input type="email" name="email" defaultValue={userDetails?.email} className="input input-bordered w-full mb-2" />
                                    </div>
                                    <div className='mt-3'>
                                        <div className="mb-2 mt-1 block text-sm font-semibold">
                                            <span>Phone Number</span>
                                        </div>
                                        <input type="text" name="phone" defaultValue={userDetails?.phone} className="input input-bordered w-full mb-2" />
                                    </div>
                                    <div className='mt-3' id="textarea">
                                        <div className="mb-2 mt-1 block text-sm font-semibold">
                                            <span>Address</span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input type="text" name="city" defaultValue={userDetails?.address?.city} className="input input-bordered w-full mb-2" />
                                            <input type="text" name="street" defaultValue={userDetails?.address?.street} className="input input-bordered w-full mb-2" />
                                            <input type="text" name="number" defaultValue={userDetails?.address?.number} className="input input-bordered w-full mb-2" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end w-full mb-5">
                                        <button className='btn mt-5 border-2 border-gray-100 px-6 py-2 rounded-xl text-white' type="submit">
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;