import React from 'react';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        
    }

    return (
        <div className='px-2 md:px-0'>
        <Helmet>
            <title>Login - eShop</title>
        </Helmet>
        <h1 className='text-3xl text-center font-semibold uppercase'>Login</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-control w-full mx-auto max-w-md">
                <label className="label">
                    <span className="label-text font-semibold">Your Email</span>
                </label>
                <input name='email' type="email" required placeholder="name@gmail.com" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full mx-auto max-w-md">
                <label className="label">
                    <span className="label-text font-semibold">Your Password</span>
                </label>
                <input name='password' type="password" required placeholder="************" className="input input-bordered w-full" />
            </div>
            <div className="form-control  mx-auto max-w-md mt-3">
                <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="checkbox" /><span className="label-text ml-2">Remember me</span>
                </label>
            </div>
            <div className='mt-3 flex justify-center'>
                <button type="submit" className="btn w-full max-w-md bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost">Login</button>
            </div>
        </form>
    </div>
    );
};

export default Login;