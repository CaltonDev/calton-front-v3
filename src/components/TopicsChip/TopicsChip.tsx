import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import styles from './TopicsChip.module.scss'
import {
    setTopics,
    setSentimentChips,
    setChipsVotiPerData,
} from '../../store/analisiAvanzataState/analisiAvanzataSlice'
import { useDispatch } from 'react-redux'
import { TopicsChipProps } from './TopicsChip.interface'

function TopicsChip({
    chipTopics,
    showAll,
    type,
    actualContainerWidth,
}: TopicsChipProps) {
    const dispatch = useDispatch()
    const [chipSizeAvg, setChipSizeAvg] = useState(60)
    const [chipsTopicsToDisplay, setChipsTopicsToDisplay] = useState([])

    const buttonToggle = (index: number) => {
        const buttonsFlag: any[] = [...chipsTopicsToDisplay]
        if (buttonsFlag.length > 0)
            buttonsFlag[index] = {
                ...buttonsFlag[index],
                chipFlag: !buttonsFlag[index].chipFlag,
            }
        if (type === 'generic') {
            dispatch(setSentimentChips(buttonsFlag))
        } else if (type === 'generic-multiline') {
            dispatch(setChipsVotiPerData(buttonsFlag))
        } else {
            dispatch(setTopics(buttonsFlag))
        }
    }

    useEffect(() => {
        if (!showAll) {
            const endIndex = calculateLastVisibleIndex()
            setChipsTopicsToDisplay(chipTopics?.slice(0, endIndex))
        } else {
            setChipsTopicsToDisplay(chipTopics)
        }
    }, [chipTopics, showAll, actualContainerWidth])

    const calculateLastVisibleIndex = () => {
        //constant to take gap into account
        const SPACER_FACTOR = 30
        const chipSize = chipSizeAvg
        if (actualContainerWidth && chipSize) {
            const numberOfChips = Math.trunc(
                actualContainerWidth / (chipSize + SPACER_FACTOR)
            )
            return numberOfChips > 0 ? numberOfChips : 1
        }
    }

    return (
        <>
            <div className={styles.chipsContainer}>
                <div
                    className={styles.chipSubContainer}
                    style={{ overflowX: showAll ? 'visible' : 'hidden' }}
                >
                    <div
                        className={styles.chipBody}
                        style={{
                            flexWrap: 'wrap',
                            justifyContent: type === 'generic' ? 'center' : '',
                        }}
                    >
                        {chipsTopicsToDisplay &&
                            chipsTopicsToDisplay?.map(
                                (item: any, index: number) => {
                                    return (
                                        <div
                                            className={styles.buttonContainer}
                                            key={index}
                                        >
                                            <Button
                                                className={
                                                    item.chipFlag === true
                                                        ? styles.chipButtonDisable
                                                        : styles.chipButton
                                                }
                                                onClick={() =>
                                                    buttonToggle(index)
                                                }
                                            >
                                                {item.name}
                                            </Button>
                                        </div>
                                    )
                                }
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default TopicsChip
