import React from 'react';
import './portalContainer.styles.scss';

const PortalContainer = ({ children }) => {
    return (
        <section className='portalContainer' >
            <section className='portalContainer__container' >
                {
                    children
                }
            </section>
        </section>
    );
};

export default PortalContainer;