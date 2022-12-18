import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreatorCard from '../creatorCard/creatorCard.component';
import CreatorInput from '../creatorInput/creatorInput.component';
import MainButton from '../../mainButton/mainButton.component';

import previous from '../../../dummyDB/previous';
import { db } from '../../../utils/firebaseUtils/firebaseUtils';
import { getOptions } from '../../../utils/jsUtils/addUnderliner';
import { collection, getDocs } from 'firebase/firestore';
import { didUploadChecker } from '../../../redux/portal/newEntryPortal.slice';



const EmployeeCard = ({ current, employeeGoBack, updateEmployeeWalkaway, updateEmployeeInTime, updateEmployeeName, updateEmployeeOutTime, updateEmployeePosition, goToNextEmployee, updateRate }) => {

    const dispatch = useDispatch();
    const [isFristLoad, setFirstLoad] = useState(true)
    const { didUpload } = useSelector(state => state.newEntryPortal)


    // useEffect(()=> {
    //     if (didUpload === true && isFristLoad) {
    //         fetchDB();
    //         setFirstLoad(false);
    //         dispatch(didUploadChecker(false))
    //     } else if (didUpload === true && !isFristLoad) {
    //         fetchDB();
    //         setFirstLoad(false);
    //         dispatch(didUploadChecker(false))
    //     } else if (didUpload === false && isFristLoad) {
    //         fetchDB();
    //         setFirstLoad(false);
    //         dispatch(didUploadChecker(false))
    //     }
    // }, [didUpload]);

    // const fetchDB = async (kind) => {
    //     try {
    //         const group = await getDocs(collection(db, kind));
    //         const items = [];
    //         group.forEach(doc => {
    //             console.count(doc.id)
    //             items.push([doc.id.replaceAll("_", " ")]);
    //         })
    //         setEmployeeOptions(items);
    //     } catch (e) {
    //         console.error(e);
    //     }
        
    // }



    return (
        <CreatorCard >
            <CreatorInput type="options" label={`Employee ${current.employee} for shift ${current.shift}?`} subLabel={`For ${current.date}`} action={updateEmployeeName} entryType="tech" />
            <CreatorInput type="options" label="What Position?" action={updateEmployeePosition} entryType="position" />
            <CreatorInput type="in&out" label="Time?" subLabel={["In:", "Out:"]} action={[updateEmployeeInTime, updateEmployeeOutTime]} />
            <CreatorInput type="rate" label="Rate:"  action={updateRate} subLabel={["Client Rate:", "Employee Rate:"]} />
            <CreatorInput type="toggle" label="Walkaway?" selected={true} action={updateEmployeeWalkaway} />
            <section className="creatorPanel__initialQuestionButton" >
                <MainButton content="Back" action={employeeGoBack} />
                <MainButton content="Next" action={goToNextEmployee} />
            </section>
        </CreatorCard>
    )
};

export default EmployeeCard;