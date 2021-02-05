import React, {useContext} from "react";
import {MatchesContext} from "../Pages/Home";

function SearchForm() {
    const {getSearchFormValue} = useContext(MatchesContext);

    return (
        <form className="gg-search"
              onSubmit={e => e.preventDefault()}
              role="search" id="searchform"
              method="get"
              action="https://multfilm-prostokvashino.ru/">
            <input type="search"
                   className="gg-search__input"
                   name="s"
                   id="s"
                   maxLength="50"
                   placeholder="Поиск"
                   onChange={e => getSearchFormValue(e.target.value)}
            />
            <button type="submit" className="gg-search__btn" id="searchsubmit">
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <use xlinkHref="#search_5fbaf" />
                </svg>
            </button>
        </form>
    )
}

export default SearchForm;