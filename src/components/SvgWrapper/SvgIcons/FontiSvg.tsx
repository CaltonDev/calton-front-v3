import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const FontiSvg = ({
    width = 25,
    height = 25,
    fillColor = 'white',
    svgBackgroundColor,
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={
                    svgBackgroundColor
                        ? { background: svgBackgroundColor, borderRadius: 10 }
                        : {}
                }
            >
                <path
                    d="M18.5 4.5H6.5C4.84315 4.5 3.5 5.84315 3.5 7.5V9.5C3.5 11.1569 4.84315 12.5 6.5 12.5H18.5C20.1569 12.5 21.5 11.1569 21.5 9.5V7.5C21.5 5.84315 20.1569 4.5 18.5 4.5Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M18.5 12.5H6.5C4.84315 12.5 3.5 13.8431 3.5 15.5V17.5C3.5 19.1569 4.84315 20.5 6.5 20.5H18.5C20.1569 20.5 21.5 19.1569 21.5 17.5V15.5C21.5 13.8431 20.1569 12.5 18.5 12.5Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7.5 8.5V8.51"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7.5 16.5V16.51"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default FontiSvg
