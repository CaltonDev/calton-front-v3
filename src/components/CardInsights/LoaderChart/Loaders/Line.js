import React from 'react';
import styles from "../LoaderChart.module.scss";
import DivShimmerBG from 'Components/ShimmerBG/DivShimmerBG';


function Line () {
    return (
        <div style={{position: 'absolute'}}>
            <DivShimmerBG customStyle={{top: "45%"}} customClassName={styles.line}/>
            <DivShimmerBG customStyle={{rotate: "0deg"}} customClassName={styles.line}/>
        </div>
    )
}

export default Line