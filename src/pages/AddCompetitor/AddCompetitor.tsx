import styles from './AddCompetitor.module.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '../../components/Typography/Typography'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import AddAnalisiCompetitorContainer from '../../components/AddAnalisiCompetitorContainer/AddAnalisiCompetitorContainer'
import CardSelectionCompetitor from '../../components/CardSelection/CardSelectionCompetitor/CardSelectionCompetitor'
import CompetitorService from '../../services/CompetitorService'

function AddCompetitor() {
    const { t } = useTranslation()

    const [selectedCard, setSelectedCard] = useState(0)

    const data = [
        {
            title: 'Nome del report',
            value: [
                {
                    name: 'Ristorante Zio Peppino',
                    address: 'Via 22 Dawson St, Dublin',
                },
                {
                    name: 'Ristorante Zio Peppino',
                    address: 'Via 22 Dawson St, Dublin',
                },
                {
                    name: 'Ristorante Zio Peppino',
                    address: 'Via 22 Dawson St, Dublin',
                },
            ],
        },
        {
            title: 'Nome del report',
            value: [
                {
                    name: 'Ristorante Zio Peppino',
                    address: 'Via 22 Dawson St, Dublin',
                },
            ],
        },
        {
            title: 'Nome del report',
            value: [
                {
                    name: 'Ristorante Zio Peppino',
                    address: 'Via 22 Dawson St, Dublin',
                },
                {
                    name: 'Ristorante Zio Peppino',
                    address: 'Via 22 Dawson St, Dublin',
                },
            ],
        },
    ]

    return (
        <PageContainer>
            <PageHeader
                heading={t('Gestisci competitor')}
                subheading={true}
                hideFilters={true}
            ></PageHeader>
            <div className={styles.container}>
                <div className={styles.body}>
                    <div className={styles.contentDiv}>
                        <CardSelectionCompetitor
                            data={data}
                            setSelectedCard={setSelectedCard}
                            activeCard={selectedCard}
                            title={t('Crea nuovo gruppo di competitor')}
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
                            <AddAnalisiCompetitorContainer
                                data={data[selectedCard]}
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
                                            {t('gruppo')}
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

export default AddCompetitor
