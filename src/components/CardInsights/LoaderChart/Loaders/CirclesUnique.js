import React from 'react';
import styles from "../LoaderChart.module.scss";
import DivShimmerBG from 'Components/ShimmerBG/DivShimmerBG';


function CirclesUnique() {
    return (
        <>
            <DivShimmerBG customClassName={[styles.radiusAll, styles.donut].join(" ")} customStyle={{width: 220, height: 220}}>
                <div className={styles.hole}></div>
            </DivShimmerBG>

        </>
    )
}

export default CirclesUnique