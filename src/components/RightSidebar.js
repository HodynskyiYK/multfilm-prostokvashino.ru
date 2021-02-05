import React, {useContext, useEffect, useState} from "react";
import SidebarSlider from "./SidebarSlider";
import {MatchesContext} from "../Pages/Home";
import Loader from "../Loader";

function RightSidebar() {
    const {matches} = useContext(MatchesContext);
    const [topDotaMatches, setTopDotaMatches] = useState([]);
    const [topCsMatches, setTopCsMatches] = useState([]);
    const [showTab, setShowTab] = useState({
        cs: true,
        dota: false
    });

    useEffect(() => {
        setTopDotaMatches(filterTopMatchesByGame(matches, 'Dota 2'));
        setTopCsMatches(filterTopMatchesByGame(matches, 'Counter-Strike'));
    }, [matches]);

    function filterTopMatchesByGame(arr, game) {
        let matches_arr = arr.filter(item => {
            if (item.game === game && item.type === 'prematch') {
                return item;
            }
            return null;
        });
        return matches_arr;
    }

    function changeActiveTab(game) {
        let tabs = {...showTab};
        if (game === 'cs' && !tabs.cs) {
            tabs.cs = true;
            tabs.dota = false;
        } else if (game === 'dota' && !tabs.dota) {
            tabs.cs = false;
            tabs.dota = true;
        }
        setShowTab(tabs);
    }

    return (
        <aside className="sidebar gg-right-sidebar">
            <p className="top_matches">Топ события дня</p>
            <div className="sidebar-tabs">
                <ul className="tab-nav">
                    <li className={ showTab.cs ? "nav-item active" : "nav-item" }>
                        <a
                            href="#cs_tab"
                            onClick={e => {
                                e.preventDefault();
                                changeActiveTab('cs');
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 80 80">
                                <use xlinkHref="#esports_counter_strike_4cb2c" />
                            </svg>
                            <span>Counter-Strike</span>
                        </a>
                    </li>
                    <li className={ showTab.dota ? "nav-item active" : "nav-item" }>
                        <a
                            href="#dota_tab"
                            onClick={e => {
                                e.preventDefault();
                                changeActiveTab('dota');
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 80 80">
                                <use xlinkHref="#esports_dota_2_81226" />
                            </svg>
                            <span>Dota 2</span>
                        </a>
                    </li>
                </ul>
                <div className="tabs">
                    {
                        showTab.cs ? (
                            <div id="cs_tab" className="tab active">
                                {
                                    topCsMatches.length ? <SidebarSlider slides={topCsMatches} /> : <Loader/>
                                }
                            </div>
                        ) : null
                    }
                    {
                        showTab.dota ? (
                            <div id="dota_tab" className="tab active">
                                {
                                    topDotaMatches.length ? <SidebarSlider slides={topDotaMatches} /> : null
                                }
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </aside>
    )
}

export default RightSidebar;