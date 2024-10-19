import HeaderGraph from '../../HeaderGraph/HeaderGraph'
import styles from './SmallTableGraphHome.module.scss'
//import LoaderChart from 'Components/CardInsights/LoaderChart/LoaderChart'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, InputNumber, Tooltip } from 'antd'
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'
import { SmallTableGraphHomeProps } from './SmallTableGraphHome.interface'

function SmallTableGraphHome({
    title,
    dataReady,
    extraImg,
    styleCounter,
    isTwoCols = false,
    fullWidth = false,
    data,
    totalNumber,
    mediaQuery = false,
    isImportant = false,
    isInfoTooltip,
    infoTooltip,
}: SmallTableGraphHomeProps) {
    const totalPageNumber = Math.ceil(data?.length / 8)
    const [currentPageNumber, setCurrentPageNumber] = useState(0)
    const onChangeInputNumber = (page: any) => {
        if (page === null) {
            setCurrentPageNumber(0)
        } else {
            setCurrentPageNumber(page - 1)
        }
    }

    const handlePageChange = (page: any) => {
        setCurrentPageNumber(page)
    }

    const { t } = useTranslation()
    return (
        <>
            <div
                className={
                    !isTwoCols
                        ? styles.rctBlock
                        : mediaQuery
                          ? styles.rctBlockMediaQuery
                          : styles.rctBlockTwoCols
                }
                style={{ width: fullWidth ? '100%' : isImportant ? '66%' : '' }}
            >
                <div className={styles.headerContainer}>
                    <HeaderGraph
                        title={title}
                        styleCounter={styleCounter}
                        extraImg={extraImg}
                        dataReady={dataReady}
                        isAnt={true}
                        isInfoTooltip={isInfoTooltip}
                        infoTooltip={infoTooltip}
                    />
                    {dataReady && (
                        <div>
                            <span className={styles.pageLabel}>
                                {t('Pagina')}
                            </span>
                            <InputNumber
                                min={1}
                                max={totalPageNumber}
                                defaultValue={1}
                                placeholder={currentPageNumber + 1 + ''}
                                value={currentPageNumber + 1}
                                onChange={onChangeInputNumber}
                                className={styles.inputNumber}
                            />
                            <Button
                                color="primary"
                                aria-label="prev"
                                size="small"
                                onClick={() =>
                                    handlePageChange(currentPageNumber - 1)
                                }
                                disabled={currentPageNumber === 0}
                                className={styles.iconBtnLeft}
                                icon={<AiOutlineCaretLeft fontSize="large" />}
                            />
                            <span className={styles.pageLabel}>
                                {currentPageNumber +
                                    1 +
                                    ' ' +
                                    t('di') +
                                    ' ' +
                                    totalPageNumber}
                            </span>
                            <Button
                                color="primary"
                                aria-label="succ"
                                size="small"
                                onClick={() =>
                                    handlePageChange(currentPageNumber + 1)
                                }
                                disabled={
                                    currentPageNumber === totalPageNumber - 1
                                }
                                className={styles.iconBtnRight}
                                icon={<AiOutlineCaretRight fontSize="large" />}
                            />
                        </div>
                    )}
                </div>
                {!dataReady ? (
                    <div id={title} style={{ height: '165px', width: '100%' }}>
                        {/*<LoaderChart type={'smallTable'} />*/}
                    </div>
                ) : (
                    <div>
                        <div
                            id={title}
                            className={styles.keywordsDataContainer}
                        >
                            {data
                                ?.slice(
                                    currentPageNumber * 8,
                                    currentPageNumber * 8 + 8
                                )
                                ?.map((obj: any, idx: number) => {
                                    return (
                                        <div
                                            className={styles.dataContainer}
                                            key={idx}
                                        >
                                            <Tooltip
                                                title={obj?.searchKeyword}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <span
                                                    className={
                                                        styles.titleLabel
                                                    }
                                                >
                                                    {currentPageNumber * 8 +
                                                        idx +
                                                        1 +
                                                        '. ' +
                                                        obj?.searchKeyword?.slice(
                                                            0,
                                                            25
                                                        )}
                                                </span>
                                                {obj?.searchKeyword?.length >
                                                    25 && (
                                                    <span
                                                        className={
                                                            styles.titleLabel
                                                        }
                                                    >
                                                        ...
                                                    </span>
                                                )}
                                            </Tooltip>
                                            <span className={styles.valueLabel}>
                                                {obj?.value}
                                            </span>
                                        </div>
                                    )
                                })}
                        </div>
                        <div className={styles.footer}>
                            <span className={styles.totalNumber}>
                                {totalNumber && totalNumber + ' '}
                            </span>
                            <span className={styles.totalNumberLabel}>
                                {t(
                                    'Ricerche che hanno mostrato il profilo della tua attività nei relativi risultati'
                                )}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SmallTableGraphHome
