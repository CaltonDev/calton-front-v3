import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const MessageSvg = ({
    width = 18,
    height = 18,
    fillColor = '#3F49FC',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8.00008 13.3334L6.00008 11.3334H4.66675C4.13631 11.3334 3.62761 11.1227 3.25253 10.7476C2.87746 10.3725 2.66675 9.86381 2.66675 9.33337V5.33337C2.66675 4.80294 2.87746 4.29423 3.25253 3.91916C3.62761 3.54409 4.13631 3.33337 4.66675 3.33337H11.3334C11.8638 3.33337 12.3726 3.54409 12.7476 3.91916C13.1227 4.29423 13.3334 4.80294 13.3334 5.33337V9.33337C13.3334 9.86381 13.1227 10.3725 12.7476 10.7476C12.3726 11.1227 11.8638 11.3334 11.3334 11.3334H10.0001L8.00008 13.3334Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5.33325 6H10.6666"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5.33325 8.66663H9.33325"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default MessageSvg
