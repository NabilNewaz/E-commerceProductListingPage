import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Shared/Spinner/Spinner';
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';
import { toast } from 'react-hot-toast';
import { useCart } from 'react-use-cart';

const SearchResult = () => {
    const searchKeyword = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [searchResult, setSearchResult] = useState([]);
    const { userDetails } = useContext(AuthContext);
    const { addItem } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products`)
            .then(response => {
                const result = response.data.filter((obj) =>
                    obj.title.toLowerCase().includes(searchKeyword.keyword.toLowerCase())
                );
                setSearchResult(result);
                setIsLoading(false);
            })
            .catch(error => {
                toast.error('API Not Working Properly');
                console.log(error);
                setIsLoading(false);
            });
    }, [searchKeyword.keyword]);

    const handeleSearch = () => {
        let searchKeyword = document.getElementById('searchField2').value;
        if (!searchKeyword) {
            toast.error('Please Enter Any Search Keyword')
        }
        else {
            navigate(`/search/${searchKeyword}`);
            toast.success('You Search Results');
        }
    }

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
        <div className='px-2 mt-8 mx-auto'>
            <div className={searchResult?.length <= 0 ? 'hidden' : 'mb-3'}>
                <h1 className='text-3xl uppercase font-bold'>Your search results</h1>
                <p className='text-md'>We Find {searchResult.length} Results Of Your Search</p>
            </div>
            <div className={isLoading ? 'block' : 'hidden'}>
                <Spinner></Spinner>
            </div>
            <div className={searchResult?.length <= 0 ? 'block' : 'hidden'}>
                <p className='text-slate-400 flex justify-center md:my-0 text-xl font-bold'>No item Found</p>
                <div className="form-control">
                    <div className="input-group flex justify-center mt-5">
                        <input id='searchField2' type="text" placeholder="Search Again" className="input input-bordered" />
                        <button onClick={handeleSearch} className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <div className='grid gap-3 lg:grid-cols-4 md:grid-cols-2'>
                    {searchResult.map(product =>
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
        </div>
    );
};

export default SearchResult;