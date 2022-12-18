import React from 'react';
import './invoicePreviewHeaders.scss'

const InvoicePreviewHeaders = ({children}) => {
    return (
        <section className='invoicePreviewHeaders'>
            {children}
        </section>
    );
};

export default InvoicePreviewHeaders;