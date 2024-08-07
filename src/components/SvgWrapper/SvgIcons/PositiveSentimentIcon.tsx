import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const PositiveSentimentIcon = ({ width = 16, height = 16 }: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="8.00016" cy="7.99992" r="4.66667" fill="#1DBD82" />
                <circle cx="8" cy="8" r="7" stroke="#1DBD82" strokeWidth="2" />
            </svg>
        </>
    )
}

export default PositiveSentimentIcon
