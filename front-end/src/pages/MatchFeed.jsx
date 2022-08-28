import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '../components/Spinner';
import { MatchesByDateWrapper } from '../components/MatchesByDateWrapper';
import { MatchesByLeagueWrapper } from '../components/MatchesByLeagueWrapper';
export const MatchFeed = () => {
    const [events, setEvents] = useState();

    const [loading, setLoading] = useState(false);

    const [isSortedByDate, setIsSortedByDate] = useState(false);

    console.log(events);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8081/matches', {
                    'Content-Type': 'application/xml; charset=utf-8',
                });
                const { XmlSports } = await response.data;
                setEvents([...XmlSports.Sport[0].Event]);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const onClick = () => {
        setIsSortedByDate(!isSortedByDate);
    };

    return (
        <section className='section-match-feed'>
            <header className='header'>
                <h4>Esports</h4>
                <button className='sort-button' {...{ onClick }}>
                    {isSortedByDate ? 'Sort By League' : 'Sort By Date'}
                </button>
            </header>
            {loading && <LoadingSpinner></LoadingSpinner>}
            <div className='container'>
                {!loading && events && (
                    <>
                        {isSortedByDate ? (
                            <MatchesByDateWrapper {...{ events }}></MatchesByDateWrapper>
                        ) : (
                            <MatchesByLeagueWrapper {...{ events }}></MatchesByLeagueWrapper>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};
