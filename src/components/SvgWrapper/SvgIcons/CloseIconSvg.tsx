import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const CloseIconSvg = ({
    width = 15,
    height = 15,
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
                <g clipPath="url(#clip0_708_9462)">
                    <path
                        d="M11.25 3.75L3.75 11.25"
                        stroke={fillColor}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3.75 3.75L11.25 11.25"
                        stroke={fillColor}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_708_9462">
                        <rect width="15" height="15" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default CloseIconSvg
