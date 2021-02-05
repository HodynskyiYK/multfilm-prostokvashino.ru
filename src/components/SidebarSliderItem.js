import React, {useContext} from "react";
import {MatchesContext} from "../Pages/Home";

function SidebarSliderItem({match}) {
    const {refLink} = useContext(MatchesContext);
    let start_match = match.start_match;
    let start_match_arr = start_match.split(' ');
    let date = start_match_arr[0];
    let date_arr = date.split('-');
    let year_now = new Date().getFullYear();
    let month_now = new Date().getMonth() + 1;
    let date_now = new Date().getDate();
    if (`${year_now}-${month_now}-${date_now}` === date) {
        date = 'Сегодня';
    } else {
        date = `${date_arr[2]}.${date_arr[1]}.${date_arr[0]}`;
    }

    let time = start_match_arr[1];
    let time_arr = time.split(':');
    time = `${time_arr[0]}:${time_arr[1]}`;

    return (
        <div className="sidebar_card">
            <a className="card-title" href={refLink}>
                {match.league}
            </a>
            <div className="players">
                <a className="play first" href={refLink}>
                    <p className="play-image">
                        <img
                            src={match.team1_logo}
                            alt={match.team1_name}
                        />
                    </p>
                    <p className="play-name">{match.team1_name}</p>
                </a>
                <div className="play-live">
                    <b className="time">{time}</b>
                    <span className="date">{date}</span>
                </div>
                <a className="play second" href={refLink}>
                    <p className="play-image">
                        <img
                            src={match.team2_logo}
                            alt={match.team2_name}
                        />
                    </p>
                    <p className="play-name">{match.team2_name}</p>
                </a>
            </div>
            <p className="winner-title">Победитель</p>
            <div className="coefficients">
                <a className="coefficient first" href={refLink} rel="nofollow noopener noreferrer" target="_blank">{match.bet_team1}</a>
                <p className="vs">vs</p>
                <a className="coefficient second" href={refLink} rel="nofollow noopener noreferrer" target="_blank">{match.bet_team2}</a>
            </div>
            <p className="card-link">
                <a className="link" href={refLink}>
                    <svg width="16" height="16" viewBox="0 0 12 12">
                        <use xlinkHref="#favorite-fill_07763" />
                    </svg>
                    <span className="link-text">+{match.bets_count}</span>
                </a>
            </p>
        </div>
    )
}

export default SidebarSliderItem;