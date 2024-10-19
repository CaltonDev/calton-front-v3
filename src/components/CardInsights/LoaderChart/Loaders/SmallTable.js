import React from 'react';
import styles from "../LoaderChart.module.scss";
import StyledArticle from "../styledComponents/StyledArticle";
function SmallTable() {
    return (
        <>
            <StyledArticle>
                <div className="lineSmall"></div>
                <div className="lineSmall"></div>
                <div className="lineSmall"></div>
                <div className="lineSmall"></div>
                <div className="shimmerTable"></div>
            </StyledArticle>
        </>
    )
}

export default SmallTable