import { useState } from 'react';
import { Match } from './Match';

export const Event = ({ event }) => {
    const [isActive, setIsActive] = useState(false);
    console.log(event);
    return (
        <div className='accordion'>
            <table className='accordion-item'>
                <thead className='accordion-title' onClick={() => setIsActive(!isActive)}>
                    <tr className='event-info'>
                        <td className='event-name'>{event.league}</td>
                        <td className='event-odds'>
                            <div className='odd'>
                                <p>1</p>
                            </div>
                            <div className='odd'>
                                <p>X</p>
                            </div>
                            <div className='odd'>
                                <p>2</p>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={`accordion-content ${isActive ? 'active' : ''}`}>
                                {event.matches &&
                                    event.matches.map((match) => (
                                        <Match {...{ match }} key={match.$.ID} />
                                    ))}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
