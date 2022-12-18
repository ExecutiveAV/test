import React from 'react';
import './filterButton.styles.scss';
import { ReactComponent as Arrow } from '../../assets/media/svg/arrow.svg';

import Button from '../button/button.component';

const FilterButton = () => {
    return (
        <Button >
            <section className='filterButton' >
                <section className='filterButton__content' >
                    <p className='filterButton__content__text' >Filter</p>
                    <Arrow className='filterButton__content__arrow' />
                </section>
            </section>
        </Button>
        
    );
};

export default FilterButton;