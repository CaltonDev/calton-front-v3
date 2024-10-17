import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const SinglePencilSvg = ({
    width = 16,
    height = 16,
    fillColor = '#3F49FC',
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
                <g clipPath="url(#clip0_1853_7051)">
                    <path
                        d="M2.66669 13.3333H5.33335L12.3334 6.33333C12.687 5.97971 12.8856 5.50009 12.8856 5C12.8856 4.4999 12.687 4.02029 12.3334 3.66666C11.9797 3.31304 11.5001 3.11438 11 3.11438C10.4999 3.11438 10.0203 3.31304 9.66669 3.66666L2.66669 10.6667V13.3333Z"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9 4.33333L11.6667 7"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1853_7051">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default SinglePencilSvg
