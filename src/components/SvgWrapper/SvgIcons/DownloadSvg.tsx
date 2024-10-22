import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const DownloadSvg = ({
    width = 16,
    height = 16,
    fillColor = 'white',
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
                <g clipPath="url(#clip0_2054_3535)">
                    <path
                        d="M2.6665 11.334V12.6673C2.6665 13.0209 2.80698 13.3601 3.05703 13.6101C3.30708 13.8602 3.64622 14.0007 3.99984 14.0007H11.9998C12.3535 14.0007 12.6926 13.8602 12.9426 13.6101C13.1927 13.3601 13.3332 13.0209 13.3332 12.6673V11.334"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M4.6665 7.33398L7.99984 10.6673L11.3332 7.33398"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8 2.66602V10.666"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_2054_3535">
                        <rect width="16" height="16" fill={fillColor} />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default DownloadSvg
