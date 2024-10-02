import React from 'react';
import MockForLoaders from 'Components/CardInsights/LoaderChart/Constants/MockForLoaders';
import LiShimmerBG from 'Components/ShimmerBG/LiShimmerBG';


function VerticalTooltip() {
    return (
        <>
            {
                MockForLoaders.VerticalTooltip.map((elm, index) => {
                    return <LiShimmerBG key={elm} customStyle={{height: elm}} />
                })
            }
        </>
    )
}

export default VerticalTooltip
