import React from 'react';
import styles from "../LoaderChart.module.scss";
import DivShimmerBG from 'Components/ShimmerBG/DivShimmerBG';


function Calendar() {

    return (
        <DivShimmerBG customClassName={styles.downArrow}></DivShimmerBG>
    )
}

export default Calendar