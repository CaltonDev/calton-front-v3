import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const PuntiVenditaSvg = ({
    width = 40,
    height = 40,
    fillColor = '#63D2FF',
}: SvgProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 40 40"
                fill="none"
            >
                <path
                    d="M5 35H35"
                    stroke={fillColor}
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 11.6667V13.3334C5 14.6594 5.52678 15.9312 6.46447 16.8689C7.40215 17.8066 8.67392 18.3334 10 18.3334C11.3261 18.3334 12.5979 17.8066 13.5355 16.8689C14.4732 15.9312 15 12.9928 15 11.6667M5 11.6667H15M5 11.6667H35M5 11.6667L8.33333 5.00003H31.6667L35 11.6667M15 11.6667C15 12.9928 15.4705 15.9312 16.4082 16.8689C17.3459 17.8066 18.6739 18.3334 20 18.3334C21.3261 18.3334 22.5979 17.8066 23.5355 16.8689C24.4732 15.9312 25 14.6594 25 13.3334M15 11.6667H25V13.3334M25 13.3334C25 14.6594 25.5268 15.9312 26.4645 16.8689C27.4021 17.8066 28.6739 18.3334 30 18.3334C31.3261 18.3334 32.5979 17.8066 33.5355 16.8689C34.4732 15.9312 35 14.6594 35 13.3334V11.6667"
                    stroke={fillColor}
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.3335 35V18.0833"
                    stroke={fillColor}
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M31.6667 35V18.0833"
                    stroke={fillColor}
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M15 35V28.3333C15 27.4493 15.3512 26.6014 15.9763 25.9763C16.6014 25.3512 17.4493 25 18.3333 25H21.6667C22.5507 25 23.3986 25.3512 24.0237 25.9763C24.6488 26.6014 25 27.4493 25 28.3333V35"
                    stroke={fillColor}
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default PuntiVenditaSvg
