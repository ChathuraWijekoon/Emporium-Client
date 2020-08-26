// modules
import React from 'react';

// components
import HomePageBanner from './HomePageBanner';
import HomePageFeatures from './HomePageFeatures';
import ProductSection from '../product/ProductSection';
import Footer from '../footer/Footer';

const HomePage = () => {
    return (
        <>
            <HomePageBanner />
            <HomePageFeatures />
            <ProductSection />
            <ProductSection />
            <Footer />
        </>
    );
};

export default HomePage;
