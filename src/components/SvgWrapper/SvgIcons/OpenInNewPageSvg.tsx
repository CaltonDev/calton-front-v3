import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const OpenInNewPageSvg = ({
    width = 18,
    height = 18,
    fillColor = '#3F49FC',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_880_3755)">
                    <path
                        d="M7.33341 4.66663H4.00008C3.64646 4.66663 3.30732 4.8071 3.05727 5.05715C2.80722 5.3072 2.66675 5.64634 2.66675 5.99996V12C2.66675 12.3536 2.80722 12.6927 3.05727 12.9428C3.30732 13.1928 3.64646 13.3333 4.00008 13.3333H10.0001C10.3537 13.3333 10.6928 13.1928 10.9429 12.9428C11.1929 12.6927 11.3334 12.3536 11.3334 12V8.66663"
                        stroke="#3F49FC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6.66675 9.33329L13.3334 2.66663"
                        stroke="#3F49FC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10 2.66663H13.3333V5.99996"
                        stroke="#3F49FC"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_880_3755">
                        <rect width={width} height={height} fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default OpenInNewPageSvg
