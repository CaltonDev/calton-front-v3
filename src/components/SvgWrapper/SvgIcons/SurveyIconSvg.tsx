import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const SurveyIconSvg = ({ width = 40, height = 40 }: SvgProps) => {
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
                    d="M15 8.33334H11.6666C10.7826 8.33334 9.93474 8.68453 9.30962 9.30965C8.6845 9.93478 8.33331 10.7826 8.33331 11.6667V31.6667C8.33331 32.5507 8.6845 33.3986 9.30962 34.0237C9.93474 34.6488 10.7826 35 11.6666 35H28.3333C29.2174 35 30.0652 34.6488 30.6903 34.0237C31.3155 33.3986 31.6666 32.5507 31.6666 31.6667V11.6667C31.6666 10.7826 31.3155 9.93478 30.6903 9.30965C30.0652 8.68453 29.2174 8.33334 28.3333 8.33334H25"
                    stroke="#B57DFA"
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21.6666 5.00003H18.3333C16.4923 5.00003 14.9999 6.49241 14.9999 8.33336C14.9999 10.1743 16.4923 11.6667 18.3333 11.6667H21.6666C23.5076 11.6667 24.9999 10.1743 24.9999 8.33336C24.9999 6.49241 23.5076 5.00003 21.6666 5.00003Z"
                    stroke="#B57DFA"
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14.9999 23.3333L18.3333 26.6666L24.9999 20"
                    stroke="#B57DFA"
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default SurveyIconSvg
