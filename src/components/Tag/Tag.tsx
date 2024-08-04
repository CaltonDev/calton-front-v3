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
function Tag({ percentage, type }: TagProps) {
    const { t } = useTranslation()

    const label =
        (type === 'positive'
            ? t('Positivi')
            : type === 'neutral'
              ? t('Neutri')
              : t('Negativi')) +
        ' ' +
        percentage +
        '%'

    const colorClass = styles[`${type}`]
    return (
        <div className={`${colorClass} ${styles.container}`}>
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
