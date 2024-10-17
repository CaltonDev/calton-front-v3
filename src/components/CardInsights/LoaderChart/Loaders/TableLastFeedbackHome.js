import React from 'react';
import styles from "../LoaderChart.module.scss";
import StyledArticle from "../styledComponents/StyledArticle";


function TableLastFeedbackHome() {
    return (
        <>
            <StyledArticle>
                <div className={'row'}
                     style={{
                         background: 'linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%)',
                         padding: '2%',
                         borderRadius: '65px',
                         marginTop: '30px',
                         marginBottom: '50px',
                         color: 'white',
                         width: '100%',
                         height: '120px',
                         alignSelf: 'center',
                         margin: '20px 0'
                     }}
                ></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="shimmerTable"></div>
            </StyledArticle>
        </>
    )
}

export default TableLastFeedbackHome