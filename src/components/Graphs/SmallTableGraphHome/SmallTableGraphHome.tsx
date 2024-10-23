import HeaderGraph from '../../HeaderGraph/HeaderGraph'
import styles from './SmallTableGraphHome.module.scss'
//import LoaderChart from 'Components/CardInsights/LoaderChart/LoaderChart'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Tooltip from '../../Tooltip/Tooltip'
import { SmallTableGraphHomeProps } from './SmallTableGraphHome.interface'
import PageNavigator from '../../PageNavigator/PageNavigator'
import { PaginationState } from '@tanstack/react-table'

function SmallTableGraphHome({
    title,
    dataReady,
    extraImg,
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

    const { t } = useTranslation()

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 8,
    })

    const changePage = (direction: any) => {
        if (direction === 'next') {
            setPagination({
                pageIndex: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
            })
        } else if (direction === 'previous') {
            setPagination({
                pageIndex: pagination.pageIndex - 1,
                pageSize: pagination.pageSize,
            })
        } else {
            const number = Number(direction)
            if (
                number > 0 &&
                number <= Math.ceil(data?.length / pagination.pageSize)
            ) {
                setPagination({
                    pageIndex: number - 1,
                    pageSize: pagination.pageSize,
                })
            } else {
                setPagination({
                    pageIndex: 0,
                    pageSize: pagination.pageSize,
                })
            }
        }
    }

    const changeElementsPerPage = (e: any) => {
        setPagination({
            pageIndex: 0,
            pageSize: e.value,
        })
    }

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
                <HeaderGraph
                    title={title}
                    extraImg={extraImg}
                    dataReady={dataReady}
                    isAnt={true}
                    isInfoTooltip={isInfoTooltip}
                    infoTooltip={infoTooltip}
                />
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
                                    pagination?.pageIndex * 8,
                                    pagination?.pageIndex * 8 + 8
                                )
                                ?.map((obj: any, idx: number) => {
                                    return (
                                        <div
                                            className={styles.dataContainer}
                                            key={idx}
                                        >
                                            <Tooltip title={obj?.searchKeyword}>
                                                <span
                                                    className={
                                                        styles.titleLabel
                                                    }
                                                >
                                                    {pagination?.pageIndex * 8 +
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
                    </div>
                )}
                <div className={styles.footer}>
                    <div>
                        <span className={styles.totalNumber}>
                            {totalNumber && totalNumber + ' '}
                        </span>
                        <span className={styles.totalNumberLabel}>
                            {t(
                                'Ricerche che hanno mostrato il profilo della tua attività nei relativi risultati'
                            )}
                        </span>
                    </div>

                    {dataReady && (
                        <PageNavigator
                            totalElements={totalPageNumber}
                            currentPage={pagination.pageIndex}
                            pageElements={pagination.pageSize}
                            changePage={changePage}
                            hideChangeElementsPerPage={true}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default SmallTableGraphHome
