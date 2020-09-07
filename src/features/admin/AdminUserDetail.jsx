// modules
import React, { useEffect, useContext, useState, useReducer } from 'react';
import { observer } from 'mobx-react-lite';

// state
import { RootStoreContext } from '../../app/stores/rootStore';

// components
import LoadingComponent from '../../app/layout/LoadingComponent';

const AdminUserDetail = ({ match, history }) => {
    const rootStore = useContext(RootStoreContext);
    const {
        user,
        loadUser,
        editUser,
        loadingInitial,
    } = rootStore.adminStore;

    const [formData, _setFormData] = useState({
        _id: match.params.id,
        name: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        loadUser(match.params.id);
    }, [loadUser, match.params.id, history]);

    useEffect(() => {
        if (user) {
            _setFormData({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        }
    }, [user]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        editUser(formData);
    };

    if (loadingInitial) return <LoadingComponent content="Loading user..." />;

    if (!user) return <h2>User not found</h2>;

    return (
        <div className="container mt-3">
            <div className="row">
                <aside className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">User Details - {user.name}</h4>
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-row">
                                    <div className="col form-group">
                                        <label>User Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            value={formData.name}
                                            onChange={(e) => _setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col form-group">
                                        <label>User email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            value={formData.email}
                                            onChange={(e) => _setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div> 
                                <div className="form-row">   
                                   <div className="col form-group">
                                        <label>User role</label>
                                        <select
                                            className="form-control"
                                            value={formData.role}
                                            onChange={(e) => _setFormData({ ...formData, role: e.target.value })}
                                        >
                                         <option>Select</option>
                                            <option value="user">user </option>
                                            <option value="seller">seller </option>
                                        </select>
                                    </div>
                                </div>
                                <button className="btn btn-primary btn-block" type="submit">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default observer(AdminUserDetail);
