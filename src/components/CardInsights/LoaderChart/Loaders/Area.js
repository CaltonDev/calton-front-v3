import styles from "../LoaderChart.module.scss";
import DivShimmerBG from 'Components/ShimmerBG/DivShimmerBG';
import React from 'react';

function Area() {

    return (
        <DivShimmerBG customClassName={styles.downArrow}></DivShimmerBG>

    )
}

export default Area