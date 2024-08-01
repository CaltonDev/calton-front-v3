import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const PerformanceSvg = ({
    width = 30,
    height = 30,
    fillColor = 'white',
    svgBackgroundColor,
}: SvgProps) => {
    return (
        <>
            <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={
                    svgBackgroundColor
                        ? { background: svgBackgroundColor, borderRadius: 10 }
                        : {}
                }
            >
                <path
                    d="M13 21.75C17.8325 21.75 21.75 17.8325 21.75 13C21.75 8.16751 17.8325 4.25 13 4.25C8.16751 4.25 4.25 8.16751 4.25 13C4.25 17.8325 8.16751 21.75 13 21.75Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M26.75 26.75L19.25 19.25"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9.25 15.5C9.25 15.5 10.5 13 11.125 13C11.75 13 12.375 14.25 13 14.25C13.625 14.25 14.875 11.75 15.5 11.75C16.125 11.75 17.375 13 18 13C18.625 13 24.25 6.75 24.25 6.75"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </>
    )
}

export default PerformanceSvg
