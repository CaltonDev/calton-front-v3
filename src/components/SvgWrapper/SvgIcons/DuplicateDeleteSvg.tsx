import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const DuplicateDeleteSvg = ({
    width = 20,
    height = 20,
    fillColor = '#FF608B',
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
                    d="M7.50004 3.33338H10L11.6667 5.00005H15.8334C16.2754 5.00005 16.6993 5.17564 17.0119 5.4882C17.3244 5.80076 17.5 6.22469 17.5 6.66672V12.5C17.5 12.9421 17.3244 13.366 17.0119 13.6786C16.6993 13.9911 16.2754 14.1667 15.8334 14.1667H7.50004C7.05801 14.1667 6.63409 13.9911 6.32153 13.6786C6.00897 13.366 5.83337 12.9421 5.83337 12.5V5.00005C5.83337 4.55802 6.00897 4.1341 6.32153 3.82154C6.63409 3.50898 7.05801 3.33338 7.50004 3.33338Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14.1667 14.1667V15.8334C14.1667 16.2754 13.9911 16.6993 13.6785 17.0119C13.366 17.3244 12.942 17.5 12.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0119C2.67559 16.6993 2.5 16.2754 2.5 15.8334V8.33338C2.5 7.89135 2.67559 7.46743 2.98816 7.15487C3.30072 6.8423 3.72464 6.66671 4.16667 6.66671H5.83333"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default DuplicateDeleteSvg
