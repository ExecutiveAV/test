import React , {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './filePanel.styles.scss'

import { Link } from 'react-router-dom';

import { db } from '../../utils/firebaseUtils/firebaseUtils';
import { collection, getDocs, } from 'firebase/firestore';

import SearchBar from '../searchBar/searchBar.component';
import Button from '../button/button.component';
import FilterButton from '../filterButton/filterButton.component';
import FileList from '../fileList/fileList.component';

const FilePanel = ({kind}) => {

    const [files, setFiles] = useState([])

    useEffect(()=> {
       fetchFiles(kind);
    }, []);

    const fetchFiles = async (kind) => {
        try {
            const files = await getDocs(collection(db, kind));
            const items = [];
            files.forEach(doc => {
                items.push(doc.data());
            });
            setFiles(items);
        } catch (e) {
            console.error(e);
        }
    }
    
    return (
        <section className='filePanel' >
            <section className='filePanel__header' >
                <SearchBar />
                <Button customStyle="filePanel__header__button" >
                    <Link to="new" >New</Link>
                </Button>
                <FilterButton />
            </section>
            <FileList type={"Schedule #"} filesData={files} kind={kind}  />
        </section>
    );
};

export default FilePanel;