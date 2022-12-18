import React from 'react';

import './headerTitle.style.scss'

const HeaderTitle = ( { client } ) => {
    return (
        <p className='headerTitle' >
            {client}
        </p>
    );
};

export default HeaderTitle;