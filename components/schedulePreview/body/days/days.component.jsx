import React from 'react';
import './days.styles.scss';

import Day from '../day/day.component';
import checkIfUndefined from '../../../../utils/checkUndefined';

const Days = ( { days } ) => {

    let totalDays = [];

    const creator = (dates) => {
        for (let i = 0; i < dates.length; i++) {
            totalDays.push(<Day day={i + 1} date={dates[i].date} shifts={dates[i].shifts} />)
        }
    }

    checkIfUndefined(days, creator);

    return (
        <section className='days' >
            {
                totalDays
            }
        </section>
    );
};

export default Days;