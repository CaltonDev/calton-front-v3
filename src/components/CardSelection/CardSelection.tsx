import React from 'react'
import { CardSelectionProps } from './CardSelection.interface'
import styles from './CardSelection.module.scss'
import Typography from '../Typography/Typography'
import TextContainer from '../TextContainer/TextContainer'
import { useTranslation } from 'react-i18next'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import { useNavigate } from 'react-router-dom'
const CardSelection = ({
    title,
    data,
    setSelectedCard,
    activeCard,
}: CardSelectionProps) => {
    const history = useNavigate()
    const handleCardSelection = (idx: number) => {
        if (idx === -1) history('/surveys/new')
        if (setSelectedCard) setSelectedCard(idx)
    }

    return (
        <div className={styles.container}>
            <div
                className={
                    activeCard === -1
                        ? styles.addNewCardSelected
                        : styles.addNewCard
                }
                onClick={() => handleCardSelection(-1)}
            >
                <Typography size={'bodyBig'} weight={'bold'} color={'blue'}>
                    {title}
                </Typography>
                <SvgWrapper keySvg={'plusIcon'} color={'secondary'} />
            </div>
            {data?.map((obj: any, idx: number) => (
                <div
                    key={idx}
                    className={
                        activeCard === -1
                            ? styles.cardDisabled
                            : activeCard === idx
                              ? styles.cardSelected
                              : styles.card
                    }
                    onClick={() => handleCardSelection(idx)}
                >
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
