import React, { useEffect, useState } from 'react';
import './invoicePreviewHeader.styles.scss'

import InvoiceHeaderTitle from './invoiceHeaderTitle/invoiceHeaderTitle.component';
import InvoicePreviewHeaders from './invoicePreviewHeaders/invoicePreviewHeaders.component';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../../../utils/firebaseUtils/firebaseUtils';

const db = getFirestore(firebaseApp)

const userInfo = {
    name: "Executive AV",
    street: "10830 Dearden Cir",
    City: "Orlando",
    state: "FL",
    zipCode: "32817",
    email: "info@executiveav.llc"
}

const InvoicePreviewHeader = ({company, invoiceNumber, venue, issuedDate }) => {

    const [companyAddress, setCompanyAddress] = useState("");

    const addZero = date => {
        if (date.toString().length < 2) {
            return `0${date.toString()}`;
        } else {
            return date.toString();
        };
    };

    const getAddress = async (location, kind) => {
        const venueAddress = await getDoc(doc(db, kind, location.replace(" ", "_")));
        return (venueAddress.data());
    };

    const setCompanyAddressDB = async (company) => {
        if (company !== "") {
            try {
                let temp = await getAddress(company, "company");
                setCompanyAddress(temp);
            } catch (e) {
                console.error(e)
            }
        }
    } 

    useEffect(() => {
        setCompanyAddressDB(company)
    }, [])

    const findDueDate = date => {
        let day = 0;
        let month = 0;
        let year = 0;
        if (date !== "") {
            year = parseInt(date[0]);
            month = parseInt(date[1]);
            day = parseInt(date[2]);
            if (month < 12) {
                month++;
            } else {
                month = 1;
                year++;
            }
            return `${addZero(month)}/${addZero(day)}/${year.toString()}`
        }
    };

    let formattedDate = issuedDate;
    if (formattedDate !== "") {
        formattedDate = formattedDate.split("-");
    };
    const dueDate = findDueDate(formattedDate);
    formattedDate = `${formattedDate[1]}/${formattedDate[2]}/${formattedDate[0]}`;
    console.log("Company ", companyAddress);
    return (
        <>
            <section className='invoicePreviewHeader__top' >
                <InvoiceHeaderTitle >{`Invoice #2222-${invoiceNumber}`}</InvoiceHeaderTitle> 
                <InvoicePreviewHeaders >{venue }</InvoicePreviewHeaders>
                <InvoicePreviewHeaders >{`Issued Date: ${formattedDate}`}</InvoicePreviewHeaders>
                <InvoicePreviewHeaders >Payment Term: 30 days net</InvoicePreviewHeaders>
                <InvoicePreviewHeaders ><strong >{`Due Date: ${dueDate}`}</strong></InvoicePreviewHeaders>
            </section>
            <section className='invoicePreviewHeader__bottom' >
                <section >
                    <InvoiceHeaderTitle >{`BILL TO:`}</InvoiceHeaderTitle> 
                    <InvoicePreviewHeaders >{company}</InvoicePreviewHeaders>
                    <InvoicePreviewHeaders >{companyAddress.street}</InvoicePreviewHeaders>
                    <InvoicePreviewHeaders >{`${companyAddress.city}, ${companyAddress.state} ${companyAddress.zipCode}`}</InvoicePreviewHeaders>
                    <InvoicePreviewHeaders ><strong >{companyAddress.email}</strong></InvoicePreviewHeaders>
                </section>
                <section >
                    <InvoiceHeaderTitle >{`PAYABLE:`}</InvoiceHeaderTitle> 
                    <InvoicePreviewHeaders >{userInfo.name}</InvoicePreviewHeaders>
                    <InvoicePreviewHeaders >{userInfo.street}</InvoicePreviewHeaders>
                    <InvoicePreviewHeaders >{`${userInfo.City}, ${userInfo.state} ${userInfo.zipCode}`}</InvoicePreviewHeaders>
                    <InvoicePreviewHeaders ><strong >{userInfo.email}</strong></InvoicePreviewHeaders>
                </section>
            </section>
        </>
    );
};

export default InvoicePreviewHeader;