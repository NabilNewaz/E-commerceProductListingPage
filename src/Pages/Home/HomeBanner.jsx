import React from 'react';
import banner from '../../assets/f200eb6203aba005f6bb8c46ac157274.gif';

const HomeBanner = () => {
    return (
        <div className='px-2 mt-1 md:mt-2'>
            <div className="carousel w-full rounded-box">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src={banner} className="w-full" alt='' />
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;