// modules
import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

// store
import { RootStoreContext } from '../../app/stores/rootStore';

const AdminCounts = ({ setActiveTable }) => {
    const rootStore = useContext(RootStoreContext);
    const { productCount } = rootStore.productStore;

    const [hover, _setHover] = useState('');
    const [activeCount, _setActiveCount] = useState('products');

    const handleCountClick = (countName) => {
        _setActiveCount(countName);
        setActiveTable(countName);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <article
                    className={
                        hover === 'products' || activeCount === 'products' ? 'card card-body shadow' : 'card card-body'
                    }
                    onMouseEnter={() => _setHover('products')}
                    onMouseLeave={() => _setHover('')}
                    onClick={() => handleCountClick('products')}
                >
                    <figure className="itemside">
                        <div className="aside">
                            <span className="icon-sm rounded-circle bg-primary">
                                <i className="fa fa-box-open white"></i>
                            </span>
                        </div>
                        <figcaption className="info">
                            <h5 className="title">Products</h5>
                            <p>{productCount}</p>
                        </figcaption>
                    </figure>
                </article>
            </div>
        </div>
    );
};

export default observer(AdminCounts);
