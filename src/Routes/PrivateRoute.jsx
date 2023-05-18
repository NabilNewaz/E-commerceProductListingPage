import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Pages/Shared/Spinner/Spinner';
import { AuthContext } from '../Contexts/Authprovider/Authprovider';

const PrivateRoute = ({children}) => {
    
    const { userDetails, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="text-center">
            <Spinner />
        </div>
    }

    if (!userDetails.id) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default PrivateRoute;