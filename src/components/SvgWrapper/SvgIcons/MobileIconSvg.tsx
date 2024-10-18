import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const MobileIconSvg = ({
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
                <g clipPath="url(#clip0_1356_20713)">
                    <path
                        d="M13.3335 3.33398H6.66683C6.20659 3.33398 5.8335 3.70708 5.8335 4.16732V15.834C5.8335 16.2942 6.20659 16.6673 6.66683 16.6673H13.3335C13.7937 16.6673 14.1668 16.2942 14.1668 15.834V4.16732C14.1668 3.70708 13.7937 3.33398 13.3335 3.33398Z"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.1665 4.16602H10.8332"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10 14.166V14.1743"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1356_20713">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default MobileIconSvg
