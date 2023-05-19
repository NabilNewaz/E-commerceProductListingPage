import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [checked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const firstname = form.firstname.value;
        const lastname = form.lastname.value;
        const username = form.username.value;
        const email = form.email.value;
        const phonenumber = form.phonenumber.value;
        const password = form.password.value;
        const rePassword = form.repassword.value;
        const city = form.city.value;
        const street = form.street.value;
        const number = form.number.value;
        const zipcode = form.zipcode.value;
        const lat = form.lat.value;
        const long = form.long.value;

        if (password !== rePassword) {
            toast.error("Your Password Doesn't Match!")
        }
        else {
            setIsLoading(true);
            axios.post(`https://fakestoreapi.com/users`, {
                email: email,
                username: username,
                password: password,
                name: {
                    firstname: firstname,
                    lastname: lastname
                },
                address: {
                    city: city,
                    street: street,
                    number: number,
                    zipcode: zipcode,
                    geolocation: {
                        lat: lat,
                        long: long
                    }
                },
                phone: phonenumber
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    toast('Please, Login Now')
                    toast.success('Your Successfully Signup')
                    form.reset();
                    navigate('/login')
                    setIsLoading(false);
                })
                .catch((error) => {
                    toast.error('Something Wrong');
                });
        }
    }


    return (
        <div className='px-2 md:px-0'>
            <Helmet>
                <title>Sign Up - eShop</title>
            </Helmet>
            <h1 className='text-3xl text-center font-semibold uppercase'>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">First Name</span>
                    </label>
                    <input id="firstname" name='firstname' required type="text" placeholder="Your First Name" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">Last Name</span>
                    </label>
                    <input id="lastname" name='lastname' required type="text" placeholder="Your Last Name" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">Username</span>
                    </label>
                    <input id="username" name='username' required type="text" placeholder="Your Username" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">Your Email</span>
                    </label>
                    <input type="email" id="email" name='email' required placeholder="name@gmail.com" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">Your Phone Number</span>
                    </label>
                    <input type="text" id="phonenumber" name='phonenumber' required placeholder="1-000-000-0000" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">Your Password</span>
                    </label>
                    <input type="password" id="password" name='password' required placeholder="************" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">Repeat Password</span>
                    </label>
                    <input type="password" id="repassword" name='repassword' required placeholder="************" className="input input-bordered w-full" />
                </div>
                <div className='max-w-md mx-auto'>
                    <hr className='border mt-3 border-base-300'></hr>
                    <p className='text-1xl font-semibold text-center mt-2 text-gray-400'>Your Full Address</p>
                    <hr className='border mt-2 border-base-300'></hr>
                </div>
                <div className='flex gap-2 mx-auto max-w-md'>
                    <div className="form-control w-full mx-auto max-w-md">
                        <label className="label">
                            <span className="label-text font-semibold">City</span>
                        </label>
                        <input type="text" id="city" name='city' required placeholder="Your City Name" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full mx-auto max-w-md">
                        <label className="label">
                            <span className="label-text font-semibold">Street</span>
                        </label>
                        <input type="text" id="street" name='street' required placeholder="Your Street Name" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className='flex gap-2 mx-auto max-w-md'>
                    <div className="form-control w-full mx-auto max-w-md">
                        <label className="label">
                            <span className="label-text font-semibold">Number</span>
                        </label>
                        <input type="text" id="number" name='number' required placeholder="Your City Number" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full mx-auto max-w-md">
                        <label className="label">
                            <span className="label-text font-semibold">Zipcode</span>
                        </label>
                        <input type="text" id="zipcode" name='zipcode' required placeholder="Your Zipcode" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className='flex gap-2 mx-auto max-w-md'>
                    <div className="form-control w-full mx-auto max-w-md">
                        <label className="label">
                            <span className="label-text font-semibold">Geolocation (Latitude)</span>
                        </label>
                        <input type="text" id="lat" name='lat' required placeholder="Your Latitude Value" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full mx-auto max-w-md">
                        <label className="label">
                            <span className="label-text font-semibold">Geolocation (Longitude)</span>
                        </label>
                        <input type="text" id="long" name='long' required placeholder="Your Longitude Value" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="form-control  mx-auto max-w-md mt-3">
                    <label className="flex items-center cursor-pointer">
                        <input required type="checkbox" onChange={() => checked ? setChecked(false) : setChecked(true)} name='agreeterms' className="checkbox" /><span className="label-text ml-2">I agree with the <Link to='/' className='font-bold'>terms and conditions</Link></span>
                    </label>
                </div>
                <div className='mt-3 flex justify-center'>
                    <button disabled={!checked} type="submit" className={isLoading ? 'btn loading w-full max-w-md bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost' : 'btn w-full max-w-md bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost'}>signup</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;