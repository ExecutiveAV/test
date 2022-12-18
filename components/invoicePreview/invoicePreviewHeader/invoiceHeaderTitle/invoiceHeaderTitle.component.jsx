import React from 'react';
import './invoicePreviewHeaderTitle.component.scss'

const InvoiceHeaderTitle = ({children}) => {
    return (
        <section className='invoicePreviewHeaderTitle'>
            {children}
        </section>
    );
};

export default InvoiceHeaderTitle;