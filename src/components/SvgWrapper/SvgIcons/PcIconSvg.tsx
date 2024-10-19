import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const PcIconSvg = ({
    width = 20,
    height = 20,
    fillColor = '#C0BBC5',
}: SvgProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 20 20"
                fill="none"
            >
                <g clipPath="url(#clip0_1356_20716)">
                    <path
                        d="M16.6667 3.33398H3.33333C2.8731 3.33398 2.5 3.70708 2.5 4.16732V12.5007C2.5 12.9609 2.8731 13.334 3.33333 13.334H16.6667C17.1269 13.334 17.5 12.9609 17.5 12.5007V4.16732C17.5 3.70708 17.1269 3.33398 16.6667 3.33398Z"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5.8335 16.666H14.1668"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M7.5 13.334V16.6673"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12.5 13.334V16.6673"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1356_20716">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default PcIconSvg
