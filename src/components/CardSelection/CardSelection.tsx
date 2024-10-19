import React, { forwardRef } from 'react'
import { CardSelectionProps } from './CardSelection.interface'
import styles from './CardSelection.module.scss'
import Typography from '../Typography/Typography'
import TextContainer from '../TextContainer/TextContainer'
import { useTranslation } from 'react-i18next'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'

const CardSelection = ({
    title,
    data,
    setSelectedCard,
    activeCard,
    addNewCard = true,
    wrappedComponent = <></>,
    hasWrappedComponent = false,
    wrappedKey,
    isDeleteButton = false,
    handleDelete,
}: CardSelectionProps) => {
    const history = useNavigate()
    const handleCardSelection = (idx: number) => {
        if (idx === -1) history('/surveys/new')
        if (setSelectedCard) setSelectedCard(idx)
    }
    return (
        <div
            // className={
            //     hasWrappedComponent
            //         ? styles.container
            //         : styles.containerWrappedComponent
            // }
            className={styles.container}
        >
            {addNewCard && (
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
            )}
            {data?.map((obj: any, idx: number) => (
                <div
                    key={idx}
                    className={
                        activeCard === -1
                            ? styles.cardDisabled
                            : activeCard === idx && hasWrappedComponent
                              ? styles.cardSelected
                              : activeCard === idx && !hasWrappedComponent
                                ? styles.cardSelectedWrapped
                                : hasWrappedComponent
                                  ? styles.card
                                  : styles.cardWrapped
                    }
                    onClick={() => handleCardSelection(idx)}
                >
                    {/* <div> */}
                    <div
                        className={
                            hasWrappedComponent
                                ? styles.cardTitleContainer
                                : activeCard === idx
                                  ? styles.cardTitleContainerWrappedSelected
                                  : styles.cardTitleContainerWrapped
                        }
                    >
                        {hasWrappedComponent ? (
                            <Typography size={'h5'} weight={'bold'}>
                                {obj?.title}
                            </Typography>
                        ) : (
                            <Typography
                                size={'bodySmall'}
                                weight={'normal'}
                                color={activeCard === idx ? 'white' : 'blue'}
                            >
                                {obj?.title}
                            </Typography>
                        )}
                        {hasWrappedComponent && (
                            <SvgWrapper
                                keySvg={'arrowForward'}
                                color={'primaryIcon'}
                                customHeight={24}
                                customWidth={24}
                            />
                        )}
                        {isDeleteButton &&
                            handleDelete &&
                            !hasWrappedComponent && (
                                <Button
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        handleDelete(idx)
                                    }}
                                    variant={
                                        activeCard === idx ? 'solid' : 'ghost'
                                    }
                                    size={'small'}
                                    iconColor={
                                        activeCard === idx
                                            ? 'white'
                                            : 'secondary'
                                    }
                                    arrowPlacement={'right'}
                                    icon={'xIcon'}
                                />
                            )}
                    </div>

                    <Typography size={'bodySmall'} weight={'light'}>
                        {obj?.description}
                    </Typography>

                    {/* <div className={styles.containerWrappedCard}> */}
                    {hasWrappedComponent && obj?.title === wrappedKey && (
                        <div className={styles.wrappedComponentContainer}>
                            {wrappedComponent}
                        </div>
                    )}

                    {/* </div> */}
                    {/* </div> */}
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
