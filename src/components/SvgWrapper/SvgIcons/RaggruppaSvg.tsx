import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const RaggruppaSvg = ({
    width = 24,
    height = 24,
    fillColor = '#321D48',
}: SvgProps) => {
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
                    d="M18 5H12C10.8954 5 10 5.89543 10 7V17C10 18.1046 10.8954 19 12 19H18C19.1046 19 20 18.1046 20 17V7C20 5.89543 19.1046 5 18 5Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7 7V17"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M4 8V16"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default RaggruppaSvg
