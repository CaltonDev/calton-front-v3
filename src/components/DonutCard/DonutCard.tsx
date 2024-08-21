import React, { useState } from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import styles from './DonutCard.module.scss'
import Typography from '../Typography/Typography'
import Input from '../Input/Input'
import { useTranslation } from 'react-i18next'
import { DonutCardProps } from './DonutCard.interface'
import Tag from '../Tag/Tag'
import { Pie } from '@ant-design/plots'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { PieConfig } from '@ant-design/plots/lib'

function DonutCard({
    numberOfReviews,
    positive,
    neutral,
    negative,
}: DonutCardProps) {
    const { t } = useTranslation()
    const showNumbers = useSelector(
        (state: RootState) => state.Settings.showNumbers
    )

    const config: PieConfig = {
        data: [
            { type: '分类一', value: 27 },
            { type: '分类二', value: 25 },
            { type: '分类三', value: 18 },
        ],
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.5,
        appendPadding: 10,
        legend: false,
        statistic: {
            title: false,
            content: false,
        },
        label: showNumbers
            ? {
                  type: 'outer',
                  content: '{value}',
                  style: {
                      fontSize: 12, // Font size of the labels
                      fontWeight: 'bold',
                      fill: '#464D69',
                  },
              }
            : undefined,
        animation: undefined,
        interactions: [
            {
                type: 'element-active',
            },
        ],
    }
    return (
        <div className={styles.container}>
            <div className={styles.dognutContainer}>
                <Pie {...config} />
            </div>
            <div className={styles.rightItemContainer}>
                <div className={styles.header}>
                    <Typography size={'h6'} weight={'light'}>
                        {t('Le mie recensioni')}
                    </Typography>
                    <Typography size={'h6'} weight={'bold'}>
                        {numberOfReviews.toString()}
                    </Typography>{' '}
                </div>
                <div className={styles.tagContainer}>
                    <Tag
                        label={t('Positivi') + ' ' + 45 + '%'}
                        type={'positive'}
                    />
                    <Tag
                        label={t('Neutri') + ' ' + 45 + '%'}
                        type={'neutral'}
                    />
                    <Tag
                        label={t('Negativi') + ' ' + 45 + '%'}
                        type={'negative'}
                    />
                </div>
            </div>
        </div>
    )
}

export default DonutCard
