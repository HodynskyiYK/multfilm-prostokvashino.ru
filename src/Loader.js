import React from "react";

function Loader() {

    return (
        <div className="b-loader__wrapper">
            <div className="b-loader">
                <div className="b-loader__circle">
                    <div className="b-loader__container">
                        <div className="b-loader__spinner b-loader__spinner--orange">
                            <div className="b-loader__spinner b-loader__spinner--blue">
                                <div className="b-loader__spinner b-loader__spinner--green" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader