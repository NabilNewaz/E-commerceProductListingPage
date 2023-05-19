import React, { useEffect, useState } from 'react';
import Spinner from '../Shared/Spinner/Spinner';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { toast } from 'react-hot-toast';
import ItemComponent from './ItemComponent';

const Purchase = () => {
    const[isLoading, setIsLoading] = useState(true);
    const[purchaseProduct, setPurchaseProduct] = useState([]);
    const[totalPrice, setTotalPrice] = useState([]);
    const totalCostArr = [];

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/carts/user/${jwt_decode(localStorage.getItem('token')).sub}`)
          .then(response => {
            setPurchaseProduct(response.data)
            if(response.data.length <= 0){
                setIsLoading(false);
            }
          })
          .catch(error => {
            toast.error('API Not Working Properly');
            console.log(error);
          });
      }, []);

      let totalDoc = document.getElementsByClassName("totalPrice");
        if(totalDoc){
            for(let i = 0 ; i <= totalDoc.length; i++){
                let totalCost = 0;
                    for(let j = 0 ; j <= totalDoc[1]?.childNodes?.length; j++){
                        if(parseFloat(totalDoc[i]?.childNodes[j]?.lastChild?.lastChild?.lastChild?.innerHTML) && parseFloat(totalDoc[i]?.childNodes[j]?.lastChild?.lastChild?.lastChild?.innerHTML) != '0'){
                            totalCost = totalCost + parseFloat(totalDoc[i]?.childNodes[j]?.lastChild?.lastChild?.lastChild?.innerHTML);
                        }
                    }
                    totalCostArr.push(totalCost);
            }
        }

        useEffect(() => {
            setTotalPrice(totalCostArr)
          }, [isLoading]);

    return (
        <div className='px-2'>
            <div className={purchaseProduct?.length <= 0 ? 'hidden' : 'block margin-x-auto mt-8 mb-1'}>
                <h1 className='text-3xl uppercase font-bold'>Purchase History</h1>
                <p className='text-md'>Find Your All Product Purchase From Here</p>
            </div>
            <div className={isLoading ? 'block text-center mt-10' : 'hidden'}>
                <Spinner></Spinner>
            </div>
            <div className={purchaseProduct?.length <= 0 && !isLoading ? 'block' : 'hidden'}>
                <p className='text-slate-400 flex justify-center text-xl font-bold'>No Purchase History</p>
            </div>

            <div className='h-full'>
                {purchaseProduct?.map((perPurchase, index) =>
                    <div key={perPurchase.id}>
                        <div className="badge badge-lg text-xl font-semibold mt-4 pb-1">{perPurchase.date.substring(0, 10)}</div>
                        <div className='totalPrice'>
                        {
                            perPurchase?.products.map( product => 
                                <ItemComponent key={product.productId} product={product} setIsLoading={setIsLoading} totalPrice={totalPrice} setTotalPrice={setTotalPrice}></ItemComponent>
                            )
                        }
                            <div className='bg-base-200 rounded-xl mt-1 flex justify-between px-8 py-5'>
                                <p className='text-xl font-bold'>Total Price</p>
                                <p className='text-xl font-bold'>${totalPrice[index]}</p>
                            </div>
                        </div>
                    </div>     
                )}
            </div>
        </div>
    );
};

export default Purchase;