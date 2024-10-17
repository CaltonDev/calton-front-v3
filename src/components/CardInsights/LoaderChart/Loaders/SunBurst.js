import React from 'react';
import styles from "../LoaderChart.module.scss";
import CirclesUnique from "./CirclesUnique";
import SpanShimmerBG from 'Components/ShimmerBG/SpanShimmerBG';


function SunBurst() {
    return (
        <div className={styles.allWidth}>
            <div className={styles.displayCol}>
                <SpanShimmerBG customStyle={{width: "100%", height: 25 }} title=""></SpanShimmerBG>
                <SpanShimmerBG customStyle={{width: "100%", height: 25 }} title=""></SpanShimmerBG>
                <SpanShimmerBG customStyle={{width: "100%", height: 25 }} title=""></SpanShimmerBG>
                <SpanShimmerBG customStyle={{width: "100%", height: 25 }} title=""></SpanShimmerBG>
                <SpanShimmerBG customStyle={{width: "100%", height: 25 }} title=""></SpanShimmerBG>
            </div>
            <CirclesUnique/>
        </div>
    )
}
export default SunBurst