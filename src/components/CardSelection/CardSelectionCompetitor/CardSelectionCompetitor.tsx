import React, { useState } from 'react'
import { CardSelectionCompetitorProps } from './CardSelectionCompetitor.interface'
import styles from './CardSelectionCompetitor.module.scss'
import Typography from '../../Typography/Typography'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import { useTranslation } from 'react-i18next'
import TextContainer from '../../TextContainer/TextContainer'
import Input from '../../Input/Input'
const CardSelectionCompetitor = ({
    title,
    data,
    setSelectedCard,
    activeCard,
}: CardSelectionCompetitorProps) => {
    const { t } = useTranslation()
    const [newGroupTitle, setNewGroupTitle] = useState('')
    const handleCardSelection = (idx: number) => {
        if (setSelectedCard) {
            if (idx === activeCard) {
                setSelectedCard(-2)
            } else {
                setSelectedCard(idx)
            }
        }
    }

    const handleCreateNewCompetitorGroup = () => {}

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
                {activeCard !== -1 ? (
                    <>
                        <Typography
                            size={'bodyBig'}
                            weight={'bold'}
                            color={'blue'}
                        >
                            {title}
                        </Typography>
                        <SvgWrapper keySvg={'plusIcon'} color={'secondary'} />
                    </>
                ) : (
                    <>
                        <div className={styles.competitorContainerText}>
                            <div className={styles.dot} />
                            <div style={{ width: '100%' }}>
                                <Input
                                    fullWidth={true}
                                    placeholder={t('Inserisci nome gruppo')}
                                    value={newGroupTitle}
                                    onChange={(e) =>
                                        setNewGroupTitle(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <SvgWrapper
                            size={'medium'}
                            keySvg={'outlinedCheckmarkSvg'}
                            color={'secondary'}
                            onClick={handleCreateNewCompetitorGroup}
                        />
                    </>
                )}
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
                    <div
                        className={
                            activeCard === -1
                                ? styles.cardHeaderDisabled
                                : styles.cardHeader
                        }
                    >
                        <div className={styles.dot} />
                        <div className={styles.titleContainer}>
                            <Typography size={'h5'} weight={'bold'}>
                                {obj?.title}
                            </Typography>
                            <Typography size={'h5'} weight={'normal'}>
                                {'- ' + obj?.value?.length + ' ' + t('Fonti')}
                            </Typography>
                        </div>
                        {idx === activeCard ? (
                            <SvgWrapper
                                keySvg={'arrowForward'}
                                color={'black'}
                                size={'large'}
                            />
                        ) : (
                            <SvgWrapper
                                keySvg={'arrowDownSvg'}
                                color={'black'}
                                size={'large'}
                            />
                        )}
                    </div>
                    {activeCard === idx && (
                        <div className={styles.subCardContainer}>
                            {obj?.value?.map(
                                (competitor: any, compIdx: number) => (
                                    <div
                                        key={compIdx}
                                        className={styles.competitorContainer}
                                    >
                                        <div
                                            className={
                                                styles.competitorContainerText
                                            }
                                        >
                                            <Typography
                                                size={'bodySmall'}
                                                weight={'bold'}
                                                color={'black'}
                                            >
                                                {competitor?.name}
                                            </Typography>
                                            <TextContainer
                                                key={compIdx}
                                                label={competitor?.address}
                                                textColor={'black'}
                                                color={'#E0DDE3'}
                                                rightSideIcon={true}
                                                textSize={'bodySmall'}
                                            />
                                        </div>
                                        <SvgWrapper
                                            keySvg={'close.svg'}
                                            color={'black'}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CardSelectionCompetitor
