import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const ReplySvg = ({
    width = 16,
    height = 16,
    fillColor = '#1DBD82',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M2.66663 14V5.33337C2.66663 4.80294 2.87734 4.29423 3.25241 3.91916C3.62749 3.54409 4.13619 3.33337 4.66663 3.33337H11.3333C11.8637 3.33337 12.3724 3.54409 12.7475 3.91916C13.1226 4.29423 13.3333 4.80294 13.3333 5.33337V9.33337C13.3333 9.86381 13.1226 10.3725 12.7475 10.7476C12.3724 11.1227 11.8637 11.3334 11.3333 11.3334H5.33329L2.66663 14Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6 7.33333L7.33333 8.66667L10 6"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default ReplySvg
