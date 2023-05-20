import React, { useContext, useEffect, useRef, useState } from 'react';
import Spinner from '../Shared/Spinner/Spinner';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCart } from "react-use-cart";
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';

const Products = () => {
    const { userDetails } = useContext(AuthContext);
    const [allproducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addItem } = useCart();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [shortOrder, setShortOrder] = useState('');

    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView()

    const handlePageClick = (event) => {
        setCurrentPage(Number(event.target.id));
        executeScroll();
    };

    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const shortProduct = () => {
        let shortKeyword = document.getElementById('shortField').value;
        setShortOrder(shortKeyword)
    }

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://fakestoreapi.com/products?sort=${shortOrder}`)
            .then(response => {
                setAllProducts(response.data);
                setProducts(response.data.slice(0, 4))
                setIsLoading(false);
            })
            .catch(error => {
                toast.error('API Not Working Properly');
                console.log(error);
                setIsLoading(false);
            });
    }, [shortOrder]);

    useEffect(() => {
        setProducts(allproducts.slice(indexOfFirstItem, indexOfLastItem));

    }, [indexOfLastItem, indexOfFirstItem]);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allproducts.length / itemsPerPage); i++) {
        pageNumbers.push(i);
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
        <div ref={myRef}>
            <div className='px-2 mt-8 mx-auto'>
                <div className='mb-3 flex flex-col md:flex-row justify-between'>
                    <div>
                        <h1 className='text-3xl uppercase font-bold'>Products</h1>
                        <p className='text-md'>Find Your Needed Product From Here</p>
                    </div>
                    <div className='mt-2 md:mt-0'>
                        <div className="form-control">
                            <div className="input-group">
                                <select id='shortField' className="select select-bordered">
                                    <option value='' disabled selected>Short By</option>
                                    <option value=''>Ascending</option>
                                    <option value='desc'>Descending</option>
                                </select>
                                <button onClick={shortProduct} className="btn">Short</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={isLoading ? 'block pt-8 pb-8' : 'hidden'}>
                    <Spinner></Spinner>
                </div>
                <div className='grid gap-3 lg:grid-cols-4 md:grid-cols-2'>
                    {products.map(product =>
                        <div key={product.id} className="col-span-1 flex flex-col bg-white border-2 p-4 rounded-lg justify-between dark:bg-[#2a303c] dark:border-gray-400">
                            <Link onClick={ScrollToTop} to={`/product/${product.id}`}>
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
                                    <p className="text-md text-justify">{product.description.split('', 100)}... <span className='font-semibold'>Read More</span></p>
                                </div>
                            </Link>
                            <div className='bottom-0'>
                                <button className="btn btn-base-200 w-full mt-5" onClick={() => setToCart(product)}>Add To Cart</button>
                            </div>
                        </div>
                    )}
                </div >
                <div className="flex justify-center">
                    <div className="btn-group mt-5">
                        {pageNumbers.map(number =>
                            <input onClick={handlePageClick} checked={currentPage === number ? true : false} id={number} type="radio" name="options" data-title={number} className="btn" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;