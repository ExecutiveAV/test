import React from 'react';
import { useSelector } from 'react-redux';
import './invoicePreview.styles.scss'

import Body from '../schedulePreview/body/body.component';

import previous from '../../dummyDB/previous';
import InvoicePreviewHeader from './invoicePreviewHeader/invoicePreviewHeader.component';
import InvoicePreviewBody from './invoicePreviewBody/invoicePreviewBody.component';

const InvoicePreview = () => {
    
    const { invoiceDocument } = useSelector(state => state.invoice);
    let address = "";
    let city = "";

    previous.venue.forEach(venue => {
        if (venue.name === invoiceDocument.location) {
            address = venue.street;
            city = venue.city;
        }
    });

    return (
        <section className='invoicePreviewContainer' >
            <InvoicePreviewHeader company={invoiceDocument.company} issuedDate={invoiceDocument.issuedDate} invoiceNumber={invoiceDocument.invNumber} venue={invoiceDocument.location}  />
            <InvoicePreviewBody invoice={invoiceDocument.daysData} />
        </section>
    );
};

export default InvoicePreview;