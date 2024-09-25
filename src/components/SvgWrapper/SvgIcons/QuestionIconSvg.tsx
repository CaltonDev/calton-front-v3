import React from 'react'
import { SvgProps } from '../SvgWrapper.interface'

const QuestionIconSvg = ({ width = 40, height = 40 }: SvgProps) => {
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
                    d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7158 28.2843 5.00003 20 5.00003C11.7158 5.00003 5.00003 11.7158 5.00003 20C5.00003 28.2843 11.7158 35 20 35Z"
                    stroke="#B57DFA"
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M20 28.3334V28.35"
                    stroke="#B57DFA"
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M20 22.5C19.9693 21.959 20.1153 21.4226 20.4159 20.9717C20.7165 20.5208 21.1554 20.1798 21.6667 20C22.2931 19.7604 22.8554 19.3787 23.3093 18.8849C23.7631 18.3911 24.0962 17.7987 24.2822 17.1543C24.4682 16.5099 24.5021 15.8312 24.3812 15.1715C24.2603 14.5117 23.9879 13.8891 23.5855 13.3525C23.1831 12.816 22.6616 12.3802 22.0621 12.0794C21.4627 11.7786 20.8016 11.6211 20.1309 11.6192C19.4602 11.6174 18.7982 11.7712 18.1971 12.0687C17.5959 12.3661 17.072 12.799 16.6667 13.3333"
                    stroke="#B57DFA"
                    strokeWidth="3.53333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    )
}

export default QuestionIconSvg
