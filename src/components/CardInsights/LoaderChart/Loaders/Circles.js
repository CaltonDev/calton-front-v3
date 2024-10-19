import React from 'react';
import styles from "../LoaderChart.module.scss";
import MockForLoaders from "../Constants/MockForLoaders";
import SpanShimmerBG from 'Components/ShimmerBG/SpanShimmerBG';


function Circles() {

    return (
        <ul className={styles.containerInline}>
            <li className={styles.liContainer}>
                {
                    MockForLoaders.circleOne.map((elm, index) => {
                        return <SpanShimmerBG key={elm} customClassName={styles.radiusAll}
                                              customStyle={{width: elm, height: elm}} title=""></SpanShimmerBG>
                    })
                }
            </li>
            <li className={styles.liContainer}>
                {
                    MockForLoaders.circleTwo.map((elm, index) => {
                        return <SpanShimmerBG key={elm} c={styles.radiusAll}
                                     customStyle={{width: elm, height: elm}} title=""></SpanShimmerBG>
                    })
                }
            </li>
        </ul>
    )

}

export default Circles