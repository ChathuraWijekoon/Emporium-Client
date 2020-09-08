// modules
import React from 'react';

// components
import DeliveryPageFeatures from '../delivery/DeliveryPageFeatures';
import DeliveryFooter from '../delivery/deliveryFooter';
import DeliveryPageBanner from './DeliveryPageBanner';

const DeliveryPage = () => {
    return (
        <>
            <DeliveryPageBanner />
            <DeliveryPageFeatures />
            <DeliveryFooter />
        </>
    );
};
export default DeliveryPage; 