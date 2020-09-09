// modules
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, numberFilter } from 'react-bootstrap-table2-filter';

// store
import { RootStoreContext } from '../../app/stores/rootStore';

const AdminOrdersTable = () => {
    const rootStore = useContext(RootStoreContext);
    const { orders } = rootStore.orderStore;

    const history = useHistory();

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            history.push({ pathname: `/admin/` });
        },
    };

    const selectOptions = {
        LKR: 'LKR',
        USD: 'USD',
    };

    const columns = [
        {
            dataField: 'transactionId',
            text: 'Transaction Id',
            filter: textFilter(),
        },
        {
            dataField: 'amount',
            text: 'Transaction Amount ',
            filter: numberFilter(),
        },
        {
            dataField: 'currency',
            text: 'Transaction Currency',
            filter: selectFilter({
                options: selectOptions,
            }),
        },
    ];

    return (
        <div className="mt-5">
            <div className="row">
                <div className="col">
                    <h4>Orders </h4>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <BootstrapTable
                        bootstrap4={true}
                        hover={true}
                        condensed={true}
                        keyField="_id"
                        data={orders}
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

export default observer(AdminOrdersTable);
