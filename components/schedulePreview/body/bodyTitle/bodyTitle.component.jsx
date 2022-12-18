import React from 'react';
import './bodyTitle.styles.scss'

const BodyTitle = () => {
    return (
        <section className='bodyTitle' >
            <p className='bodyTitle__title day' >Day</p>
            <p className='bodyTitle__title date' >Date</p>
            <section className='bodyTitle__title all' >
                <p className='bodyTitle__title qty' >Qty</p>
                <p className='bodyTitle__title position' >Position</p>
                <p className='bodyTitle__title tech' >Tech</p>
                <p className='bodyTitle__title time' >Time</p>
                <p className='bodyTitle__title hrs' >Hrs</p>
            </section>
        </section>
    );
};

export default BodyTitle;