// modules
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';

// store
import { RootStoreContext } from '../../app/stores/rootStore';

const AdminUsersTable = () => {
    const rootStore = useContext(RootStoreContext);
    const { users } = rootStore.adminStore;

    const history = useHistory();

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            history.push({ pathname: `/users/${row._id}` });
        },
    };

    const selectOptions = {
        user: 'user',
        seller: 'seller',
        admin: 'admin',
    };

    const columns = [
        {
            dataField: 'name',
            text: 'User Name',
            filter: textFilter(),
        },
        {
            dataField: 'email',
            text: 'User Email',
            filter: textFilter(),
        },
        {
            dataField: 'role',
            text: 'User Role',
            filter: selectFilter({
                options: selectOptions,
            }),
        },
    ];

    return (
        <div className="mt-5">
            <div className="row">
                <div className="col">
                    <h4>Users </h4>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <BootstrapTable
                        bootstrap4={true}
                        hover={true}
                        condensed={true}
                        keyField="_id"
                        data={users}
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

export default observer(AdminUsersTable);
