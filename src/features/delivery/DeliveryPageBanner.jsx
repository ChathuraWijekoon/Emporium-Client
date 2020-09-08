import React from 'react';

// assets
import imgBanner from '../../assets/images/banner/delivery-banner1.jpg';

const DeliveryPageBanner = () => {
    return (
        <section className="section-intro padding-y-sm">
            <div className="container">
                <div className="intro-banner-wrap">
                    <img src={imgBanner} alt="delivery page banner" className="img-fluid rounded" />
                </div>
            </div>
        </section>
    );
};

export default DeliveryPageBanner;