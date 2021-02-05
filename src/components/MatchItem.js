import React, {Fragment, useContext} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {SlideDown} from "react-slidedown";
import 'react-slidedown/lib/slidedown.css'
import {MatchesContext} from "../Pages/Home";

function MatchItem({match, position}) {
    const {getMatchId, refLink} = useContext(MatchesContext);
    let start_match = match.start_match;
    let start_match_arr = start_match.split(' ');
    let date = start_match_arr[0];
    let date_arr = date.split('-');
    let year_now = new Date().getFullYear();
    let month_now = new Date().getMonth() + 1;
    let date_now = new Date().getDate();
    if (date_now < 10) date_now = `0${date_now}`;
    if (`${year_now}-${month_now}-${date_now}` === date) {
        date = 'Сегодня';
    } else {
        date = `${date_arr[2]}.${date_arr[1]}.${date_arr[0]}`;
    }

    let time = start_match_arr[1];
    let time_arr = time.split(':');
    time = `${time_arr[0]}:${time_arr[1]}`;

    let stream = match.stream;
    if (stream) {
        stream = (`${match.stream}&parent=${window.location.hostname}`);
    }

    let game_icon;
    if (match.game === 'Dota 2') {
        game_icon = '#esports_dota_2_81226';
    } else {
        game_icon = '#esports_counter_strike_4cb2c';
    }

    return (
        <div className="gg-main-tournament">
            <div className="tour-header">
                <a className="tour-title" href={refLink}>
                    <svg className="tour-icon" width="20" height="20" viewBox="0 0 80 80">
                        <use xlinkHref={game_icon} />
                    </svg>
                    {match.league}</a>
            </div>
            {
                match.type === 'live' && match.stream ? (
                    <SlideDown>
                        {
                            match.show ? (
                                <div className="tour-body">
                                    <div className="body-content">
                                        <p className="tour-players-title">
                                            <span className="icon" />
                                            <span className="players">{match.team1_name} vs {match.team2_name}</span>
                                        </p>
                                        <div className="tour-twitch">
                                            <iframe
                                                src={stream}
                                                title="title"
                                                width="760"
                                                height="430"
                                                allow="autoplay; fullscreen"
                                            />
                                        </div>
                                        <div className="tour-description">
                                            <a className="tour-title" href={refLink}>
                                                <svg className="tour-icon" width="20" height="20" viewBox="0 0 80 80">
                                                    <use xlinkHref={game_icon} />
                                                </svg>
                                                <span>{match.league}</span>
                                            </a>
                                            <div className="tour-players">
                                                <div className="player first">
                                                    <a className="player-logo" href={refLink}>
                                                        <LazyLoadImage
                                                            src={match.team1_logo}
                                                            alt={match.team1_name}
                                                        />
                                                    </a>
                                                    <a className="player-title" href={refLink}>{match.team1_name}</a>
                                                </div>
                                                <div className="tour-result">
                                                    <span className="live-icon">Live</span>
                                                </div>
                                                <div className="player second">
                                                    <a className="player-logo" href={refLink}>
                                                        <LazyLoadImage
                                                            src={match.team2_logo}
                                                            alt={match.team2_name}
                                                        />
                                                    </a>
                                                    <a className="player-title" href={refLink}>{match.team2_name}</a>
                                                </div>
                                            </div>
                                            <p className="winner-title">Winner</p>
                                            <div className="tour-coefficients">
                                                <p className="coefficient first">
                                                    <a href={refLink} rel="nofollow noopener noreferrer" target="_blank">{match.bet_team1}</a>
                                                </p>
                                                <p className="vs">vs</p>
                                                <p className="coefficient second">
                                                    <a href={refLink} rel="nofollow noopener noreferrer" target="_blank">{match.bet_team2}</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </SlideDown>
                ) : null
            }
            <div className="tour-footer">
                <a className="tour-date" href={refLink}>{
                    match.type === 'live' ? (
                        <span className="live">live</span>
                    ) : (
                        <Fragment>
                            <span className="time">{time}</span>
                            <span className="date">{date}</span>
                        </Fragment>
                    )
                }</a>
                <div className="tour-teams">
                    <a className="team first" href={refLink}>
                        <span className="team-logo">
                            <LazyLoadImage
                                src={match.team1_logo}
                                alt={match.team1_name}
                            />
                        </span>
                        <span className="team-name">{match.team1_name}</span>
                    </a>
                    <div className="with-icon">X</div>
                    <a className="team second" href={refLink}>
                        <span className="team-logo">
                            <LazyLoadImage
                                src={match.team2_logo}
                                alt={match.team2_name}
                            />
                        </span>
                        <span className="team-name">{match.team2_name}</span>
                    </a>
                </div>
                <div className="tour-coefficients">
                    <a className="coefficient first"
                       href={refLink}
                       rel="nofollow noopener noreferrer"
                       target="_blank">{match.bet_team1}</a>
                    <a className="coefficient second"
                       href={refLink}
                       rel="nofollow noopener noreferrer"
                       target="_blank">{match.bet_team2}</a>
                </div>
                <div className="tour-info">
                    {
                        match.type === 'live' ? (
                            <div className="watch-tour">{
                                match.show ? (
                                    <a className="watch_this_tour active"
                                       href={refLink}
                                       onClick={(e) => {
                                           e.preventDefault();
                                           getMatchId(match.id);
                                       }}
                                    >
                                        <svg className="hide-icon" width="16" height="16" viewBox="0 0 10 16">
                                            <use xlinkHref="#arrow-left_3c6dd" />
                                        </svg>
                                        <span>Спрятать</span>
                                    </a>
                                ) : (
                                    <a className="watch_this_tour"
                                       href={refLink}
                                       onClick={(e) => {
                                           e.preventDefault();
                                           getMatchId(match.id);
                                       }}
                                    >
                                        <svg className="watch-icon" width="16" height="16" viewBox="0 0 357 357">
                                            <use xlinkHref="#play-arrow_a9461" />
                                        </svg>
                                        <span>Смотреть</span>
                                    </a>
                                )
                            }</div>
                        ) : null
                    }
                    <a className="coefficient-count" href={refLink}>+{match.bets_count}</a>
                </div>
            </div>
        </div>
    )
}

export default MatchItem;