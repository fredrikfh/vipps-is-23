import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = () => {
    // return <p>Laster...</p>;
    return <div className="container">
                <div className="loadingBall" style={{animationDelay: "0ms"}}></div>
                <div className="loadingBall" style={{animationDelay: "200ms"}}></div>
                <div className="loadingBall" style={{animationDelay: "400ms"}}></div>
            </div>;
};

export default LoadingIndicator;