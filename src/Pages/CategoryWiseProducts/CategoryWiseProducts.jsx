import React, { useContext } from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';
import { toast } from 'react-hot-toast';

const CategoryWiseProducts = () => {
    const { userDetails } = useContext(AuthContext);
    const catProducts = useLoaderData();
    const { addItem } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const setToCart = (product) => {
        if (userDetails?.id) {
            addItem(product);
            toast.success('Add Product to Cart Succefully');
        }
        else {
            navigate('/login');
            toast.error('You Are Not Logged In');
        }
    }
    return (
        <div className='mt-5'>
            <div className='grid gap-3 lg:grid-cols-4 md:grid-cols-2'>
                {catProducts.map(product =>
                    <div key={product.id} className="col-span-1 flex flex-col bg-white border-2 p-4 rounded-lg justify-between">
                        <Link to={`/product/${product.id}`}>
                            <div>
                                <div className="bg-white rounded-lg overflow-hidden h-80 w-auto">
                                    <img src={product.image} alt="Your Image" className="h-full w-full" />
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
                            <button className="btn btn-base-200 w-full mt-5" onClick={() => setToCart(product)}>Add To Cart</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryWiseProducts;