import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './creatorInput.styles.scss';

import { db } from '../../../utils/firebaseUtils/firebaseUtils';
import { collection, getDocs } from 'firebase/firestore';
import { didUploadChecker } from '../../../redux/portal/newEntryPortal.slice';

import { updateNewEntryPortalStatus, updateNewEntryPortalType } from '../../../redux/portal/newEntryPortal.slice';

const CreatorInput = ({type, id, label, subLabel, action, lowest, selected, entryType }) => {
    const dispatch = useDispatch();

    const portalOpener = (portalType) => {
        dispatch(updateNewEntryPortalStatus(true));
        dispatch(updateNewEntryPortalType(portalType));
    };

    const newSelected = async (value, action, entryType) => {
        if (value === "New") {
        portalOpener(entryType);
        
        } else {
            action(value);
        };
    };

    const [options, setOptions] = useState([]);
    const [isFristLoad, setFirstLoad] = useState(true)
    const { didUpload } = useSelector(state => state.newEntryPortal)


    useEffect(()=> {
        if (didUpload === true && isFristLoad) {
            fetchDB(entryType);
            setFirstLoad(false);
            dispatch(didUploadChecker(false))
        } else if (didUpload === true && !isFristLoad) {
            fetchDB(entryType);
            setFirstLoad(false);
            dispatch(didUploadChecker(false))
        } else if (didUpload === false && isFristLoad) {
            fetchDB(entryType);
            setFirstLoad(false);
            dispatch(didUploadChecker(false))
        }
    }, [didUpload]);

    const fetchDB = async (kind) => {
        try {
            const group = await getDocs(collection(db, kind));
            const items = [];
            group.forEach(doc => {
                items.push([doc.id.replaceAll("_", " ")]);
            })
            setOptions(items);
        } catch (e) {
            console.error(e);
        }
        
    }

    if (type === "options") {
        const selections = options.map(option => (
            selected ?
            <option onClick={e => newSelected(e.target.value, action, entryType)} className='creatoInputContainer__options__option' selected >{option}</option> :
            <option onClick={e => newSelected(e.target.value, action, entryType)} className='creatoInputContainer__options__option' >{option}</option>
        ))
        return (
            <section className='creatorInputContainer' >
                <label className='creatorInputContainer__label' htmlFor={id} >{label}</label>
                {
                    selected ? 
                    (<select className='creatorInputContainer__options' id={id} onChange={e => newSelected(e.target.value, action, entryType)} >
                        {
                            selections
                        }
                        <option onClick={e => {
                            e.preventDefault();
                            newSelected(e.target.value, action, entryType)
                        }} className='creatorInputContainer__options__option new' >New</option>
                    </select>) :
                    (<select className='creatorInputContainer__options' id={id} onChange={e => newSelected(e.target.value, action, entryType)} >
                    <option className='creatorInputContainer__options__option new' selected disabled > -- Choose an option --</option>
                        {
                            selections
                        }
                        <option  onClick={e => newSelected(e.target.value, action, entryType)} className='creatorInputContainer__options__option new' >New</option>
                    </select>)
                }
            </section>
        )
    } else if (type === "number") {
        return (
            <section className='creatorInputContainer' >
                <label className='creatorInputContainer__label' htmlFor={id} >{label}</label>
                <input type="number" min={lowest} defaultValue={selected} className='creatorInputContainer__options' id={id} onChange={e => action(e.currentTarget.value)} />
            </section>
        )
    } else if (type === "rate") {
        return (
            <section className='creatorInputContainer' >
                <label className='creatorInputContainer__label' htmlFor={id} >{label}</label>
                <section className='creatorInputContainer__times' >
                    <section className='creatorInputContainer__times__time' >
                        <label >{subLabel[0]}</label>
                        <input type="number" className='creatorInputContainer__options' id={`${id}A`} onChange={e => action(e.currentTarget.value, "clientRate")} />
                    </section>
                    <section className='creatorInputContainer__times__time' >
                        <label >{subLabel[1]}</label>
                        <input type="number" className='creatorInputContainer__options' id={`${id}B`} onChange={e => action(e.currentTarget.value, "employeeRate")} />
                    </section>
                </section>
            </section>
        )
    } else if (type === "date") {
        return (
            <section className='creatorInputContainer' >
                <label className='creatorInputContainer__label' htmlFor={id} >{label}</label>
                <input type="date" className='creatorInputContainer__options' id={id} onChange={e => action(e.currentTarget.value)} />
            </section>
        )
    } else if (type === "toggle") {        
        return (
            <section className='creatorInputContainer' >
                <label className='creatorInputContainer__label' >{label}</label>
                <label className='switch' htmlFor={id} >
                    {
                        selected ? <input id={id} type={'checkbox'} onChange={ e => action(e.currentTarget.checked)} defaultChecked />:
                        <input id={id} type={'checkbox'} onChange={ e => action(e.currentTarget.checked)} />
                    }
                    <span className="slider round" />
                </label>
            </section>
        )
    } else if (type === "time") {
        return (
            <section className='creatorInputContainer' >
                <label className='creatorInputContainer__label' htmlFor={id} >{label}</label>
                <input type="time" className='creatorInputContainer__options' id={id} onChange={e => action(e.currentTarget.value)} />
            </section>
        )
    } else if (type === "in&out") {
        return (
            <section className='creatorInputContainer' >
                <label className='creatorInputContainer__label' htmlFor={id} >{label}</label>
                <section className='creatorInputContainer__times' >
                    <section className='creatorInputContainer__times__time' >
                        <label >{subLabel[0]}</label>
                        <input type="time" className='creatorInputContainer__options' id={`${id}A`} onChange={e => action[0](e.currentTarget.value)} />
                    </section>
                    <section className='creatorInputContainer__times__time' >
                        <label >{subLabel[1]}</label>
                        <input type="time" className='creatorInputContainer__options' id={`${id}B`} onChange={e => action[1](e.currentTarget.value)} />
                    </section>
                </section>
            </section>
        )
    }
};

export default CreatorInput;