import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const HomeSvg = ({
    width = 30,
    height = 30,
    fillColor = 'white',
}: SvgProps) => {
    return (
        <>
            <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_245_4237)">
                    <path
                        d="M8.75 17.5H6.25L17.5 6.25L28.75 17.5H26.25"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.75 17.5V26.25C8.75 26.913 9.01339 27.5489 9.48223 28.0178C9.95107 28.4866 10.587 28.75 11.25 28.75H23.75C24.413 28.75 25.0489 28.4866 25.5178 28.0178C25.9866 27.5489 26.25 26.913 26.25 26.25V17.5"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M13.75 28.75V21.25C13.75 20.587 14.0134 19.9511 14.4822 19.4822C14.9511 19.0134 15.587 18.75 16.25 18.75H18.75C19.413 18.75 20.0489 19.0134 20.5178 19.4822C20.9866 19.9511 21.25 20.587 21.25 21.25V28.75"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_245_4237">
                        <rect
                            width="30"
                            height="30"
                            fill={fillColor}
                            transform="translate(2.5 2.5)"
                        />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default HomeSvg
