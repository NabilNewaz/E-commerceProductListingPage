import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Pages/Shared/Spinner/Spinner';
import { AuthContext } from '../Contexts/Authprovider/Authprovider';
import { toast } from 'react-hot-toast';

const LoginCheck = ({ children }) => {

    const { userDetails, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="text-center">
            <Spinner />
        </div>
    }

    if (userDetails.id) {
        toast.error('Already Logged In');
        return <Navigate to="/" state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default LoginCheck;