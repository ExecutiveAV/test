import React, { useState } from 'react';
import './searchBar.styles.scss';

import { ReactComponent as MagGlass } from '../../assets/media/svg/magnifyingGlass.svg';

const SearchBar = () => {
    const [searchBarValue, setSearchBarValue] = useState("");
    console.log(searchBarValue);

    return (
        <section className='searchbar' >
           <input onChange={e => setSearchBarValue(e.target.value)} className='searchbar__bar' type="text" placeholder='Search' />
           {searchBarValue === "" ? <MagGlass className='searchbar__magGlass' /> : null }
        </section>
    );
};

export default SearchBar;