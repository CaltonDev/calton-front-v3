import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const ArrowBackSvg = ({
    width = 24,
    height = 24,
    fillColor = '#464D69',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_231_3568)">
                    <path
                        d="M12.5 21.75C17.3325 21.75 21.25 17.8325 21.25 13C21.25 8.16751 17.3325 4.25 12.5 4.25C7.66751 4.25 3.75 8.16751 3.75 13C3.75 17.8325 7.66751 21.75 12.5 21.75Z"
                        stroke="#321D48"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M26.25 26.75L18.75 19.25"
                        stroke="#321D48"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_231_3568">
                        <rect
                            width="30"
                            height="30"
                            fill="white"
                            transform="translate(0 0.5)"
                        />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default ArrowBackSvg
