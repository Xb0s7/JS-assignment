import { useMemo } from 'react';
import { constructMatchesByLeague } from '../utils/helper-functions';
import { Event } from './Event';
import { League } from './League';

export const MatchesByLeagueWrapper = ({ events }) => {
    const content = useMemo(() => {
        const constructedAllLeagues = constructMatchesByLeague(events);
        const sortedMatchesByLeague = constructedAllLeagues.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

        return sortedMatchesByLeague.map((event, index) => (
            <Event {...{ event }}>
                {event.leagues.map((league) => (
                    <League event={league} key={league.id}></League>
                ))}
            </Event>
        ));
    }, [events]);

    return content;
};
