// modules
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

// store
import { RootStoreContext } from '../../app/stores/rootStore';

// components
import AdminCounts from './AdminCounts';
import AdminProductsTable from './AdminProductsTable';
import AdminUsersTable from './AdminUsersTable';
import AdminOrdersTable from './AdminOrdersTable';

const AdminPage = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadProducts, loadUsers } = rootStore.adminStore;
    const { loadOrders } = rootStore.orderStore;

    const [activeTable, _setActiveTable] = useState('products');

    useEffect(() => {
        loadProducts();
        loadUsers();
        loadOrders();
    }, [loadProducts, loadUsers, loadOrders]);

    return (
        <div className="container mt-3">
            <AdminCounts setActiveTable={_setActiveTable} />
            {activeTable === 'products' && <AdminProductsTable />}
            {activeTable === 'users' && <AdminUsersTable />}
            {activeTable === 'orders' && <AdminOrdersTable />}
        </div>
    );
};

export default observer(AdminPage);
