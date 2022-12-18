import React from 'react';
import './primaryText.styles.scss';

const PrimaryText = ({children, primary=true, onClick, style}) => {
    return (
        <p style={style} onClick={async e => await onClick(children)} className={`${primary ? "primaryText" : "secondaryText"}`} >
            {children}
        </p>
    );
};

export default PrimaryText;