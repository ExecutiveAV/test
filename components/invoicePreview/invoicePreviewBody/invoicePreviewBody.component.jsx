import React, { useEffect, useState } from 'react';
import { currencyFormatter } from '../../../utils/jsUtils/formatters';
import './invoicePreviewBody.styles.scss';

const InvoicePreviewBody = ({ invoice }) => {

    const [guys, setguys] = useState([]);

    const buildDays = (daysData) => {
        let temp = {};
        daysData.forEach(day => {
            day.shifts.forEach(shift => {
                shift.guys.forEach(guy => {
                    if (temp[guy.name] === undefined) {
                        temp[guy.name] = {
                            days: []
                        };
                    };
                    let info = {
                        date: day.date,
                        timeIn: guy.timeIn,
                        timeOut: guy.timeOut,
                        position: guy.position,
                        hrs: parseInt(guy.timeOut.slice(0, 2)) - parseInt(guy.timeIn.slice(0, 2)),
                        walkaway: guy.walkaway,
                        rate: guy.clientRate,
                        ot: parseInt(guy.timeOut.slice(0, 2)) - parseInt(guy.timeIn.slice(0, 2)) - (parseInt(guy.timeOut.slice(0, 2)) - parseInt(guy.timeIn.slice(0, 2)) === 10 ? 10 : 5),
                        name: guy.name
                    };
                    temp[guy.name]["days"].push(info);
                });
            });
        });
        return temp;
    }

    const renderDays = days => {
        const result = [];
        let total = 0;
        for (let i = 0; i < days.length; i++) {
            result.push((
                <>
                    <section className={`invoicePreviewBody__tech__info__daysHolder__day ${((i + 1) % 2) !== 0 ? "odd" : ""}`} >
                        <section className='invoicePreviewBody__tech__info__daysHolder__day__item ' >{new Date(days[i].date).toLocaleDateString()}</section>
                        <section className='invoicePreviewBody__tech__info__daysHolder__day__item ' >{`${days[i].timeIn} - ${days[i].timeOut}`}</section>
                        <section className='invoicePreviewBody__tech__info__daysHolder__day__item ' >{days[i].position}</section>
                        <section className='invoicePreviewBody__tech__info__daysHolder__day__item ' >{days[i].hrs}</section>
                        <section className='invoicePreviewBody__tech__info__daysHolder__day__item ' >{days[i].rate}</section>
                        <section className='invoicePreviewBody__tech__info__daysHolder__day__item ' >{days[i].ot}</section>
                        <section className='invoicePreviewBody__tech__info__daysHolder__day__item ' >{`${days[i].hrs * days[i].rate}`}</section>
                    </section>
                </>
            ))
            total+=days[i].hrs * days[i].rate;
        }
        
        return [result, total];
    };

    const renderTechs = (techs) => {
        const keys = Object.keys(techs);
        let temp = [];
        let overall = 0;
        keys.forEach(tech => {
            let data = renderDays(techs[tech].days);
            temp.push(
                (<section className='invoicePreviewBody__tech' >
                    <section className='invoicePreviewBody__tech__name' >{tech}</section>
                    <section className='invoicePreviewBody__tech__info' >
                        <section className='invoicePreviewBody__tech__info__titles' >
                            <span className='invoicePreviewBody__tech__info__titles__title' >Date</span>
                            <span className='invoicePreviewBody__tech__info__titles__title' >Time</span>
                            <span className='invoicePreviewBody__tech__info__titles__title' >Position</span>
                            <span className='invoicePreviewBody__tech__info__titles__title' >Rate</span>
                            <span className='invoicePreviewBody__tech__info__titles__title' >Hrs</span>
                            <span className='invoicePreviewBody__tech__info__titles__title' >OT</span>
                            <span className='invoicePreviewBody__tech__info__titles__title' >Total</span>
                        </section>
                        <section className='invoicePreviewBody__tech__info__daysHolder' >{data[0]}</section>
                        <section className='invoicePreviewBody__tech__info__total' >
                            {data[1]}
                        </section>
                    </section>
                </section>)
            );
            overall += data[1];
        });
        return [temp, overall];
    };

    useEffect(() => {
        setguys(buildDays(invoice))
    }, [])

    const content = renderTechs(guys);

    return (
        <section className='invoicePreviewBody' >
            {
                content[0]
            }
            <section className='invoicePreviewBody__totals' >
                <section className='invoicePreviewBody__totals__total' >Gross Toal: {currencyFormatter.format(content[1])}</section>
                <section className='invoicePreviewBody__totals__total' >Finder's Fee: {currencyFormatter.format(content[1] * 0.04)}</section>
                <section className='invoicePreviewBody__totals__total' >Amount Due: {currencyFormatter.format(content[1] * 0.96)}</section>
            </section>
        </section>
    );
};

export default InvoicePreviewBody;