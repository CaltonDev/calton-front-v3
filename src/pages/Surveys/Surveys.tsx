import styles from './Surveys.module.scss'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Typography from '../../components/Typography/Typography'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import CardSelection from '../../components/CardSelection/CardSelection'
import { SectionDataType, SectionType } from './Surveys.interface'
import SettingsFieldsContainer from '../../components/SettingsFieldsContainer/SettingsFieldsContainer'
import { PaginationState } from '@tanstack/react-table'
import PageNavigator from '../../components/PageNavigator/PageNavigator'

function Surveys() {
    const { t } = useTranslation()

    const [selectedCard, setSelectedCard] = useState(-2)

    const data = [
        {
            title: 'Nome del report',
            value: ['report number'],
        },
        {
            title: 'Nome del report',
            value: ['report number', 'report number', 'report number'],
        },
        {
            title: 'Nome del report',
            value: ['report number'],
        },
        {
            title: 'Nome del report',
            value: ['report number'],
        },
        {
            title: 'Nome del report',
            value: ['report number'],
        },
        {
            title: 'Nome del report',
            value: ['report number'],
        },
        {
            title: 'Nome del report',
            value: ['report number'],
        },
    ]

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
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
            //TODO: we need to paginate the api
            /* if (
                number > 0 &&
                number <= Math.ceil(surveys?.countFeed / pagination.pageSize)
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
            }*/
        }
    }

    const changeElementsPerPage = (e: any) => {
        setPagination({
            pageIndex: 0,
            pageSize: e.value,
        })
    }

    return (
        <PageContainer>
            <PageHeader
                heading={t('Sondaggi')}
                subheading={true}
                hideFilters={true}
            ></PageHeader>
            <div className={styles.container}>
                <div className={styles.body}>
                    <div className={styles.contentDiv}>
                        <div className={styles.pageNavigatorContainer}>
                            <PageNavigator
                                pageElements={pagination.pageSize}
                                totalElements={data?.length}
                                currentPage={pagination.pageIndex}
                                changePage={changePage}
                                changeElementsPerPage={changeElementsPerPage}
                            />
                        </div>
                        <CardSelection
                            data={data}
                            setSelectedCard={setSelectedCard}
                            activeCard={selectedCard}
                            title={t('Crea nuovo sondaggio')}
                        />
                    </div>

                    <div
                        className={
                            selectedCard !== -2
                                ? styles.inputsContainer
                                : styles.placeholder
                        }
                    >
                        {selectedCard !== -2 ? (
                            <SettingsFieldsContainer
                                data={data[selectedCard]}
                                type={'surveys'}
                                isNew={selectedCard === -1}
                            />
                        ) : (
                            <>
                                <div className={styles.placeholderText}>
                                    <p>
                                        <Typography
                                            size={'h4'}
                                            weight={'normal'}
                                            useSpan={true}
                                        >
                                            {t('Seleziona un')}
                                        </Typography>
                                        <Typography
                                            size={'h4'}
                                            weight={'bold'}
                                            useSpan={true}
                                        >
                                            {t('sondaggio')}
                                        </Typography>
                                        <Typography
                                            size={'h4'}
                                            weight={'normal'}
                                            useSpan={true}
                                        >
                                            {t(
                                                'per visualizzare le informazioni.'
                                            )}
                                        </Typography>
                                    </p>
                                </div>

                                <div className={styles.placeholderContent}>
                                    <div>
                                        <div className={styles.leftItem}>
                                            <div className={styles.bar} />
                                            <div className={styles.bar} />
                                            <div className={styles.bar} />
                                            <div className={styles.bar} />
                                        </div>
                                    </div>
                                    <div className={styles.rightItem}>
                                        <div className={styles.smallBar} />
                                        <div className={styles.barContainer}>
                                            <div className={styles.smallBar} />
                                            <div className={styles.smallBar} />
                                        </div>
                                        <div className={styles.barContainer}>
                                            <div className={styles.smallBar} />
                                            <div className={styles.smallBar} />
                                        </div>
                                        <div className={styles.barContainer}>
                                            <div className={styles.smallBar} />
                                            <div className={styles.smallBar} />
                                        </div>
                                        <div className={styles.barContainer}>
                                            <div
                                                className={styles.smallestBar}
                                            />
                                            <div
                                                className={styles.smallestBar}
                                            />
                                            <div
                                                className={styles.smallestBar}
                                            />
                                            <div
                                                className={styles.smallestBar}
                                            />
                                        </div>
                                        <div className={styles.smallestBar} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default Surveys
