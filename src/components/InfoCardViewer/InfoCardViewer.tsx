import styles from './InfoCardViewer.module.scss'

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { InfoCardViewerProps } from './InfoCardViewer.interface'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import Typography from '../Typography/Typography'
import Button from '../Button/Button'

function InfoCardViewer({ data }: InfoCardViewerProps) {
    const { t } = useTranslation()
    const [suggestionIndex, setSuggestionIndex] = useState(0)
    return (
        <div className={styles.container}>
            <SvgWrapper
                keySvg={'highlighter.svg'}
                hasContainerProps={{
                    hasContainer: true,
                    containerSize: 60,
                    outlined: false,
                    background: '#E1DDFF',
                }}
                customWidth={60}
                customHeight={60}
            />
            <div className={styles.contentContainer}>
                <div className={styles.header}>
                    <div className={styles.infoSelectorContainer}>
                        {Array.from(Array(data.length).keys())?.map((index) => {
                            return (
                                <div
                                    key={index}
                                    className={
                                        index === suggestionIndex
                                            ? styles.lineSelected
                                            : styles.line
                                    }
                                    onClick={() => setSuggestionIndex(index)}
                                ></div>
                            )
                        })}
                    </div>
                    <SvgWrapper keySvg={'burgerIconDot.svg'} />
                </div>
                <div className={styles.textContainer}>
                    <Typography size={'bodySmall'} weight={'bold'}>
                        {data[suggestionIndex].title}
                    </Typography>
                    <Typography size={'bodySmall'} weight={'light'}>
                        {data[suggestionIndex].body}
                    </Typography>
                </div>
                <div className={styles.footer}>
                    <div className={styles.footerText}>
                        {' '}
                        <Typography
                            size={'bodyXSmall'}
                            weight={'light'}
                            color={'grey'}
                        >
                            {t(
                                'Informazioni generate da Calton AI'
                            ).toUpperCase()}
                        </Typography>
                    </div>
                    <Button size={'small'}>{t('Per saperne di più')}</Button>
                </div>
            </div>
        </div>
    )
}

export default InfoCardViewer
