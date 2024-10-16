import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const StarFilledSvg = ({
    width = 24,
    height = 24,
    fillColor = '#FCC207',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 17.75L5.828 20.995L7.007 14.122L2.007 9.25495L8.907 8.25495L11.993 2.00195L15.079 8.25495L21.979 9.25495L16.979 14.122L18.158 20.995L12 17.75Z"
                    fill={fillColor}
                />
            </svg>
        </>
    )
}

export default StarFilledSvg
