import React from 'react'
import { CardSelectionProps } from './CardSelection.interface'
import styles from './CardSelection.module.scss'
import Typography from '../Typography/Typography'
import TextContainer from '../TextContainer/TextContainer'
import { useTranslation } from 'react-i18next'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
const CardSelection = ({ data, type }: CardSelectionProps) => {
    const { t } = useTranslation()
    return (
        <div className={styles.container}>
            <div className={styles.addNewCard}>
                <Typography size={'bodyBig'} weight={'bold'} color={'blue'}>
                    {t('Crea nuovo report')}
                </Typography>
                <SvgWrapper keySvg={'plusIcon'} color={'secondary'} />
            </div>
            {data?.map((obj: any, idx: number) => (
                <div key={idx} className={styles.card}>
                    <Typography size={'bodySmall'} weight={'bold'}>
                        {obj?.title}
                    </Typography>
                    {obj?.value?.map((value: string, textIdx: number) => (
                        <TextContainer
                            key={textIdx}
                            label={value}
                            textColor={'black'}
                            color={'#F1F1F1'}
                            rightSideIcon={true}
                            textSize={'bodySmall'}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default CardSelection
