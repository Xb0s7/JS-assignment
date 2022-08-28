import React from 'react';
import dateformat from 'dateformat';
export const Match = ({ match }) => {
    const firstBet = match.Bet && match.Bet[0];
    const firstOdd = firstBet && firstBet.Odd.find((el) => el.$.Name === '1');
    const secondOdd = firstBet && firstBet.Odd.find((el) => el.$.Name === '2');

    const dateInMiliseconds = Date.parse(match.$.StartDate);

    return (
        <>
            {match.$ && (
                <div className='match-container'>
                    <div className='match-info'>
                        <div className='match-date'>
                            {dateformat(dateInMiliseconds, 'dd mmm HH:MM')}
                        </div>
                        <div className='match-name'>{match.$.Name}</div>
                    </div>
                    <div className='match-bets'>
                        <div className='match-bet'>
                            {firstOdd ? <p>{firstOdd.$.Value}</p> : <p>Locked</p>}
                        </div>
                        <div className='match-bet'></div>
                        <div className='match-bet'>
                            {secondOdd ? <p>{secondOdd.$.Value}</p> : <p>Locked</p>}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
