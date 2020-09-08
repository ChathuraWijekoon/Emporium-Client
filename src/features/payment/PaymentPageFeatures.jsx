import React from 'react';

const PaymentPageFeatures = () => {
    return (
        <section className="section-content padding-y-sm">
            <div className="container">
                    <div className="row">
                        <div className="col-md-10">
                            <figure className="item-feature">
                                <span className="text-primary">
                                    <i className="fa fa-2x fa-money-check-alt"></i>
                                </span>
                                <figcaption className="pt-3">
                                    <h5 className="title">Easy Pay</h5>
                                    <p>You can purchase products using cash or credit card</p>
                                    <p> The Visa Fee, Legalisation Fee, Visa service Fee and optional service fees shall be refundable only 
                                        if You have paid for a Service. You may request a refund in accordance with the Refund Eligibility Criteria.
                                        Refunds of Service Fees will be processed within fifteen (15) working days from the date of notifying You of the decision.
                                    </p>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
            </div>
        </section>
    );
};

export default PaymentPageFeatures;