import styles from '../LoaderChart.module.scss'
import MenuCardsWrapper from 'Components/ListingMenuCard/MenuCardsWrapper/MenuCardsWrapper'
import * as React from 'react'
import { useState } from 'react'
import StyledArticle from '../styledComponents/StyledArticle'

function ListingEditMenu() {
    const [menuName, setMenuName] = useState('Test')
    const [userViewWidth, setUserViewWidth] = useState(window.innerWidth)

    function cardsToFitInView(viewWidth, cardWidth) {
        if (viewWidth <= 0 || cardWidth <= 0) {
            return 0
        }
        const numberOfCards =
            Math.round(viewWidth / cardWidth) !== 0
                ? Math.round(viewWidth / cardWidth)
                : 1

        return numberOfCards === 1 ? 2 : numberOfCards > 5 ? 5 : numberOfCards
    }

    const [numberOfCardsOnLoader, setNumberOfCardsOnLoader] = useState(
        cardsToFitInView(userViewWidth, 400)
    )

    return (
        <>
            <StyledArticle>
                <div className={styles.contentBody}>
                    <div className={styles.menuCreateHeader}>
                        <div className={styles.menuName}>
                            <div>
                                <div className="inputLong"></div>
                            </div>
                        </div>
                        <div className={styles.menuLang}>
                            <div className={styles.menuLangInput}>
                                <div className="inputShort"></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.menuCreateHeader}>
                        <div className={styles.menuLang}>
                            <div className={styles.menuLangInput}>
                                <div className="inputShort"></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.menuRowContainer}>
                        {[...Array(numberOfCardsOnLoader)].map((e, i) => {
                            return (
                                <div className={styles.cardContainer} key={i}>
                                    <div className="card"></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </StyledArticle>
        </>
    )
}

export default ListingEditMenu
