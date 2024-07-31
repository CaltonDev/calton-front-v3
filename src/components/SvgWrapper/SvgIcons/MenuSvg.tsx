import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const MenuSvg = ({
    width = 31,
    height = 31,
    fillColor = 'white',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M11.75 5.5V28M8 5.5H21.75C22.413 5.5 23.0489 5.76339 23.5178 6.23223C23.9866 6.70107 24.25 7.33696 24.25 8V23C24.25 23.663 23.9866 24.2989 23.5178 24.7678C23.0489 25.2366 22.413 25.5 21.75 25.5H8C7.66848 25.5 7.35054 25.3683 7.11612 25.1339C6.8817 24.8995 6.75 24.5815 6.75 24.25V6.75C6.75 6.41848 6.8817 6.10054 7.11612 5.86612C7.35054 5.6317 7.66848 5.5 8 5.5V5.5Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16.75 10.5H19.25"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16.75 15.5H19.25"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default MenuSvg
