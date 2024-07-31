import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const HoursSvg = ({
    width = 31,
    height = 31,
    fillColor = 'white',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_796_6961)">
                    <path
                        d="M15.5 26.75C21.7132 26.75 26.75 21.7132 26.75 15.5C26.75 9.2868 21.7132 4.25 15.5 4.25C9.2868 4.25 4.25 9.2868 4.25 15.5C4.25 21.7132 9.2868 26.75 15.5 26.75Z"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15.5 9.25V15.5L19.25 19.25"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_796_6961">
                        <rect
                            width="30"
                            height="30"
                            fill="white"
                            transform="translate(0.5 0.5)"
                        />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default HoursSvg
