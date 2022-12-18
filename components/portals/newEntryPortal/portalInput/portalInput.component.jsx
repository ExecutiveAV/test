import React from 'react';
import './portalInput.styles.scss';

const PortalInput = ({ children, updater }) => {
    return (
        <section className='portalInput' >
            <p className='portalInput__title' >{children}</p>
            <input className='portalInput__input' type="text" onChange={e => updater(e.currentTarget.value)} />
        </section>
    )
};

export default PortalInput;