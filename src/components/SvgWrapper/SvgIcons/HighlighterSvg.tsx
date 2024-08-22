import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const HighlighterSvg = ({
    width = 40,
    height = 40,
    fillColor = '#7161EF',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 35L35 10L30 5L5 30L10 35Z"
                    stroke={fillColor}
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M25 10L30 15"
                    stroke={fillColor}
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M15 5C15 5.88405 15.3511 6.7319 15.9763 7.35702C16.6014 7.98214 17.4492 8.33333 18.3333 8.33333C17.4492 8.33333 16.6014 8.68452 15.9763 9.30964C15.3511 9.93477 15 10.7826 15 11.6667C15 10.7826 14.6488 9.93477 14.0236 9.30964C13.3985 8.68452 12.5507 8.33333 11.6666 8.33333C12.5507 8.33333 13.3985 7.98214 14.0236 7.35702C14.6488 6.7319 15 5.88405 15 5Z"
                    stroke={fillColor}
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M31.6666 21.6666C31.6666 22.5507 32.0178 23.3985 32.643 24.0236C33.2681 24.6488 34.1159 25 35 25C34.1159 25 33.2681 25.3511 32.643 25.9763C32.0178 26.6014 31.6666 27.4492 31.6666 28.3333C31.6666 27.4492 31.3155 26.6014 30.6903 25.9763C30.0652 25.3511 29.2174 25 28.3333 25C29.2174 25 30.0652 24.6488 30.6903 24.0236C31.3155 23.3985 31.6666 22.5507 31.6666 21.6666Z"
                    stroke={fillColor}
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default HighlighterSvg
