import React from 'react';
import { Helmet } from 'react-helmet-async';
import HomeBanner from './HomeBanner';
import Products from './Products';
import Catagories from './Catagories';

const Home = () => {
    return (
        <div>
        <Helmet>
            <title>Home - eShop</title>
        </Helmet>
        <HomeBanner></HomeBanner>
        <Catagories></Catagories>
        <Products></Products>
    </div>
    );
};

export default Home;