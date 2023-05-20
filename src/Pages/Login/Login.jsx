import axios from 'axios';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';

const Login = () => {
    const { setUser, setLoading } = useContext(AuthContext);
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const password = form.password.value;

        axios.post('https://fakestoreapi.com/auth/login', {
            username: username,
            password: password,
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                setLoading(true);
                setUser(true);
                toast.success('Successfully Logged In')
                navigate(from, { replace: true });
            })
            .catch((error) => {
                toast.error('Wrong Username and Password');
            });
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
                        <span className="label-text font-semibold">Your Username</span>
                    </label>
                    <input name='username' type="text" required placeholder="Username" className="input input-bordered w-full" />
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