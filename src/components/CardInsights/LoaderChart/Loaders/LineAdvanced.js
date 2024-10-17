import React from 'react';
import styles from "../LoaderChart.module.scss";
import DivShimmerBG from 'Components/ShimmerBG/DivShimmerBG';


function LineAdvanced({multi = true}) {
    return (
        <div className={styles.containerLineAdvanced}>
            <div style={{width: '100%'}}>
                <DivShimmerBG customClassName={styles.line1} customStyle={!multi ? {bottom: 100} : {}}/>
                {
                    multi &&
                    <DivShimmerBG customClassName={styles.line3}/>
                }
            </div>
            <DivShimmerBG className={styles.lineAdvanced}/>
        </div>
    )
}

export default LineAdvanced