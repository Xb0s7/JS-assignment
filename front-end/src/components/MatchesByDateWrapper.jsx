import { useMemo } from 'react';
import { constructAllMatches, groupMatchesByLeague } from '../utils/helper-functions';
import { League } from './League';

export const MatchesByDateWrapper = ({ events }) => {
    const content = useMemo(() => {
        const constructedAllMatches = constructAllMatches(events);
        const sortedMatchesByDate = constructedAllMatches.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        const groupedMatchesByLeague = groupMatchesByLeague(sortedMatchesByDate);

        return groupedMatchesByLeague.map((event, index) => (
            <League {...{ event }} key={index}></League>
        ));
    }, [events]);

    return content;
};
