import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { toast } from 'react-hot-toast';

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const decodedToken = jwt_decode(localStorage.getItem('token'));
            if (decodedToken.sub === 1) {
                setIsAdmin(true);
            }
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isAdmin) {
                navigateAdminRoute();
            } else {
                navigateNotAdmin();
                toast.error('You Are Not Admin')
            }
        }, 50);
        return () => clearTimeout(timer);
    });

    const navigateAdminRoute = () => {
        navigate('/dashboard/all-products')
    }

    const navigateNotAdmin = () => {
        navigate('/')
    }

    <div>
        <Helmet>
            <title>Dashboard - eShop</title>
        </Helmet>
    </div>
};

export default Dashboard;