export const constructAllMatches = (events) => {
    let allMatches = [];

    events.forEach((event) => {
        let splitedName = event.$.Name.split(', ');

        let league = splitedName[1];

        const constructedMatches = event.Match.map((match) => {
            return { match: { ...match }, date: match.$.StartDate, league };
        });

        allMatches = [...allMatches, ...constructedMatches];
    });
    return allMatches;
};

export const groupMatchesByLeague = (matches) => {
    let matchesGroupedByLeague = [];
    let previousLeague = {};

    matches.forEach((match) => {
        if (previousLeague.league === match.league) {
            let newLeagueWithMatches = {
                ...previousLeague,
                matches: [...previousLeague.matches, match.match],
            };
            matchesGroupedByLeague.pop();
            matchesGroupedByLeague.push(newLeagueWithMatches);
        } else {
            const leagueWithMatches = { league: match.league, matches: [{ ...match.match }] };
            matchesGroupedByLeague.push(leagueWithMatches);
            previousLeague = { ...leagueWithMatches };
        }
    });
    return matchesGroupedByLeague;
};

export const constructMatchesByLeague = (events) => {
    let sortByLeague = [];

    events.forEach((event) => {
        const eventIndex = sortByLeague.findIndex((el) => el.categoryID === event.$.CategoryID);

        let splitedName = event.$.Name.split(', ');
        let eventName = splitedName[0];
        let league = splitedName[1];

        if (eventIndex >= 0) {
            let mainEvent = sortByLeague[eventIndex];

            let mainEventLeagues = [...mainEvent.leagues, { league, matches: [...event.Match] }];
            mainEvent.leagues = [...mainEventLeagues];
        } else {
            sortByLeague.push({
                name: eventName,
                categoryID: event.$.CategoryID,
                leagues: [{ league, id: event.$.ID, matches: [...event.Match] }],
            });
        }
    });

    return sortByLeague;
};
