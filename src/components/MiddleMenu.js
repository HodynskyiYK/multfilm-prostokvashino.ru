import React, {useContext, useEffect, useState} from "react";
import {MatchesContext} from "../Pages/Home";

function MiddleMenu() {
    const [banner, setBanner] = useState(1240);
    const {refLink} = useContext(MatchesContext);

    function changeBanner() {
        let window_width = window.innerWidth;
        if (window_width > 1120) {
            setBanner(1240);
        } else if ( (window_width <= 1120) && (window_width > 568) ) {
            setBanner(980);
        } else {
            setBanner(360);
        }
    }

    useEffect(() => {
        changeBanner();
        window.onresize = changeBanner;
    }, []);

    return (
        <ul id="menu-middle" className="menu">
            <li id="menu-item-3651" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3651">
                <a href={refLink} rel="nofollow noopener noreferrer" target="_blank">
                    <img src={`wp-content/themes/4376/img/banner_${banner}.png`} alt="Bet with aegis"/>
                    {/*<img src={`./img/banner_${banner}.png`} alt="Страховка ставки AEGIS"/>*/}
                </a>
            </li>
            {/*<li id="menu-item-3651" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3651">
                <a href="/">Live</a>
            </li>
            <li id="menu-item-3654" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3654">
                <a href="/">Результаты</a>
            </li>*/}
        </ul>
    )
}

export default MiddleMenu;