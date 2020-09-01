import React from 'react';
import Loader from 'react-loader-spinner';

const LoadingComponent = ({ inverted = true, content }) => {
    return (
        <div className="loader">
            <Loader type="Puff" color="#3167eb" height={100} width={100} />
            <p className="loader-text">{content}</p>
        </div>
    );
};

export default LoadingComponent;
