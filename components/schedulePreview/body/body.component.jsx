import React from 'react';
import './body.styles.scss';

import BodyTitle from './bodyTitle/bodyTitle.component';
import Days from './days/days.component';

/*,,*/

const Body = ({ schedule }) => {

    return (
        <section className='body' >
            <BodyTitle />
            <Days days={schedule} />
        </section>
    );
};

export default Body;