import React from 'react';
import styles from "../LoaderChart.module.scss";
import StyledArticle from "../styledComponents/StyledArticle";
function Table({numRows = 4}) {


    return (
        <>
            <StyledArticle>
              {Array.from({length: numRows})?.map((idx) => {
                return (
                  <div key={idx} className="line"></div>
                )
              })}
              <div className="shimmerTable"></div>
            </StyledArticle>
        </>
    )
}

export default Table