import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const ArrowBackSvg = ({
    width = 24,
    height = 24,
    fillColor = '#464D69',
}: SvgProps) => {
    console.log('fil: ', fillColor)
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 6L9 12L15 18"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default ArrowBackSvg
