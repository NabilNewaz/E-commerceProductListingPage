import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Pages/Shared/Spinner/Spinner';
import { AuthContext } from '../Contexts/Authprovider/Authprovider';

const Privateroute = ({ children }) => {

    const { loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="text-center mt-10">
            <Spinner />
        </div>
    }

    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }

    return children;
};

export default Privateroute;