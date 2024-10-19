import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const PhoneSvg = ({
    width = 16,
    height = 16,
    fillColor = 'black',
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
                <g clipPath="url(#clip0_1837_8085)">
                    <path
                        d="M3.33333 2.66667H6L7.33333 6L5.66667 7C6.38064 8.44769 7.55231 9.61936 9 10.3333L10 8.66667L13.3333 10V12.6667C13.3333 13.0203 13.1929 13.3594 12.9428 13.6095C12.6928 13.8595 12.3536 14 12 14C9.39951 13.842 6.94677 12.7377 5.10455 10.8954C3.26234 9.05323 2.15803 6.60049 2 4C2 3.64638 2.14048 3.30724 2.39052 3.05719C2.64057 2.80714 2.97971 2.66667 3.33333 2.66667"
                        stroke={fillColor}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_1837_8085">
                        <rect width="16" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default PhoneSvg
