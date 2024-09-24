import React from 'react'
import CustomLogoSource from '../CustomLogoSouce/CustomLogoSource'
import styles from './CustomClickableCard.module.scss'
import { useSelector } from 'react-redux'
import { CustomClickableCardProps } from './CustomClickableCard.interface'
import { RootState } from '../../store/store'

const ClickableCard = ({
    children,
    heading,
    content,
    footer,
    img,
    isSelectable,
    styleRow,
    likes,
    followers,
    rating_count,
    isDisabled,
    onClick,
    duplicate,
    hiddenField,
    selectedCardIndex,
    index,
    allSelected = false,
}: CustomClickableCardProps) => {
    const selected = allSelected ? true : selectedCardIndex?.includes(index)

    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )
    const onClickInternal = () => {
        onClick()
    }

    return (
        <div
            className={styles.cardContainer}
            style={
                platformType !== 'listing' && isDisabled
                    ? { cursor: 'not-allowed' }
                    : { cursor: 'pointer' }
            }
            onClick={() => (isDisabled ? null : onClickInternal())}
            key={index + '' + hiddenField}
        >
            <div
                className={`${styles.cardClickable} ${isSelectable && selected ? styles.selectedCard : styles.borderSelectableCard}`}
            >
                <div
                    className={styles.containerElements}
                    style={styleRow ? styleRow : null}
                >
                    {img && (
                        <span style={{ margin: 15 }}>
                            <CustomLogoSource
                                data={img}
                                showText={false}
                                width={60}
                            />
                        </span>
                    )}
                    <span
                        style={{
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal',
                        }}
                    >
                        {heading && (
                            <h4 className={styles.rctBlockTitle}>
                                <b>{heading}</b>
                            </h4>
                        )}
                        {content && (
                            <div className={styles.textContent}>{content}</div>
                        )}
                        {(likes || likes === 0) && (
                            <div className={styles.textContent}>
                                <span>
                                    Mi piace: <b>{likes}</b>
                                </span>
                            </div>
                        )}
                        {(followers || followers === 0) && (
                            <div className={styles.textContent}>
                                <span>
                                    Followers: <b>{followers}</b>
                                </span>
                            </div>
                        )}
                        {(rating_count || rating_count === 0) && (
                            <div className={styles.textContent}>
                                <span>
                                    Recensioni: <b>{rating_count}</b>
                                </span>
                            </div>
                        )}
                        {footer && (
                            <div className={styles.textContent}>{footer}</div>
                        )}
                        {duplicate && (
                            <div className={styles.textDuplicatedCard}>
                                * Scheda duplicata *
                            </div>
                        )}
                        {children}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ClickableCard
