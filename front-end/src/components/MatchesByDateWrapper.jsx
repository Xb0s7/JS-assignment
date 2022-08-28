import { useMemo } from 'react';
import { constructAllMatches, groupMatchesByLeage } from '../utils/helper-functions';
import { Event } from './Event';

export const MatchesByDateWrapper = ({ matches }) => {
    const content = useMemo(() => {
        const constructedAllMatches = constructAllMatches(matches);
        const sortedMatchesByDate = constructedAllMatches.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        const groupedMatchesByLeague = groupMatchesByLeage(sortedMatchesByDate);

        return groupedMatchesByLeague.map((event, index) => (
            <Event {...{ event }} key={index}></Event>
        ));
    }, [matches]);

    return content;
};
