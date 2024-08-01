import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const PostSvg = ({
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
                    d="M23 5.5H8C6.61929 5.5 5.5 6.61929 5.5 8V23C5.5 24.3807 6.61929 25.5 8 25.5H23C24.3807 25.5 25.5 24.3807 25.5 23V8C25.5 6.61929 24.3807 5.5 23 5.5Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5.5 20.5H25.5"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5.5 15.5L9.25 11.75C10.41 10.6337 11.84 10.6337 13 11.75L18 16.75"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16.75 15.5L19.25 13C20.41 11.8837 21.84 11.8837 23 13L25.5 15.5"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M18 9.25H18.0125"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default PostSvg
