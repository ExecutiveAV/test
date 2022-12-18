import React from 'react';

import './day.styles.scss';

import Category from './category/category.component';
import checkIfUndefined from '../../../../utils/checkUndefined';

const Day = ( { day, date, shifts } ) => {

    const days = <section className='schedule' >{day}</section>;

    const dates = <section className='schedule' >{date}</section>;
    //Guys info is empty that's why it's not working

    const creator = (shifts) => {
        return (
            shifts.map(shift => {

                const mapper = (shift, key) => {
                    const temp = shift["guys"].map(tech => (<section className='schedule__item' >{tech[key]}</section>));
                    return temp;
                }
                        
                const qty = (<section className='schedule__item' >{shift["guys"].length}</section>);
                const positions = checkIfUndefined(shift, (shift) => mapper(shift, "position"));
                const techs = checkIfUndefined(shift, (shift) => mapper(shift, "name"))
                const timez = shift["guys"].map(tech => (<section className='schedule__item' >{`${shift.timeIn} - ${shift.timeOut}`}</section>));
                let computedTime = parseInt(shift.timeOut.slice(0, 2)) - parseInt(shift.timeIn.slice(0, 2));
                if (computedTime > 0 && computedTime < 6) {
                    computedTime = 5;
                } else if (computedTime > 5 && computedTime < 11) {
                    computedTime = 10;
                } else if (Number.isNaN(computedTime)) {
                    computedTime = ""
                }
                const hours = shift["guys"].map(tech => (<section className='schedule__item' >{computedTime}</section>));
                return (
                    <section className='groups' >
                        <Category size={"qty"} >{qty}</Category>
                        <Category size={"position"} >{positions}</Category>
                        <Category size="tech" >{techs}</Category>
                        <Category size="time" >{timez}</Category>
                        <Category size="hrs" >{hours}</Category>
                    </section>
                );
            })
        );
    };

    const groups = checkIfUndefined(shifts, creator)

    return (
        <section className='day' >
            <section className='day__info' >
                <Category size="day" >{days}</Category>
                <Category size="date" >{dates}</Category>
                <Category size="all" >{groups}</Category>
            </section>
        </section>
    );
};

export default Day;