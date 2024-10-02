import styles from "../LoaderChart.module.scss";
import MockForLoaders from 'Components/CardInsights/LoaderChart/Constants/MockForLoaders';
import React from "react";
import DivShimmerBG from 'Components/ShimmerBG/DivShimmerBG';


function ListingHomeCard() {

    function getViewportWidth() {
        if (window.innerWidth) {
            return window.innerWidth;
        } else if (document.documentElement && document.documentElement.clientWidth) {
            return document.documentElement.clientWidth;
        } else if (document.body && document.body.clientWidth) {
            return document.body.clientWidth;
        }
        return 0;
    }

    function getCardNum () {
        const windowWidth = getViewportWidth()
        if (windowWidth >= 1535 ) {
            return  3
        } else if (windowWidth >= 896 && windowWidth <= 1534) {
            return  3
        } else if (windowWidth <= 895) {
            return  1
        }
        return 1
    }

    const cardNum = getCardNum()
    const MockArray = Array.from({ length: cardNum }, () => 1);
    return (
        <div className={styles.cardListingHome}>
            {
                MockArray.map((elm, index) => {
                    return (
                        <div key={index} className={styles.cardListingHomeContainer}>
                                <div className={styles.cardHeaderListingHome}/>
                            <div className={styles.cardContainerColListingHome}>
                                <DivShimmerBG customStyle={{height: 20, marginBottom: '2.5em', marginTop: '1.5rem' }} />

                                <DivShimmerBG className={styles.firstInfoListingHomeCard} customStyle={{height: 20}}/>
                                <DivShimmerBG className={styles.infoListingHomeCard} customStyle={{height: 20, marginTop: '1.5rem' }}/>
                                <DivShimmerBG className={styles.infoListingHomeCard} customStyle={{height: 20, marginTop: '1.5rem' }}/>
                                <DivShimmerBG className={styles.infoListingHomeCard} customStyle={{height: 20, marginTop: '1.5rem' }}/>
                                <DivShimmerBG className={styles.infoListingHomeCard} customStyle={{height: 20, marginTop: '1.5rem' }}/>

                                <div className={styles.lastInfoListingHomeCard} />

                                <DivShimmerBG customClassName={styles.footerCardSurveys} />
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default ListingHomeCard