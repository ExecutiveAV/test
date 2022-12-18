import React from 'react';
import './headers.style.scss';

const Headers = ( { content, gray } ) => {
    return (
        <p className={`headers ${gray ? "gray" : ""}`} >{content}</p>
    );
};

export default Headers;