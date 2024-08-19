import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const RowSelectionSvg = ({
    width = 20,
    height = 20,
    fillColor = '#321D48',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_398_9379)">
                    <path
                        d="M15 3.33325H4.99998C4.07951 3.33325 3.33331 4.07944 3.33331 4.99992V14.9999C3.33331 15.9204 4.07951 16.6666 4.99998 16.6666H15C15.9205 16.6666 16.6666 15.9204 16.6666 14.9999V4.99992C16.6666 4.07944 15.9205 3.33325 15 3.33325Z"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10 3.33325V16.6666"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_398_9379">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default RowSelectionSvg
