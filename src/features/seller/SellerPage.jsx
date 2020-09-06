// modules
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

// store
import { RootStoreContext } from '../../app/stores/rootStore';

// components
import SellerCounts from './SellerCounts';
import SellerProductsTable from './SellerProductsTable';

const SellerPage = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadProducts, setPredicate } = rootStore.productStore;
    const { user } = rootStore.userStore;

    const [activeTable, _setActiveTable] = useState('products');

    useEffect(() => {
        setPredicate('all', true);
        setPredicate('user', user._id);
        loadProducts();
    }, [setPredicate, loadProducts, user]);

    return (
        <div className="container mt-3">
            <SellerCounts setActiveTable={_setActiveTable} />
            {activeTable === 'products' && <SellerProductsTable />}
        </div>
    );
};

export default observer(SellerPage);
