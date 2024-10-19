import React from 'react';
import styles from "../LoaderChart.module.scss";
import MockForLoaders from 'Components/CardInsights/LoaderChart/Constants/MockForLoaders';
import DivShimmerBG from 'Components/ShimmerBG/DivShimmerBG';


function CardSurveys() {
    return (
        <>
            {
                MockForLoaders.numCardSurveys.map((elm, index) => {
                    return <div key={index} className={styles.cardSurveyContainer}>
                        <div className={styles.cardContainerCol}>
                            <DivShimmerBG customStyle={{height: 20, marginBottom: '0.5em' }} />

                            <DivShimmerBG customClassName={styles.firstInfoCardSurveys}/>
                            <DivShimmerBG customClassName={styles.infoCardSurveys} />
                            <DivShimmerBG customClassName={styles.infoCardSurveys} />
                            <DivShimmerBG customClassName={styles.infoCardSurveys} />
                            <DivShimmerBG customClassName={styles.lastInfoCardSurveys} />

                            <DivShimmerBG customClassName={styles.footerCardSurveys} />
                        </div>
                    </div>
                })
            }

        </>
    )
}

export default CardSurveys