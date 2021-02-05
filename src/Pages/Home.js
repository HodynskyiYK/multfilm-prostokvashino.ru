import React, {Fragment, useEffect, useMemo, useState} from "react";
import LeftSidebar from "../components/LeftSidebar";
import MiddleMenu from "../components/MiddleMenu";
import SearchForm from "../components/SearchForm";
import MatchesList from "../components/MatchesList";
import RightSidebar from "../components/RightSidebar";

import {AJAX_URL} from "../information/ajax_url";
import {defaul_matches} from "../information/default_matches";
import {REFERRAL_LINK} from "../information/referral_link";

export const MatchesContext = React.createContext({});

function Home() {
    const ref_link = REFERRAL_LINK;
    const ajaxUrl = AJAX_URL;
    const defaultMatches = defaul_matches;
    const [matches, setMatches] = useState([]);
    const [refLink, setRefLink] = useState('#');
    const [filterMatches, setFilterMatches] = useState([]);

    // get all matches
    useMemo(() => {
        fetch(`${ajaxUrl}?action=get_all_live_matches`)
            .then(response => response.json())
            .then(result => {
                let matches = result.map(item => {
                    item.active = false;
                    item.show = false;
                    return item;
                });
                setMatches(matches);
            })
            .catch(() => {
                let matches = defaultMatches.map(item => {
                    item.active = false;
                    item.show = false;
                    return item;
                });
                setMatches(matches);
            });
    }, [ajaxUrl, defaultMatches]);

    // get referral link
    useMemo(() => {
        fetch(`${ajaxUrl}?action=get_referral_link`)
            .then(response => response.json())
            .then(result => setRefLink(result))
            .catch(() => setRefLink(ref_link))
    }, [ajaxUrl, ref_link]);

    //filter matches by search form's value
    useEffect(() => {
        setFilterMatches(matches);
    }, [matches]);

    function filterAllMatches(value) {
        let arr = [...matches];
        let find_matches = arr.filter(item => {
            if ( (item.team1_name.toLowerCase().substr(0, value.length) === value.toLowerCase()) || (item.team2_name.toLowerCase().substr(0, value.length) === value.toLowerCase()) ) {
                return item;
            }
            return null;
        });
        setFilterMatches(find_matches);
    }

    function showOnlyGameMatches(game) {
        let arr = [...matches];
        if (game === 'All') {
            setFilterMatches(arr);
            return null;
        }
        let game_matches = arr.filter(item => {
            item.show = false;
            if (item.game === game) return item;
            return null
        });
        setFilterMatches(game_matches);
    }

    function showOnlyLeagueMatches(league) {
        let arr = [...matches];
        let game_matches = arr.filter(item => {
            item.show = false;
            if (item.league === league) return item;
            return null
        });
        setFilterMatches(game_matches);
    }

    function showLiveMatchBody(id) {
        let arr = [...filterMatches];
        let matches_arr = arr.map(item => {
            if (item.id === id && !item.show) {
                item.show = true;
            } else if (item.id === id && item.show) {
                item.show = false;
            } else {
                item.show = false;
            }
            return item;
        });
        setFilterMatches(matches_arr);
    }

    return (
        <Fragment>
            <MatchesContext.Provider value={{
                matches: matches,
                refLink: refLink,
                getSearchFormValue: filterAllMatches,
                getGameName: showOnlyGameMatches,
                getLeagueName: showOnlyLeagueMatches,
                getMatchId: showLiveMatchBody,
                matchesList: filterMatches
            }}>
                <LeftSidebar />
                <div className="main-content">
                    <div className="gg-middle-menu">
                        <MiddleMenu />
                        <SearchForm/>
                    </div>
                    <div className="gg-page-with-sidebar">
                        <MatchesList/>
                        <RightSidebar/>
                    </div>
                </div>
            </MatchesContext.Provider>
        </Fragment>
    )

}

export default Home;