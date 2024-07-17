import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const ProductSvg = ({
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
                <g clipPath="url(#clip0_245_5206)">
                    <path
                        d="M15.5 4.25L25.5 9.875V21.125L15.5 26.75L5.5 21.125V9.875L15.5 4.25Z"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15.5 15.5L25.5 9.875"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15.5 15.5V26.75"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15.5 15.5L5.5 9.875"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20.5 7.0625L10.5 12.6875"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_245_5206">
                        <rect
                            width="30"
                            height="30"
                            fill={fillColor}
                            transform="translate(0.5 0.5)"
                        />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default ProductSvg
