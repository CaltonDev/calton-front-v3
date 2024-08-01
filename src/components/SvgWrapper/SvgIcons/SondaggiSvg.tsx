import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const SondaggiSvg = ({
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
                <g clipPath="url(#clip0_796_5714)">
                    <path
                        d="M11.75 6.75H9.25C8.58696 6.75 7.95107 7.01339 7.48223 7.48223C7.01339 7.95107 6.75 8.58696 6.75 9.25V24.25C6.75 24.913 7.01339 25.5489 7.48223 26.0178C7.95107 26.4866 8.58696 26.75 9.25 26.75H21.75C22.413 26.75 23.0489 26.4866 23.5178 26.0178C23.9866 25.5489 24.25 24.913 24.25 24.25V9.25C24.25 8.58696 23.9866 7.95107 23.5178 7.48223C23.0489 7.01339 22.413 6.75 21.75 6.75H19.25"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16.75 4.25H14.25C12.8693 4.25 11.75 5.36929 11.75 6.75C11.75 8.13071 12.8693 9.25 14.25 9.25H16.75C18.1307 9.25 19.25 8.13071 19.25 6.75C19.25 5.36929 18.1307 4.25 16.75 4.25Z"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11.75 15.5H11.7625"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16.75 15.5H19.25"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11.75 20.5H11.7625"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16.75 20.5H19.25"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_796_5714">
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

export default SondaggiSvg
