import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const EyeSvg = ({
    width = 16,
    height = 16,
    fillColor = '#3F49FC',
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
                    d="M7.99999 9.33334C8.73637 9.33334 9.33332 8.73638 9.33332 8.00001C9.33332 7.26363 8.73637 6.66667 7.99999 6.66667C7.26361 6.66667 6.66666 7.26363 6.66666 8.00001C6.66666 8.73638 7.26361 9.33334 7.99999 9.33334Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14.6667 8C12.8887 11.1113 10.6667 12.6667 8.00001 12.6667C5.33334 12.6667 3.11134 11.1113 1.33334 8C3.11134 4.88866 5.33334 3.33333 8.00001 3.33333C10.6667 3.33333 12.8887 4.88866 14.6667 8Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default EyeSvg
