import React from 'react';
import './creatorCard.style.scss'

const CreatorCard = ({ children }) => {
    return (
        <section className='creatorCard' >
            <section className='creatorCard__items' >
                {
                    children
                }
            </section>
        </section>
    );
};

export default CreatorCard;