import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const ArrowDownSvg = ({
    width = 24,
    height = 24,
    fillColor = 'white',
}: SvgProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 16 16"
                fill="none"
            >
                <path
                    d="M4 6L8 10L12 6"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default ArrowDownSvg
