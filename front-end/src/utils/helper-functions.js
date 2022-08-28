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

export const groupMatchesByLeage = (matches) => {
    let matchesGroupedByLeague = [];
    let previousLeague = {};
    console.log(matches);
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
