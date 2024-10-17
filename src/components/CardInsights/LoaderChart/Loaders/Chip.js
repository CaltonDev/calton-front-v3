import React from 'react';
import MockForLoaders from 'Components/CardInsights/LoaderChart/Constants/MockForLoaders';
import styles from 'Components/CardInsights/LoaderChart/LoaderChart.module.scss';
import LiShimmerBG from 'Components/ShimmerBG/LiShimmerBG';


function Chip({height = 50, marginBottom = 100, values = []}) {
    let allValues
    if (values.length > 0) {
        allValues = values
    } else {
        allValues = MockForLoaders.Horizontal
    }

    return (
        <>
            {
                MockForLoaders.numChip.map((elm, index) => {
                    return <LiShimmerBG key={elm} customClassName={styles.chip}></LiShimmerBG>
                })
            }
        </>
    )
}

export default Chip