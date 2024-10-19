import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const WorldSvg = ({
    width = 16,
    height = 16,
    fillColor = '#321D48',
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
                <path
                    d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M2.39999 6H13.6"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M2.39999 10H13.6"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7.66668 2C6.54357 3.79974 5.94815 5.87858 5.94815 8C5.94815 10.1214 6.54357 12.2003 7.66668 14"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.33334 2C9.45645 3.79974 10.0519 5.87858 10.0519 8C10.0519 10.1214 9.45645 12.2003 8.33334 14"
                    stroke={fillColor}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default WorldSvg
