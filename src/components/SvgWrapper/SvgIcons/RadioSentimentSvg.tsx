import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const RadioSentimentSvg = ({
    width = 24,
    height = 24,
    fillColor = '#34E0A1',
}: SvgProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="6.5"
                    fill={fillColor}
                    stroke={fillColor}
                />
                <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke={fillColor}
                    strokeWidth="2"
                />
            </svg>
        </>
    )
}

export default RadioSentimentSvg
