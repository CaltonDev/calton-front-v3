import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const GrafoSvg = ({
    width = 30,
    height = 30,
    fillColor = 'white',
}: SvgProps) => {
    return (
        <>
            <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_245_5223)">
                    <path
                        d="M9.25 14.25C12.0114 14.25 14.25 12.0114 14.25 9.25C14.25 6.48858 12.0114 4.25 9.25 4.25C6.48858 4.25 4.25 6.48858 4.25 9.25C4.25 12.0114 6.48858 14.25 9.25 14.25Z"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.25 4.25V9.25H14.25"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11.75 21.75V26.75"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M21.75 18V26.75"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16.75 16.75V26.75"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M26.75 15.5V26.75"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_245_5223">
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

export default GrafoSvg
