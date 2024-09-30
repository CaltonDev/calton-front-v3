import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const PeopleSvg = ({
    width = 20,
    height = 20,
    fillColor = '#81788A',
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
                    d="M7.50002 9.16667C9.34097 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34097 2.5 7.50002 2.5C5.65907 2.5 4.16669 3.99238 4.16669 5.83333C4.16669 7.67428 5.65907 9.16667 7.50002 9.16667Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M2.5 17.5V15.8333C2.5 14.9493 2.85119 14.1014 3.47631 13.4763C4.10143 12.8512 4.94928 12.5 5.83333 12.5H9.16667C10.0507 12.5 10.8986 12.8512 11.5237 13.4763C12.1488 14.1014 12.5 14.9493 12.5 15.8333V17.5"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M13.3333 2.60833C14.0503 2.79192 14.6858 3.20892 15.1397 3.79359C15.5935 4.37827 15.8398 5.09736 15.8398 5.8375C15.8398 6.57764 15.5935 7.29673 15.1397 7.88141C14.6858 8.46608 14.0503 8.88308 13.3333 9.06667"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M17.5 17.5V15.8333C17.4958 15.0976 17.2483 14.384 16.7961 13.8037C16.3439 13.2233 15.7124 12.8089 15 12.625"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default PeopleSvg
