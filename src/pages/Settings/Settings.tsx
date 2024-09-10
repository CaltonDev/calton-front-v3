import styles from './Settings.module.scss'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Typography from '../../components/Typography/Typography'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import CardSelection from '../../components/CardSelection/CardSelection'
import { SectionDataType, SectionType } from './Settings.interface'
import SettingsFieldsContainer from '../../components/SettingsFieldsContainer/SettingsFieldsContainer'

function Settings() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const history = useNavigate()
    const [activeSection, setActiveSection] = useState<SectionType>({
        index: 0,
        type: 'account',
    })

    const [selectedCard, setSelectedCard] = useState(0)

    const sectionData: SectionDataType[] = [
        {
            key: 'account',
            label: t('Gestisci account'),
            displayLabel: t('account'),
        },
        {
            key: 'smart_response',
            label: t('Smart response'),
            displayLabel: t('smart response'),
        },
        {
            key: 'gruppi',
            label: t('Gestisci gruppi'),
            displayLabel: t('gruppo'),
        },
        {
            key: 'report',
            label: t('Gestitsci report'),
            displayLabel: t('report'),
        },
    ]

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

    return (
        <PageContainer>
            <PageHeader
                heading={t('Impostazioni')}
                subheading={true}
                hideFilters={true}
            ></PageHeader>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.leftItemContainer}>
                        {sectionData?.map((obj, idx) => {
                            return (
                                <div
                                    key={obj?.key}
                                    onClick={() =>
                                        setActiveSection({
                                            index: idx,
                                            type: obj?.key,
                                        })
                                    }
                                    className={
                                        idx === activeSection.index
                                            ? styles.headerLabelContainer
                                            : styles.headerLabelContainerDisabled
                                    }
                                >
                                    <Typography
                                        size={'bodyBig'}
                                        weight={'normal'}
                                        color={
                                            idx === activeSection.index
                                                ? 'settings'
                                                : 'grey'
                                        }
                                    >
                                        {obj?.label}
                                    </Typography>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.contentDiv}>
                        <CardSelection
                            data={data}
                            type={activeSection.type}
                            setSelectedCard={setSelectedCard}
                            activeCard={selectedCard}
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
                                type={activeSection.type}
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
                                            {
                                                sectionData[activeSection.index]
                                                    ?.key
                                            }
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

export default Settings
