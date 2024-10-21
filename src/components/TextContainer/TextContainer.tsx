import React from 'react'
import styles from './TextContainer.module.scss'
import { TextContainerProps } from './TextContainer.interface'
import Typography from '../Typography/Typography'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import ReactStars from 'react-stars'
function TextContainer({
    label = '',
    color = '#0C14A1',
    iconSvg,
    textColor = 'white',
    isRating = -1,
    rightSideIcon = false,
    customIconWidth,
    customIconHeight,
    customTextColor,
    iconColor,
    textSize,
    iconCallback,
    isRatingEditable,
    isChip,
}: TextContainerProps) {
    return (
        <div
            className={
                isChip
                    ? styles.containerChip
                    : rightSideIcon
                      ? styles.containerReverse
                      : styles.container
            }
            style={{ background: color, padding: color === 'white' ? 0 : '' }}
        >
            {iconSvg && (
                <SvgWrapper
                    keySvg={iconSvg ? iconSvg : ''}
                    size={'small'}
                    customWidth={customIconWidth}
                    customHeight={customIconHeight}
                    customColor={iconColor}
                    onClick={iconCallback && iconCallback}
                />
            )}
            {label !== '' && (
                <Typography
                    size={textSize ? textSize : 'bodySmall'}
                    weight={'normal'}
                    color={textColor}
                    customTextColor={customTextColor}
                >
                    {label}
                </Typography>
            )}
            {isRating > -1 && (
                <ReactStars
                    count={5}
                    value={isRating}
                    size={18}
                    color2={'#ffd700'}
                    color1={customTextColor ? customTextColor : '#FFFFFF'}
                    half={false}
                    edit={isRatingEditable ? isRatingEditable : false}
                />
            )}
        </div>
    )
}

export default TextContainer
