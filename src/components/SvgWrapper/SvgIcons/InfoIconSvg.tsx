import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const InfoIconSvg = ({ width = 24, height = 24 }: SvgProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
            >
                <g clipPath="url(#clip0_1620_5892)">
                    <path
                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        stroke="#C0BBC5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 8H12.01"
                        stroke="#C0BBC5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11 12H12V16H13"
                        stroke="#C0BBC5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1620_5892">
                        <rect width={width} height={height} fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default InfoIconSvg
