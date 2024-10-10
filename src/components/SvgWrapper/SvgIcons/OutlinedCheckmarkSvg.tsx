import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const OutlinedCheckmarkSvg = ({
    width = 20,
    height = 20,
    fillColor = '#81788A',
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
                <path
                    d="M4.1665 9.99992L8.33317 14.1666L16.6665 5.83325"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default OutlinedCheckmarkSvg
