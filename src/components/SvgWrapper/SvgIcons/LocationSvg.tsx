import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const LocationSvg = ({
    width = 31,
    height = 31,
    fillColor = 'white',
    svgBackgroundColor,
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={
                    svgBackgroundColor
                        ? { background: svgBackgroundColor, borderRadius: 10 }
                        : {}
                }
            >
                <path
                    d="M15.5 18C17.5711 18 19.25 16.3211 19.25 14.25C19.25 12.1789 17.5711 10.5 15.5 10.5C13.4289 10.5 11.75 12.1789 11.75 14.25C11.75 16.3211 13.4289 18 15.5 18Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M22.5713 21.3209L17.2675 26.6246C16.7987 27.0929 16.1632 27.356 15.5006 27.356C14.838 27.356 14.2025 27.0929 13.7338 26.6246L8.42875 21.3209C7.03028 19.9223 6.07792 18.1405 5.69211 16.2007C5.3063 14.2609 5.50437 12.2503 6.26126 10.423C7.01815 8.59582 8.29988 7.03406 9.94436 5.93527C11.5888 4.83648 13.5222 4.25 15.5 4.25C17.4778 4.25 19.4112 4.83648 21.0557 5.93527C22.7001 7.03406 23.9819 8.59582 24.7387 10.423C25.4956 12.2503 25.6937 14.2609 25.3079 16.2007C24.9221 18.1405 23.9697 19.9223 22.5713 21.3209V21.3209Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default LocationSvg
