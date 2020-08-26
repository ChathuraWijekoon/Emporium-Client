// modules
import React from 'react';

// assets
import imgBanner from '../../assets/images/banner/sale-banner.jpg';

const HomePageBanner = () => {
    return (
        <section className="section-intro padding-y-sm">
            <div className="container">
                <div className="intro-banner-wrap">
                    <img src={imgBanner} alt="home page banner" className="img-fluid rounded" />
                </div>
            </div>
        </section>
    );
};

export default HomePageBanner;
