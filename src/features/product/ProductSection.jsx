// modules
import React from 'react';

// components
import ProductCard from './ProductCard';

const ProductSection = () => {
    return (
        <section className="section-content">
            <div className="container">
                <header className="section-heading">
                    <h3 className="section-title">Popular products</h3>
                </header>

                <div className="row">
                    <div className="col-md-3">
                        <ProductCard />
                    </div>
                    <div className="col-md-3">
                        <ProductCard />
                    </div>
                    <div className="col-md-3">
                        <ProductCard />
                    </div>
                    <div className="col-md-3">
                        <ProductCard />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
