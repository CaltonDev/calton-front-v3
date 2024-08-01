import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const StarSvg = ({
    width = 30,
    height = 30,
    fillColor = 'white',
    svgBackgroundColor,
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={
                    svgBackgroundColor
                        ? { background: svgBackgroundColor, borderRadius: 10 }
                        : {}
                }
            >
                <path
                    d="M17.5 24.6879L9.78504 28.7442L11.2588 20.1529L5.00879 14.0692L13.6338 12.8192L17.4913 5.00293L21.3488 12.8192L29.9738 14.0692L23.7238 20.1529L25.1975 28.7442L17.5 24.6879Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default StarSvg
