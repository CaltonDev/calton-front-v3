import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const PlusSvg = ({
    width = 24,
    height = 24,
    fillColor = '#3F49FC',
}: SvgProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M12 5V19"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 12H19"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default PlusSvg
