import React, { useEffect, useState } from 'react';
import Spinner from '../Shared/Spinner/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Catagories = () => {
    const [categories, setCatagories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/categories')
          .then(response => {
            setCatagories(response.data);
            console.log(response.data)
            setIsLoading(false);
          })
          .catch(error => {
            toast.error('API Not Working Properly');
            console.log(error);
            setIsLoading(false);
          });
      }, []);

    return (
        <div className='px-2 mt-8 mx-auto'>
        <div className='mb-3'>
            <h1 className='text-3xl uppercase font-bold'>All Categories</h1>
            <p className='text-md'>Find Your Needed From Categories</p>
        </div>
        <div className={isLoading ? 'block' : 'hidden'}>
            <Spinner></Spinner>
        </div>
        <div className='grid gap-3 lg:grid-cols-4 md:grid-cols-2'>
            {categories.map(category =>
                <>
                    <Link to={`/category/${category}`}>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body lg:py-14">
                                <h2 className="card-title uppercase flex justify-center">
                                    {category}
                                </h2>
                            </div>
                        </div>
                    </Link>
                </>
            )}
        </div >
    </div >
    );
};

export default Catagories;