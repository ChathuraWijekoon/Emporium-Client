// modules
import React from 'react';

// components
import PaymentPageFeatures from '../payment/PaymentPageFeatures';
import Footer from '../delivery/deliveryFooter';
import PaymentPageBanner from '../payment/PaymentPageBanner';

const PaymentPage = () => {
    return (
        <>
            <PaymentPageBanner />
            <PaymentPageFeatures />
            <Footer />
        </>
    );
};
export default PaymentPage; 