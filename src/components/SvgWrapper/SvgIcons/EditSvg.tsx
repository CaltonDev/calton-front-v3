import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const EditSvg = ({
    width = 24,
    height = 24,
    fillColor = '#321D48',
}: SvgProps) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M9 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V15"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9 15H12L20.5 6.49998C20.8978 6.10216 21.1213 5.56259 21.1213 4.99998C21.1213 4.43737 20.8978 3.89781 20.5 3.49998C20.1022 3.10216 19.5626 2.87866 19 2.87866C18.4374 2.87866 17.8978 3.10216 17.5 3.49998L9 12V15Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M16 5L19 8"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default EditSvg
