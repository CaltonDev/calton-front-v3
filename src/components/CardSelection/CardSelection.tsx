import React from 'react'
import { CardSelectionProps } from './CardSelection.interface'
import styles from './CardSelection.module.scss'
import Typography from '../Typography/Typography'
import TextContainer from '../TextContainer/TextContainer'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import {
    OptionsCardSelectionType,
    OptionsWrappedKeyType,
} from './CardSelection.interface'

const CardSelection = ({
    title,
    data,
    setSelectedCard,
    activeCard,
    addNewCard = true,
    wrappedComponent = <></>,
    hasWrappedComponent = false,
    isDeleteButton = false,
    handleDelete,
    type = OptionsCardSelectionType.standard,
}: CardSelectionProps) => {
    const history = useNavigate()
    const handleCardSelection = (idx: number) => {
        if (idx === -1) history('/surveys/new')
        if (setSelectedCard) setSelectedCard(idx)
    }
    return (
        <div className={styles.container}>
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
            {data?.map((obj, idx: number) => (
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
                    <div
                        className={
                            type === OptionsCardSelectionType.standard ||
                            type ===
                                OptionsCardSelectionType.hasWrappedComponent
                                ? styles.cardTitleContainer
                                : activeCard === idx
                                  ? styles.cardTitleContainerWrappedSelected
                                  : styles.cardTitleContainerWrapped
                        }
                    >
                        {type === OptionsCardSelectionType.standard ||
                        type ===
                            OptionsCardSelectionType.hasWrappedComponent ? (
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
                        {type === OptionsCardSelectionType.standard ||
                            (type ===
                                OptionsCardSelectionType.hasWrappedComponent && (
                                <SvgWrapper
                                    keySvg={'arrowForward'}
                                    color={'primaryIcon'}
                                    customHeight={24}
                                    customWidth={24}
                                />
                            ))}
                        {isDeleteButton &&
                            handleDelete &&
                            type ===
                                OptionsCardSelectionType.isWrappedComponent && (
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
                        {obj?.description || ''}
                    </Typography>

                    {type === OptionsCardSelectionType.hasWrappedComponent &&
                        obj?.wrappedKey === OptionsWrappedKeyType.moreHours && (
                            <div className={styles.wrappedComponentContainer}>
                                {wrappedComponent}
                            </div>
                        )}

                    {type === OptionsCardSelectionType.standard &&
                        obj?.value?.map((value: string, textIdx: number) => (
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
