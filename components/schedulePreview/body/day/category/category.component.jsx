import React from 'react';
import './category.styles.scss';

const Category = ({children, size}) => {
    return (
        <section className={`category ${size}`}>
            {children}
        </section>
    );
};

export default Category;