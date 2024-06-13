import React from 'react'
import { SvgWrapperProps } from './SvgWrapper.interface'
import ArrowBackSvg from './SvgIcons/ArrowBackSvg'
import styles from './SvgWrapper.module.scss'
import ArrowForwardSvg from './SvgIcons/ArrowForwardSvg'

const SvgWrapper = ({
    keySvg,
    width,
    height,
    fillColor,
    isClickable = false,
}: SvgWrapperProps) => {
    return (
        <span className={isClickable ? styles.clickable : ''}>
            {keySvg === 'arrowBack' ? (
                <ArrowBackSvg
                    width={width}
                    height={height}
                    fillColor={fillColor}
                />
            ) : keySvg === 'arrowForward' ? (
                <ArrowForwardSvg
                    width={width}
                    height={height}
                    fillColor={fillColor}
                />
            ) : (
                <></>
            )}
        </span>
    )
}

export default SvgWrapper
