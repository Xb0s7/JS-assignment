import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '../components/Spinner';
import { MatchesByDateWrapper } from '../components/MatchesByDateWrapper';
export const MatchFeed = () => {
    const [matches, setMatches] = useState();

    const [loading, setLoading] = useState(false);

    const [isSortedByDate, setIsSortedByDate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8081/matches', {
                    'Content-Type': 'application/xml; charset=utf-8',
                });
                const { XmlSports } = await response.data;
                setMatches([...XmlSports.Sport[0].Event]);
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
                <button {...{ onClick }}>
                    {isSortedByDate ? 'Sort By League' : 'Sort By Date'}
                </button>
            </header>
            {loading && <LoadingSpinner></LoadingSpinner>}
            <div className='container'>
                {!loading && matches && isSortedByDate && (
                    <MatchesByDateWrapper {...{ matches }}></MatchesByDateWrapper>
                )}
            </div>
        </section>
    );
};
