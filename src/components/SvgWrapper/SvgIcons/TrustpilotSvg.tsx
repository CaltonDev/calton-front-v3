import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const TrustpilotSvg = ({ width = 20, height = 20 }: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                    fill="#000032"
                />
                <path
                    d="M18.0371 8.34439H11.8989L10.0029 2.5L8.10108 8.34439L1.96289 8.33857L6.93393 11.9542L5.03189 17.7927L10.0029 14.183L14.9679 17.7927L13.0719 11.9542L18.0371 8.34439Z"
                    fill="#00B67A"
                />
                <path
                    d="M13.4986 13.276L13.0719 11.9542L10.0029 14.183L13.4986 13.276Z"
                    fill="#005128"
                />
            </svg>
        </>
    )
}

export default TrustpilotSvg
