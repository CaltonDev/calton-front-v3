import React from 'react'
import { SvgWrapperProps } from './SvgWrapper.interface'
import ArrowBackSvg from './SvgIcons/ArrowBackSvg'
import styles from './SvgWrapper.module.scss'
import ArrowForwardSvg from './SvgIcons/ArrowForwardSvg'
import {
    disabledColor,
    iconSmallLarge,
    iconSmallMedium,
    iconSmallSize,
    primaryColor,
    secondaryColor,
} from '../../constants/constants'

const SvgWrapper = ({
    keySvg,
    size = 'small',
    color = 'primary',
    isClickable = false,
}: SvgWrapperProps) => {
    const iconSize =
        size === 'small'
            ? iconSmallSize
            : size === 'medium'
              ? iconSmallMedium
              : iconSmallLarge
    const iconColor =
        color === 'primary'
            ? primaryColor
            : color === 'secondary'
              ? secondaryColor
              : disabledColor
    return (
        <span
            style={{ width: iconSize, height: iconSize }}
            className={isClickable ? styles.clickable : ''}
        >
            {keySvg === 'arrowBack' ? (
                <ArrowBackSvg
                    width={iconSize}
                    height={iconSize}
                    fillColor={iconColor}
                />
            ) : keySvg === 'arrowForward' ? (
                <ArrowForwardSvg
                    width={iconSize}
                    height={iconSize}
                    fillColor={iconColor}
                />
            ) : (
                <></>
            )}
        </span>
    )
}

export default SvgWrapper
