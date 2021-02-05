import React, {useContext} from "react";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import MatchItem from "./MatchItem";
import {MatchesContext} from "../Pages/Home";
import Loader from "../Loader";

function MatchesList() {
    const {matchesList} = useContext(MatchesContext);

    return (
        <div className="gg-page-content">{
            matchesList.length ? (
                <TransitionGroup className="gg-main-tournaments all-tournaments" component="div" data-sport="all">{
                    matchesList.map(item => (
                        <CSSTransition key={item.id} timeout={300}>
                            <MatchItem match={item} />
                        </CSSTransition>)
                    )
                }</TransitionGroup>
            ) : (
                <Loader/>
            )
        }</div>
    )
}

export default MatchesList;