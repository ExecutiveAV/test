import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './popUpFooter.styles.scss';

import { setDoc, doc } from 'firebase/firestore';

import { updateNewEntryPortalStatus, clearNewEntryDocument, didUploadChecker } from '../../redux/portal/newEntryPortal.slice';

import { firebaseApp } from '../../utils/firebaseUtils/firebaseUtils';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(firebaseApp)

const PopUpFooter = ({ newEntryType }) => {
    const dispatch = useDispatch();
    const { newEntryDocument } = useSelector(state => state.newEntryPortal);
    const { scheduleDocument } = useSelector(state => state.schedule);

    const { createdOn, editedOn } = scheduleDocument;

    const saveNewEntry = async (entryType, db, newEntryDocument) => {
        try {
            await setDoc(doc(db, entryType, newEntryDocument.name.replace(" ", "_")), newEntryDocument);

            dispatch(updateNewEntryPortalStatus(false))
            dispatch(clearNewEntryDocument({}));
            dispatch(didUploadChecker(true));
        } catch (error) {
            console.error("This is a popUpFooter error: ", error);
            dispatch(updateNewEntryPortalStatus(false))
            dispatch(clearNewEntryDocument({}));
            dispatch(didUploadChecker(false));
        }
    }

    return (
        <section className='popUpFooter' >
            <p className='popUpFooter__button cancel' onClick={e => {
                dispatch(updateNewEntryPortalStatus(false));
                dispatch(clearNewEntryDocument({}));
            }} >Cancel</p>
            <p className='popUpFooter__button add' onClick={e => saveNewEntry(newEntryType, db, newEntryDocument)} >Add</p>
        </section>
    );

    //every time the portal is open, clear the new entry document
};

export default PopUpFooter;