import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../Shared/Spinner/Spinner';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CartProvider, useCart } from "react-use-cart";
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';

const Products = () => {
    const { userDetails } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit, setLimit] = useState(8);
    const { addItem } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products?limit=${limit}`)
          .then(response => {
            setProducts(response.data);
            setIsLoading(false);
          })
          .catch(error => {
            toast.error('API Not Working Properly');
            console.log(error);
            setIsLoading(false);
          });
      }, [limit]);

      const setLimitValue = () => {
        setLimit(20);
        setIsLoading(true);
      }

      const setToCart = (product) => {
        if (userDetails?.id) {
            addItem(product);
            toast.success('Add Product to Cart Succefully');
        }
        else{
            navigate('/login');
            toast.error('You Are Not Logged In');
        }
      }

    return (
        <div className='px-2 mt-8 mx-auto'>
        <div className='mb-3'>
            <h1 className='text-3xl uppercase font-bold'>Products</h1>
            <p className='text-md'>Find Your Needed Product From Here</p>
        </div>
        <div className={isLoading ? 'block pt-8' : 'hidden'}>
            <Spinner></Spinner>
        </div>
        <div className='grid gap-3 lg:grid-cols-4 md:grid-cols-2'>
            {products.map(product =>
                <div key={product.id} className="col-span-1 flex flex-col bg-white border-2 p-4 rounded-lg justify-between">
                    <Link to={`/product/${product.id}`}>
                        <div>
                            <div className="bg-white rounded-lg overflow-hidden h-80 w-auto">
                                <img src={product.image} alt="Your Image" className="h-full w-full"/>
                            </div>
                            <h2 className="mb-2 mt-4 font-bold text-xl">
                                {product.title}
                            </h2>
                            <div className="flex flex-wrap mt-auto text-md">
                                <p className="mr-2 mb-2 capitalize">{product.category}</p>
                            </div>
                            <h1 className="mb-4 font-semibold text-xl">
                                $ {product.price}
                            </h1>
                            <p className="text-md text-justify">{product.description.split('', 180)}... <span className='font-semibold'>Read More</span></p>
                        </div>
                    </Link>
                   <div className='bottom-0'>
                        <button className="btn btn-base-200 w-full mt-5" onClick={() =>setToCart(product)}>Add To Cart</button>
                   </div>
                </div>
            )}
        </div >
        <div className="flex justify-center">
            <div className={isLoading && limit != 8 ? 'true pt-8' : 'hidden'}>
                <Spinner></Spinner>
            </div>
            <button className={limit == 8 && !isLoading ? 'btn btn-base-200 w-60 mt-5' : 'hidden'} onClick={() => setLimitValue()}>Load More</button>
        </div>
    </div >
    );
};

export default Products;