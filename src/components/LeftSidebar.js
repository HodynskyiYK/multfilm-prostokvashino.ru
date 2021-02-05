import React, {useContext, useEffect, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {SlideDown} from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import {MatchesContext} from "../Pages/Home";

function LeftSidebar() {
    const [showMenuItem, setShowMenuItem] = useState(false);
    const {matches} = useContext(MatchesContext);
    const {getGameName} = useContext(MatchesContext);
    const {getLeagueName} = useContext(MatchesContext);
    const [uniqueMatches, setUniqueMatches] = useState([]);
    const [matchesCount, setMatchesCount] = useState({
        all: 0,
        cs: 0,
        dota: 0
    });
    const [activeItem, setActiveItem] = useState({
        all: [true, true],
        cs: [false, false],
        dota: [false, false]
    });

    useEffect(() => {
        setShowMenuItem(true);
    }, []);

    useEffect(() => {
        // add unique arr and matches count
        let count = {
            all: 0,
            cs: 0,
            dota: 0
        };
        let arr = [];
        let unique_arr = [];
        matches.map(item => {
            if ( item.game === 'Counter-Strike' ) count.cs++;
            if (item.game === 'Dota 2') count.dota++;

            if (!arr.includes(item.league)) {
                arr.push(item.league);
                unique_arr.push(item)
            }
            return null;
        });
        count.all = matches.length;
        setMatchesCount(count);
        setUniqueMatches(unique_arr);
    }, [matches]);

    function getMatchesCountInLeague(arr, league) {
        let matches_count = 0;
        arr.map(item => {
            if (item.league === league) matches_count++;
            return null;
        });
        return matches_count;
    }

    function changeActiveItem(game) {
        let items = {...activeItem};
        for (let item in items) {
            if (item === game) {
                items[`${item}`][0] = true;
                items[`${item}`][1] = !items[`${item}`][1];
            } else {
                items[`${item}`][0] = false;
                items[`${item}`][1] = false;
            }
        }
        let game_name = 'All';
        if (game === 'cs') game_name = 'Counter-Strike';
        if (game === 'dota') game_name = 'Dota 2';
        getGameName(game_name);
        activeSubMenuItem('all');
        setActiveItem(items);
    }

    function activeSubMenuItem(link) {
        let arr = [...uniqueMatches];
        let leagues_arr = arr.map(item => {
            if (item.league === link) {
                item.active = true;
            } else {
                item.active = false;
            }
            return item;
        });
        setUniqueMatches(leagues_arr);
    }

    return (
        <aside className="gg-left-sidebar">
            <CSSTransition
                in={showMenuItem}
                timeout={500}
                className="sidebar-menu"
            >
            <ul className="sidebar-menu">
                <li className="menu-item">
                <span
                    className={ activeItem.all[0] ? "menu-link active" : "menu-link" }
                    onClick={() => changeActiveItem('all')}
                >
                    <svg className="menu-icon" width="20" height="20" viewBox="0 0 24 24">
                        <use xlinkHref="#gamepad_cdf9c" />
                    </svg>
                    <span className="menu-text">Все игры<b id="all_matches_count" className="count">{matchesCount.all}</b></span>
                </span>
                </li>
                <li className="menu-item">
                    <span
                        className={ activeItem.cs[0] ? "menu-link active" : "menu-link" }
                        onClick={() => changeActiveItem('cs')}
                    >
                        <svg className="menu-icon" width="20" height="20" viewBox="0 0 80 80">
                            <use xlinkHref="#esports_counter_strike_4cb2c" />
                        </svg>
                        <span className="menu-text">Counter-Strike<b id="cs_matches_count" className="count">{matchesCount.cs}</b></span>
                    </span>
                    <SlideDown>{
                        activeItem.cs[1] ? (
                            <ul id="cs_leagues" className="sub-menu">{
                                uniqueMatches.map(item => item.game === 'Counter-Strike' && (
                                    <li key={item.id} className="sub-item">
                                        <a
                                            className={ item.active ? "sub-link active" : "sub-link" }
                                            href={item.league_link}
                                            onClick={e => {
                                                e.preventDefault();
                                                activeSubMenuItem(item.league);
                                                getLeagueName(item.league);
                                            }}
                                        >
                                            <span className="title">{item.league}</span>
                                            <span className="game-count">{getMatchesCountInLeague(matches, item.league)}</span>
                                        </a>
                                    </li>
                                ))
                            }</ul>
                        ) : null
                    }</SlideDown>
                </li>
                <li className="menu-item">
                    <span
                        className={ activeItem.dota[0] ? "menu-link active" : "menu-link" }
                        onClick={() => changeActiveItem('dota')}
                    >
                        <svg className="menu-icon" width="20" height="20" viewBox="0 0 80 80">
                            <use xlinkHref="#esports_dota_2_81226" />
                        </svg>
                        <span className="menu-text">Dota 2<b id="dota_matches_count" className="count">{matchesCount.dota}</b></span>
                    </span>
                    <SlideDown>{
                        activeItem.dota[1] ? (
                            <ul id="dota_leagues" className="sub-menu">{
                                uniqueMatches.map(item => item.game === 'Dota 2' && (
                                    <li key={item.id} className="sub-item">
                                        <a
                                            className={ item.active ? "sub-link active" : "sub-link" }
                                            href={item.league_link}
                                            onClick={e => {
                                                e.preventDefault();
                                                activeSubMenuItem(item.league);
                                                getLeagueName(item.league);
                                            }}
                                        >
                                            <span className="title">{item.league}</span>
                                            <span className="game-count">{getMatchesCountInLeague(matches, item.league)}</span>
                                        </a>
                                    </li>
                                ))
                            }</ul>
                        ) : null
                    }</SlideDown>
                </li>
            </ul>
        </CSSTransition>
        </aside>
    )
}

export default LeftSidebar;