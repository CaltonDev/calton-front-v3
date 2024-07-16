import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const ChatIconSvg = ({
    width = 30,
    height = 30,
    fillColor = '#F1F1F1',
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
                    d="M26.25 17.5L22.5 13.75H13.75C13.4185 13.75 13.1005 13.6183 12.8661 13.3839C12.6317 13.1495 12.5 12.8315 12.5 12.5V5C12.5 4.66848 12.6317 4.35054 12.8661 4.11612C13.1005 3.8817 13.4185 3.75 13.75 3.75H25C25.3315 3.75 25.6495 3.8817 25.8839 4.11612C26.1183 4.35054 26.25 4.66848 26.25 5V17.5Z"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M17.5 18.75V21.25C17.5 21.5815 17.3683 21.8995 17.1339 22.1339C16.8995 22.3683 16.5815 22.5 16.25 22.5H7.5L3.75 26.25V13.75C3.75 13.4185 3.8817 13.1005 4.11612 12.8661C4.35054 12.6317 4.66848 12.5 5 12.5H7.5"
                    stroke={fillColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default ChatIconSvg
