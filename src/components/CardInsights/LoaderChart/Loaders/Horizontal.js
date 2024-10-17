import React from 'react';
import MockForLoaders from 'Components/CardInsights/LoaderChart/Constants/MockForLoaders';
import LiShimmerBG from 'Components/ShimmerBG/LiShimmerBG';


function Horizontal({height = 50, marginBottom = 100, values = []}) {
    let allValues
    if (values.length > 0) {
        allValues = values
    } else {
        allValues = MockForLoaders.Horizontal
    }

    return (
        <>
            {
                allValues.map((elm, index) => {
                    return <LiShimmerBG key={elm} customStyle={{width: elm, height: height, marginBottom: marginBottom}} />
                })
            }
        </>
    )
}

export default Horizontal