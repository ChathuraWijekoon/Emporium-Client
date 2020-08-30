// modules
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

// store
import { RootStoreContext } from '../../app/stores/rootStore';

// components
import ProductCard from './ProductCard';

const ProductSection = () => {
    const rootStore = useContext(RootStoreContext);
    const { products } = rootStore.productStore;

    return (
        <section className="section-content">
            <div className="container">
                <header className="section-heading">
                    <h3 className="section-title">Popular products</h3>
                </header>

                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-3" key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default observer(ProductSection);
