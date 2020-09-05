// modules
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

// store
import { RootStoreContext } from '../../app/stores/rootStore';

// components
import AdminCounts from './AdminCounts';
import AdminProductsTable from './AdminProductsTable';
import AdminUsersTable from './AdminUsersTable';

const AdminPage = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadProducts, loadUsers } = rootStore.adminStore;

    const [activeTable, _setActiveTable] = useState('products');

    useEffect(() => {
        loadProducts();
        loadUsers();
    }, [loadProducts, loadUsers]);

    return (
        <div className="container mt-3">
            <AdminCounts setActiveTable={_setActiveTable} />
            {activeTable === 'products' && <AdminProductsTable />}
            {activeTable === 'users' && <AdminUsersTable />}
        </div>
    );
};

export default observer(AdminPage);
