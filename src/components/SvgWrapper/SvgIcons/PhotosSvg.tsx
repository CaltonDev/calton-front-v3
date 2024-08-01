import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const PhotosSvg = ({
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
                <g clipPath="url(#clip0_796_6967)">
                    <path
                        d="M6.75 9.25H8C8.66304 9.25 9.29893 8.98661 9.76777 8.51777C10.2366 8.04893 10.5 7.41304 10.5 6.75C10.5 6.41848 10.6317 6.10054 10.8661 5.86612C11.1005 5.6317 11.4185 5.5 11.75 5.5H19.25C19.5815 5.5 19.8995 5.6317 20.1339 5.86612C20.3683 6.10054 20.5 6.41848 20.5 6.75C20.5 7.41304 20.7634 8.04893 21.2322 8.51777C21.7011 8.98661 22.337 9.25 23 9.25H24.25C24.913 9.25 25.5489 9.51339 26.0178 9.98223C26.4866 10.4511 26.75 11.087 26.75 11.75V23C26.75 23.663 26.4866 24.2989 26.0178 24.7678C25.5489 25.2366 24.913 25.5 24.25 25.5H6.75C6.08696 25.5 5.45107 25.2366 4.98223 24.7678C4.51339 24.2989 4.25 23.663 4.25 23V11.75C4.25 11.087 4.51339 10.4511 4.98223 9.98223C5.45107 9.51339 6.08696 9.25 6.75 9.25"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15.5 20.5C17.5711 20.5 19.25 18.8211 19.25 16.75C19.25 14.6789 17.5711 13 15.5 13C13.4289 13 11.75 14.6789 11.75 16.75C11.75 18.8211 13.4289 20.5 15.5 20.5Z"
                        stroke={fillColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_796_6967">
                        <rect
                            width="30"
                            height="30"
                            fill="white"
                            transform="translate(0.5 0.5)"
                        />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default PhotosSvg
