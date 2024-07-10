import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const ProfileSvg = ({
    width = 30,
    height = 30,
    fillColor = '#321D48',
}: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 13.75C17.7614 13.75 20 11.5114 20 8.75C20 5.98858 17.7614 3.75 15 3.75C12.2386 3.75 10 5.98858 10 8.75C10 11.5114 12.2386 13.75 15 13.75Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7.5 26.25V23.75C7.5 22.4239 8.02678 21.1521 8.96447 20.2145C9.90215 19.2768 11.1739 18.75 12.5 18.75H17.5C18.8261 18.75 20.0979 19.2768 21.0355 20.2145C21.9732 21.1521 22.5 22.4239 22.5 23.75V26.25"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default ProfileSvg
