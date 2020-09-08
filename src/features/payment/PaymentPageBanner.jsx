import React from 'react';

// assets
import imgBanner from '../../assets/images/banner/payment-banner.jpg';

const PaymentPageBanner = () => {
    return (
        <section className="section-intro padding-y-sm">
            <div className="container">
                <div className="intro-banner-wrap">
                    <img src={imgBanner} alt="paymnent page banner" className="img-fluid rounded" />
                </div>
            </div>
        </section>
    );
};

export default PaymentPageBanner;