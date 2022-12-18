import { useSelector, useDispatch } from 'react-redux';
import './creatorPanel.styles.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ReactPDF from 'react-pdf-browser';
import SchedulePDF from '../../PDFs/SchedulePDF';

import previous from '../../dummyDB/previous';

import CreatorCard from './creatorCard/creatorCard.component';
import CreatorInput from './creatorInput/creatorInput.component';
import MainButton from '../mainButton/mainButton.component';
import EmployeeCard from './employeeCard/employeeCard.component';

import Portal from '../../containers/createPortal/createPortal';

import { updateSchedule, updateCurrentShift, updateCurrentDay, updateCurrentDate, updateCurrentEmployee } from '../../redux/schedule/schedule.slice';
import { updateKind } from '../../redux/kind/kind.slice';
import NewEntryPortal from '../portals/newEntryPortal/newEntryPortal.component';

const CreatorPanel = () => {

    const { kind } = useSelector(state => state.kind);
    const { scheduleDocument, current } = useSelector(state => state.schedule);
    const { invNumber, company, location, daysData } = scheduleDocument;
    const { isNewEntryPortalOpen, newEntryPortalType } = useSelector(state => state.newEntryPortal);

    const dispatch = useDispatch();

    const dayGenerator = () => ({
        date: "",
        shifts: [],
    });

    const shiftGenerator = () => ({
        timeIn: "",
        timeOut: "",
        guys: [],
    });

    const guysGenerator = () => ({
        name: "",
        position: "",
        walkaway: true,
        timeIn: "",
        timeOut: "",
        rate: 30
    });

    const updateCompany = (company) => {
        let temp = JSON.parse(JSON.stringify(scheduleDocument));
        temp.company = company;
        dispatch(updateSchedule(temp))
    }

    const updateInvoice = (invoice) => {
        let temp = JSON.parse(JSON.stringify(scheduleDocument));
        temp.invNumber = invoice;
        dispatch(updateSchedule(temp));
    }

    const updateVenue = (venue) => {
        let temp = JSON.parse(JSON.stringify(scheduleDocument));
        temp.location = venue;
        dispatch(updateSchedule(temp));
    }

    const updateDays = (days) => {
        let tempSchedule = JSON.parse(JSON.stringify(scheduleDocument));
        if (tempSchedule.daysData.length < days) {
            for (let i = 0; i < days - tempSchedule.daysData.length; i++) {
                let temp = dayGenerator();
                temp.shifts.push(shiftGenerator());
                tempSchedule.daysData.push(temp);
            }
        } else if (tempSchedule.daysData.length > days) {
            for (let i = 0; i < tempSchedule.daysData.length - days; i++) {
                tempSchedule.daysData.pop();
            }
        }
        dispatch(updateSchedule(tempSchedule));
    }

    const goToDays = () => {
        dispatch(updateKind("days"));
    };

    const employeeGoBack = () => {
        let lastEmployee;
        let lastShift;
        if (current.employee === 1 && current.shift === 1) {
            dispatch(updateKind("days"));
        } else if (current.employee === 1 && current.shift !== 1) {
            dispatch(updateKind("days"));
        } else {
            dispatch(updateCurrentEmployee(current.employee - 1));
        }
    }

    const goBack = () => {
        let lastEmployee;
        let lastShift;
        const thisShift = current.shift - 1;
        if (current.day === 1 && current.shift === 1 && current.employee === 1 && kind === "days") {
            dispatch(updateKind("initialQuestion"));
        } else if (current.employee === 1 && current.shift === 1 && current.day !== 1) {
            lastEmployee = scheduleDocument.daysData[current.day - 2].shifts[scheduleDocument.daysData[current.day - 2].shifts.length - 1].guys.length;
            lastShift = scheduleDocument.daysData[current.day - 2].shifts.length;
            dispatch(updateCurrentShift(lastShift));
            dispatch(updateCurrentEmployee(lastEmployee));
            dispatch(updateCurrentDay(current.day - 1))
            dispatch(updateKind("shifts"));
        } else if (current.employee === 1 && current.shift !== 1) {
            lastEmployee = scheduleDocument.daysData[current.day - 1].shifts[thisShift - 1].guys.length;
            dispatch(updateCurrentShift(thisShift));
            dispatch(updateCurrentEmployee(lastEmployee));
            dispatch(updateKind("shifts"));
        }
    };

    const goToShift = () => {
        dispatch(updateKind("shifts"));
    };

    const updateShiftPeople = (amountOfPeople) => {
        let temp = JSON.parse(JSON.stringify(scheduleDocument));
        let shift = shiftGenerator();
        for (let i = 0; i < amountOfPeople; i++) {
            shift.guys.push(guysGenerator());
        }
        temp.daysData[current.day -1].shifts[current.shift -1] = shift;
        dispatch(updateSchedule(temp));
    };

    const updateDate = newDate => {
        let temp = JSON.parse(JSON.stringify(scheduleDocument));
        temp.daysData[current.day - 1].date = newDate;
        dispatch(updateSchedule(temp));
        dispatch(updateCurrentDate(newDate));
    };

    const updateEmployeeName = name => {
        let temp = JSON.parse(JSON.stringify(scheduleDocument));
        temp.daysData[current.day - 1].shifts[current.shift - 1].guys[current.employee - 1].name = name;
        dispatch(updateSchedule(temp));
    };

    const updateEmployeePosition = position => {
        let temp = JSON.parse(JSON.stringify(scheduleDocument));
        temp.daysData[current.day - 1].shifts[current.shift - 1].guys[current.employee - 1].position = position;
        dispatch(updateSchedule(temp));
    };

    const updateEmployeeWalkaway = walkaway => {
        let temp = JSON.parse(JSON.stringify(scheduleDocument));
        temp.daysData[current.day - 1].shifts[current.shift - 1].guys[current.employee - 1].walkaway = walkaway;
        dispatch(updateSchedule(temp));
    };

    const updateEmployeeInTime = time => {
        let temp = JSON.parse(JSON.stringify(scheduleDocument));
        temp.daysData[current.day - 1].shifts[current.shift - 1].guys[current.employee - 1].timeIn = time;
        if (current.employee === 1) {
            temp.daysData[current.day - 1].shifts[current.shift - 1].timeIn = time;
        }
        dispatch(updateSchedule(temp));
    };

    const updateEmployeeOutTime = time => {
        let temp = JSON.parse(JSON.stringify(scheduleDocument));
        temp.daysData[current.day - 1].shifts[current.shift - 1].guys[current.employee - 1].timeOut = time;
        
        if (current.employee === 1) {
            temp.daysData[current.day - 1].shifts[current.shift - 1].timeOut = time;
        }
        dispatch(updateSchedule(temp));
    }

    const updateRate = (rate, kind) => {
        let temp = JSON.parse(JSON.stringify(scheduleDocument));
        temp.daysData[current.day - 1].shifts[current.shift - 1].guys[current.employee - 1][kind] = rate;
        dispatch(updateSchedule(temp));
    }

    const goToNextEmployee = () => {
        if (current.employee === scheduleDocument.daysData[current.day - 1].shifts[current.shift - 1].guys.length && current.shift !== scheduleDocument.daysData[current.day - 1].shifts.length) {
            dispatch(updateCurrentEmployee(1));
            dispatch(updateCurrentShift(current.shift + 1));
            dispatch(updateKind("days"))
        } else if (current.employee === scheduleDocument.daysData[current.day - 1].shifts[current.shift - 1].guys.length && current.shift === scheduleDocument.daysData[current.day - 1].shifts.length && current.day !== scheduleDocument.daysData.length) {
            dispatch(updateCurrentEmployee(1));
            dispatch(updateCurrentShift(1));
            dispatch(updateCurrentDay(current.day + 1))
            dispatch(updateKind("days"))
        } else if (current.day === scheduleDocument.daysData.length && current.shift === scheduleDocument.daysData[current.day - 1].shifts.length && current.employee === scheduleDocument.daysData[current.day - 1].shifts[current.shift - 1].guys.length ) {
            ReactPDF.renderToFile(<SchedulePDF schedule={scheduleDocument} />, `/test.pdf`);
        } else {
            dispatch(updateCurrentEmployee(current.employee + 1));
        }
    }

    const addShift = (toggleValue) => {
        if (toggleValue) {
            let temp = JSON.parse(JSON.stringify(scheduleDocument));
            temp.daysData[current.day -1].shifts.push(shiftGenerator());
            dispatch(updateSchedule(temp));
        } else if (!toggleValue) {
            let temp = JSON.parse(JSON.stringify(scheduleDocument));
            temp.daysData[current.day -1].shifts.pop();
            dispatch(updateSchedule(temp));
        }
    }

    const InitialQuestion = () => {
        return (
            <CreatorCard>
                <CreatorInput type="options" label="Which Company is it for?" action={updateCompany} entryType="company" />
                <CreatorInput type="number" label={`Invoice #`} lowest={previous.invoiceNumber.option + 1} action={updateInvoice} />
                <CreatorInput type="options" label="What Venue?" action={updateVenue} entryType="venue" />
                <CreatorInput type="number" label="How Many Days?" lowest={1} action={updateDays} />
                <section className="creatorPanel__initialQuestionButton" >
                    <MainButton content="Next" action={goToDays} />
                </section>
            </CreatorCard>
        )
    };

    const BackToInitialQuestion = (company, inv, venue, days) => {
        
        return (
            <CreatorCard>
                <CreatorInput type="options" label="Which Company is it for?" selected={company} action={updateCompany} entryType="company" />
                <CreatorInput type="number" label={`Invoice #`} lowest={previous.invoiceNumber.option + 1} selected={inv} action={updateInvoice} />
                <CreatorInput type="options" label="What Venue?" selected={venue} action={updateVenue} entryType="venue" />
                <CreatorInput type="number" label="How Many Days?" lowest={1} selected={days} action={updateDays} />
                <section className="creatorPanel__initialQuestionButton" >
                    <MainButton content="Next" action={goToDays} />
                </section>
            </CreatorCard>
        );
    };


    const DayQuestion = () => {
        return (
            <CreatorCard >
            {
                current.shift === 1 ?
                <CreatorInput type="date" label={`What date is it for Day ${current.day}`} action={updateDate} /> :
                ""
            }
                
                <CreatorInput selected={1} type="number" label={`How many people for shift ${current.shift}?`} lowest={1} action={updateShiftPeople} />
                <CreatorInput type="toggle" label="Add extra shift?" action={addShift} />
                <section className="creatorPanel__initialQuestionButton" >
                    <MainButton content="Back" action={() => goBack()} />
                    <MainButton content="Next" action={() => goToShift()} />
                </section>
            </CreatorCard>
        );
    }

    return (
        
        <section className='creatorPanel' >
            {
                kind === "initialQuestion" ? InitialQuestion() :
                kind === "days" ? DayQuestion(current.day) :
                kind === "backToInitialQuestion" ? BackToInitialQuestion(company, invNumber, location, daysData.length) :
                kind === "shifts" ?
                    <EmployeeCard current={current} updateRate={updateRate} employeeGoBack={employeeGoBack} updateEmployeeWalkaway={updateEmployeeWalkaway} updateEmployeeInTime={updateEmployeeInTime} updateEmployeeName={updateEmployeeName} updateEmployeeOutTime={updateEmployeeOutTime} updateEmployeePosition={updateEmployeePosition} goToNextEmployee={goToNextEmployee} /> :
                ""
            }
            {
                isNewEntryPortalOpen ?
                <Portal >
                    <NewEntryPortal newEntryType={newEntryPortalType} />
                </Portal> :
                ""
            }
        </section>
    );
};

export default CreatorPanel;