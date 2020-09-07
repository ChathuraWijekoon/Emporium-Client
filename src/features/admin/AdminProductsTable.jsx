// modules
import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';

// store
import { RootStoreContext } from '../../app/stores/rootStore';

const AdminProductsTable = () => {
    const rootStore = useContext(RootStoreContext);
    const { products } = rootStore.adminStore;

    const history = useHistory();

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            history.push({ pathname: `/admin/product/${row._id}` });
        },
    };

    const columns = [
        {
            dataField: 'name',
            text: 'Product Name',
            filter: textFilter(),
        },
        {
            dataField: 'description',
            text: 'Product Description',
            filter: textFilter(),
        },
        {
            dataField: 'category.name',
            text: 'Product Category',
            filter: textFilter(),
        },
        {
            dataField: 'unitPrice',
            text: 'Product Price',
            filter: numberFilter(),
        },
        {
            dataField: 'stock.quantity',
            text: 'Product Quantity',
            filter: numberFilter(),
        },
    ];

    return (
        <div className="mt-5">
            <div className="row">
                <div className="col">
                    <h4>Products </h4>
                </div>
                <div className="col">
                    <Link to="/admin/product/new" className="btn btn-outline-primary float-right font-weight-bold">
                        <i className="fas fa-plus"></i> Add
                    </Link>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <BootstrapTable
                        bootstrap4={true}
                        hover={true}
                        condensed={true}
                        keyField="_id"
                        data={products}
                        columns={columns}
                        pagination={paginationFactory()}
                        filter={filterFactory()}
                        filterPosition="top"
                        rowEvents={rowEvents}
                    />
                </div>
            </div>
        </div>
    );
};

export default observer(AdminProductsTable);
