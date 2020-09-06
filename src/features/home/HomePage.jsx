// modules
import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

// store
import { RootStoreContext } from '../../app/stores/rootStore';

// components
import HomePageBanner from './HomePageBanner';
import HomePageFeatures from './HomePageFeatures';
import ProductSection from '../product/ProductSection';
import Footer from '../footer/Footer';

const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadProducts, deletePredicate, setPredicate } = rootStore.productStore;

    useEffect(() => {
        deletePredicate();
        setPredicate('all', false);
        loadProducts();
    }, [loadProducts, deletePredicate, setPredicate]);

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

export default observer(HomePage);
