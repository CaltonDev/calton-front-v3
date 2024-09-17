import React from 'react'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import styles from '../Topic/Topic.module.scss'
import Typography from '../../components/Typography/Typography'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Textarea from '../../components/Textarea/Textarea'
import CaltonSelect from '../../components/Select/Select'
import TextContainer from '../../components/TextContainer/TextContainer'
import Checkbox from '../../components/Checkbox/Checkbox'
import Table from '../../components/Table/Table'
import { PaginationState } from '@tanstack/react-table'
import TopicService from '../../services/TopicService'

function Topic() {
    const { t } = useTranslation()
    const topicData = TopicService.getTopicFiltered(true)?.data

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    return (
        <PageContainer>
            <PageHeader heading={t('Topic')} subheading={true}></PageHeader>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <Table
                        data={topicData?.data}
                        columnsData={topicData?.columns}
                        fullyLoaded={true}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.header}>
                        <Typography size={'bodyBig'} weight={'bold'}>
                            {t('Crea topic')}
                        </Typography>
                        <Button size={'medium'}>{t('Crea topic')}</Button>
                    </div>
                    <div className={styles.inputContainer}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('Nome')}
                        </Typography>
                        <Input
                            fullWidth={true}
                            placeholder={t('Nome_canale_nome_file')}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('Tags')}
                        </Typography>
                        <Textarea
                            //value={replyMessage}
                            //onChange={(e) => setReplyMessage(e.target.value)}
                            rows={5}
                            fullWidth={true}
                            placeholder={t('Inserisci...')}
                        />
                        <div className={styles.checkboxContainer}>
                            <Checkbox type={'radio'} title={t('And')} />
                            <Checkbox type={'radio'} title={t('Or')} />
                        </div>
                    </div>
                    <div className={styles.selectContainerDual}>
                        <div className={styles.selectBody}>
                            <Checkbox
                                type={'checkbox'}
                                title={t('Tutte le fonti')}
                            />
                        </div>
                        <div className={styles.selectBody}>
                            <Typography size={'bodySmall'} weight={'light'}>
                                {t('Escludi fonti')}
                            </Typography>
                            <CaltonSelect
                                //options={selectOptions}
                                /*value={
                                    selectOptions[
                                        selectOptions?.findIndex(
                                            (x) => x.value === sentiment
                                        )
                                    ]
                                }*/
                                size={'fullWidth'}
                                fontSize={'small'}
                                customColor={'none'}
                                customHeight={'auto'}
                                placeholderColor={'#9D96A5'}
                                /*onChange={(data) => {
                                    handleClickChangeSentiment(
                                        typeof data?.value === 'number'
                                            ? data?.value
                                            : 0,
                                        index
                                    )
                                }}*/
                            />
                        </div>
                    </div>
                    <div className={styles.colorsContainer}>
                        <Typography size={'bodySmall'} weight={'normal'}>
                            {t('Seleziona il colore')}
                        </Typography>
                        <div className={styles.selectColorContainer}>
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                            <div className={styles.square} />
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default Topic
