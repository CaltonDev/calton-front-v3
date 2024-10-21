import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const ExpandIconSvg = ({
    width = 12,
    height = 12,
    fillColor = '#81788A',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 2.5H12.5V5"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.75 6.25L12.5 2.5"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 12.5H2.5V10"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M2.5 12.5L6.25 8.75"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10 12.5H12.5V10"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.75 8.75L12.5 12.5"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 2.5H2.5V5"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M2.5 2.5L6.25 6.25"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default ExpandIconSvg
