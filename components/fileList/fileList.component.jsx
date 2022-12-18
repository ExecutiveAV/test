import React from 'react';
import { useDispatch } from 'react-redux';
import './fileList.styles.scss'

import PrimaryText from './primaryText/primaryText.component';
import FileOptions from '../fileOptions/fileOptions.component';

import {firebaseApp} from '../../utils/firebaseUtils/firebaseUtils';
import { getFirestore,  doc, getDoc } from 'firebase/firestore';
import { updateInvoice } from '../../redux/invoice/invoice.slice';
import { updateSchedule } from '../../redux/schedule/schedule.slice';
import { Link, redirect } from 'react-router-dom';

const db = getFirestore(firebaseApp);

const FileList = ({ type, filesData, kind }) => {
    const dispatch = useDispatch();

    const handleClick = async (invNumber, kind) => {
        try {
            const file = await getDoc(doc(db, kind, invNumber));
            if (kind === "invoices") {
                dispatch(updateInvoice(file.data()));
            } else if (kind === "schedules") {
                dispatch(updateSchedule(file.data()));
            }
        } catch (e) {
            console.error(e, invNumber, kind)
        }
        
    }

    const files = filesData.map(file => {
        return (
            <section className='fileList__files__file' >
                <section  className='fileList__files__file__withSubtitle' >
                    <PrimaryText onClick={async e => await handleClick(e, kind)} >{`22${(new Date().getFullYear().toString()).slice(2, 4)}_${file.invNumber}`}</PrimaryText>
                    <PrimaryText primary={false} >{file.company}</PrimaryText>
                </section>
                <PrimaryText >{
                    file.createdOn === null ?
                    "Date not found" :
                    `${new Date(file.createdOn).toLocaleDateString('en-us')}`
                    }</PrimaryText>
                <section className='fileList__files__file__withSubtitle' >
                    <Link to={`/${kind}/new`} >{
                        file.editedOn === null ?
                        "Date not found" :
                        `${new Date(file.editedOn).toLocaleDateString('en-us')}`
                    }</Link>
                    {/* <PrimaryText primary={false} >{file.scheduleDocument.editedOn}</PrimaryText> */}
                </section>
                <FileOptions />
            </section>
        );
    });

    return (
        <section className='fileList' >
            <section className='fileList__header' >
                <PrimaryText style={{textTransform: "capitalize"}} >{kind}:</PrimaryText>
                <PrimaryText >Created On:</PrimaryText>
                <PrimaryText >Edited On:</PrimaryText>
            </section>
            <section className='fileList__files' >
                {files}
            </section>
            
        </section>
    );
};

export default FileList;

//When clicking in schedule, get name and query it to firebase db. then replace current schedule with it and open the createschedule window,
//create parse to transform a schedule into an invoiceObject with standard rates
//create schema for employees and rates with positions