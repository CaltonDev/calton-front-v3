import React from 'react'
import styles from './Tag.module.scss'
import { useTranslation } from 'react-i18next'
import { TagProps } from './Tag.interface'
import Typography from '../Typography/Typography'
import {
    negativeColor,
    neutralColor,
    positiveColor,
} from '../../constants/constants'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
function Tag({ label, type, iconSvg }: TagProps) {
    const { t } = useTranslation()
    const colorClass = styles[`${type}`]
    return (
        <div className={`${colorClass} ${styles.container}`}>
            {iconSvg && (
                <SvgWrapper
                    keySvg={iconSvg ? iconSvg : ''}
                    size={'small'}
                    customColor={
                        type === 'positive'
                            ? positiveColor
                            : type === 'neutral'
                              ? neutralColor
                              : negativeColor
                    }
                />
            )}
            <Typography
                size={'bodySmall'}
                weight={'normal'}
                customTextColor={
                    type === 'positive'
                        ? positiveColor
                        : type === 'neutral'
                          ? neutralColor
                          : negativeColor
                }
            >
                {label}
            </Typography>
        </div>
    )
}

export default Tag
