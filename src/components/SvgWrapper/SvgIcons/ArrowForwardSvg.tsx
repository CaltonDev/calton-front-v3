import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const ArrowForwardSvg = ({
    width = 24,
    height = 24,
    fillColor = '#464D69',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M9.5 6.5L15.5 12.5L9.5 18.5"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default ArrowForwardSvg
