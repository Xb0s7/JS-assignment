import React, { useState } from 'react';

export const Event = ({ children, event }) => {
    const [isActive, setIsActive] = useState(true);
    return (
        <div className='accordion'>
            <div className='accordion-item'>
                <div className='accordion-title event-title' onClick={() => setIsActive(!isActive)}>
                    <h4>{event.name}</h4>
                </div>
                <div className={`accordion-content ${isActive ? 'active' : ''}`}>{children}</div>
            </div>
        </div>
    );
};
