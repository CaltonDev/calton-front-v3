import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const UploadSvg = ({
    width = 20,
    height = 20,
    fillColor = '#3F49FC',
}: SvgProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 20 20"
                fill="none"
            >
                <path
                    d="M3.3335 14.167V15.8337C3.3335 16.2757 3.50909 16.6996 3.82165 17.0122C4.13421 17.3247 4.55814 17.5003 5.00016 17.5003H15.0002C15.4422 17.5003 15.8661 17.3247 16.1787 17.0122C16.4912 16.6996 16.6668 16.2757 16.6668 15.8337V14.167"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5.8335 7.49967L10.0002 3.33301L14.1668 7.49967"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M10 3.33301V13.333"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default UploadSvg
