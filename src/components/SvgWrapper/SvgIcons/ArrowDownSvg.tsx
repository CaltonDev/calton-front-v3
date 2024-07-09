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
                width={width}
                height={height}
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5 8L10 13L15 8"
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
