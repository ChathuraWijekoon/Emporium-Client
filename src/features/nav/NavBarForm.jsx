import React from 'react';

const NavBarForm = (props) => {
    const { handleFormSubmit } = props;

    return (
        <form className="search" onSubmit={handleFormSubmit}>
            <div className="input-group w-100">
                <input type="text" className="form-control" placeholder="Search" />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default NavBarForm;
