import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const SendIconSvg = ({
    width = 16,
    height = 16,
    fillColor = '#3F49FC',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_953_10680)">
                    <path
                        d="M6.66675 9.33333L14.0001 2"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14 2L9.66671 14C9.63746 14.0638 9.5905 14.1179 9.53141 14.1558C9.47232 14.1938 9.40359 14.2139 9.33338 14.2139C9.26317 14.2139 9.19444 14.1938 9.13535 14.1558C9.07626 14.1179 9.0293 14.0638 9.00005 14L6.66671 9.33333L2.00005 7C1.93622 6.97075 1.88213 6.92379 1.84421 6.8647C1.80629 6.80561 1.78613 6.73688 1.78613 6.66667C1.78613 6.59646 1.80629 6.52772 1.84421 6.46863C1.88213 6.40954 1.93622 6.36258 2.00005 6.33333L14 2Z"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_953_10680">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default SendIconSvg
