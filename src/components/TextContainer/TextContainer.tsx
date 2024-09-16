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
    isRating,
    rightSideIcon = false,
    customIconWidth,
    customIconHeight,
    customTextColor,
    iconColor,
    textSize,
    iconCallback,
}: TextContainerProps) {
    return (
        <div
            className={
                rightSideIcon ? styles.containerReverse : styles.container
            }
            style={{ background: color }}
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
            {isRating && (
                <ReactStars
                    count={5}
                    value={isRating}
                    size={16}
                    color2={'#ffd700'}
                    color1={'#FFFFFF'}
                    half={false}
                    edit={false}
                />
            )}
        </div>
    )
}

export default TextContainer
