import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './schedulePreview.styles.scss';

import Header from './header/header.component';
import Body from './body/body.component';

import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../../utils/firebaseUtils/firebaseUtils';

const db = getFirestore(firebaseApp);

const SchedulePreview = () => {

    const { scheduleDocument } = useSelector(state => state.schedule);
    const location = { scheduleDocument };
    const [locationInfo, setLocationInfo] = useState(undefined)

    const getVenueAddress = async location => {
        const data = await getDoc(doc(db, "venue", location.replace(" ", "_")));
        return data.data();
    };

    useEffect(() => {
        const data = getVenueAddress(location);
        setLocationInfo(data);
    }, [])

    let address = "";
    let city = "";

    return (
        <section className='schedulePreviewContainer' >
            <Header client={scheduleDocument.company} invoiceNumber={scheduleDocument.invNumber} location={locationInfo} />
            <Body schedule={scheduleDocument.daysData} />
        </section>
    );
};

export default SchedulePreview;