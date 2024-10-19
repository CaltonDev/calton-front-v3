import React from 'react';
import styles from "../LoaderChart.module.scss";
import MockForLoaders from "../Constants/MockForLoaders"
import SpanShimmerBG from 'Components/ShimmerBG/SpanShimmerBG';


function CirclesSmall() {
    return (
        <ul className={styles.containerInline}>
            <li className={styles.liContainer}>
                {
                    MockForLoaders.circleSmallOne.map((elm, index) => {
                        return <SpanShimmerBG key={elm} customClassName={[styles.radiusAll, index % 2 === 0 && styles.topMargin].join(" ")}
                                     customStyle={{width: elm, height: elm}} title=""></SpanShimmerBG>
                    })
                }
            </li>
            <li className={styles.liContainer}>
                {
                    MockForLoaders.circleSmallTwo.map((elm, index) => {
                        return <SpanShimmerBG key={elm} customClassName={[styles.radiusAll, index % 2 === 0 && styles.bottomMargin].join(" ")}
                                     customStyle={{width: elm, height: elm}} title=""></SpanShimmerBG>
                    })
                }
            </li>
            <li className={styles.liContainer}>
                {
                    MockForLoaders.circleSmallThird.map((elm, index) => {
                        return <SpanShimmerBG key={elm} customClassName={[styles.radiusAll, index % 2 === 0 && styles.topMargin].join(" ")}
                                     customStyle={{width: elm, height: elm}} title=""></SpanShimmerBG>
                    })
                }
            </li>
        </ul>
    )
}

export default CirclesSmall