import React from 'react';
import './button.styles.scss';

const Button = ({ children, customStyle, onClick }) => {
    return (
        <section onClick={onClick} className={`button ${customStyle}`} >
            <section >{children}</section>
        </section>
    );
};

export default Button;