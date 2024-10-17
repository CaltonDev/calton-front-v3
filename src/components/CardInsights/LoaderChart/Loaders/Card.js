import styles from "../LoaderChart.module.scss"
import DivShimmerBG from 'Components/ShimmerBG/DivShimmerBG';
import React from 'react';

function Card() {
    return <DivShimmerBG customClassName={styles.card}/>
}


export default Card