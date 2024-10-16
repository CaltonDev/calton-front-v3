import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const FacebookSvg = ({ width = 20, height = 20 }: SvgProps) => {
    return (
        <>
            <svg
                width={width}
                height={height}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_501_2917)">
                    <path
                        d="M20 10C20 4.47656 15.5234 0 10 0C4.47656 0 0 4.47656 0 10C0 14.9922 3.65625 19.1289 8.4375 19.8789V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29102 9.92969 3.90625 12.2148 3.90625C13.3086 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1914C11.9492 6.5625 11.5625 7.33398 11.5625 8.125V10H14.3359L13.8926 12.8906H11.5625V19.8789C16.3438 19.1289 20 14.9922 20 10Z"
                        fill="#1877F2"
                    />
                    <path
                        d="M13.8926 12.8906L14.3359 10H11.5625V8.125C11.5625 7.33398 11.9492 6.5625 13.1914 6.5625H14.4531V4.10156C14.4531 4.10156 13.3086 3.90625 12.2148 3.90625C9.92969 3.90625 8.4375 5.29102 8.4375 7.79688V10H5.89844V12.8906H8.4375V19.8789C8.94727 19.959 9.46875 20 10 20C10.5312 20 11.0527 19.959 11.5625 19.8789V12.8906H13.8926Z"
                        fill="white"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_501_2917">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </>
    )
}

export default FacebookSvg
