import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const Authprovider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState([]);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('token')){
            setUser(true);
        };

        if(localStorage.getItem('token')){
            setLoading(true);
            const decodedToken = jwt_decode(localStorage.getItem('token'));
            axios.get(`https://fakestoreapi.com/users/${decodedToken.sub}`)
            .then(response => {
            if(response.data.password){
                setUserDetails(response.data);
            }else{
                userDetails([]);
            }
            setLoading(false);
            })
            .catch(error => {
                toast.error('API Not Working Properly');
                console.log(error);
                setLoading(false);
            });
        };
      }, [user]);
      
      const Logout = () =>{
        localStorage.removeItem('token');
        setUser(null);
        setUserDetails([]);
        toast.success('Log Out Successfull')
      }
    
    const authInfo = {
        user,
        setUser,
        userDetails,
        loading,
        setLoading,
        Logout
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;