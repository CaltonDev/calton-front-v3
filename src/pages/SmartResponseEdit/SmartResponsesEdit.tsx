import React from 'react'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import styles from '../SmartResponseEdit/SmartResponsesEdit.module.scss'
import Typography from '../../components/Typography/Typography'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Textarea from '../../components/Textarea/Textarea'
import CaltonSelect from '../../components/Select/Select'
import TextContainer from '../../components/TextContainer/TextContainer'
import Checkbox from '../../components/Checkbox/Checkbox'
import { SmartResponseEditProps } from './SmartResponseEdit.interface'

function SmartResponsesEdit({ data }: SmartResponseEditProps) {
    const { t } = useTranslation()

    return (
        <PageContainer>
            <PageHeader heading={t('Aggiungi')} subheading={true}></PageHeader>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <div className={styles.leftItemContainer}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('Nome')}
                        </Typography>
                        <Input
                            fullWidth={true}
                            size={'large'}
                            placeholder={t('Inserisci...')}
                        />
                    </div>
                    <div className={styles.leftItemContainer}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('Contenuto')}
                        </Typography>
                        <Textarea
                            //onChange={(e) => setReplyMessage(e.target.value)}
                            rows={5}
                            fullWidth={true}
                            placeholder={t('Scrivi...')}
                        />
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <Typography size={'bodyBig'} weight={'bold'}>
                        {t('Condizioni opzionali')}
                    </Typography>
                    <div className={styles.selectContainer}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('Luoghi')}
                        </Typography>
                        <CaltonSelect
                            size={'fullWidth'}
                            //options={selectOptions}
                            /*value={
                            selectOptions[
                                selectOptions?.findIndex(
                                    (x) => x.value === sentiment
                                )
                            ]
                        }*/
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
                    <div className={styles.selectContainer}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('Topic')}
                        </Typography>
                        <CaltonSelect
                            size={'fullWidth'}
                            //options={selectOptions}
                            /*value={
                            selectOptions[
                                selectOptions?.findIndex(
                                    (x) => x.value === sentiment
                                )
                            ]
                        }*/
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
                    <div className={styles.selectContainerDual}>
                        <div className={styles.selectBody}>
                            <Typography size={'bodySmall'} weight={'light'}>
                                {t('Sentiment')}
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
                        <div className={styles.selectBody}>
                            <Typography size={'bodySmall'} weight={'light'}>
                                {t('Test')}
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
                    <div className={styles.ratingContainer}>
                        <Typography size={'bodySmall'} weight={'normal'}>
                            {t('Rating')}
                        </Typography>
                        <div className={styles.starsContainer}>
                            <TextContainer
                                isRating={0}
                                color={'white'}
                                customTextColor={'#F1F1F1'}
                                isRatingEditable={true}
                            />
                            <Checkbox type={'radio'} title={t('Qualunque')} />
                        </div>
                    </div>
                    <div className={styles.ratingContainer}>
                        <Typography size={'bodySmall'} weight={'normal'}>
                            {t('Condizioni soddisfatte')}
                        </Typography>
                        <div className={styles.starsContainer}>
                            <Checkbox type={'radio'} title={t('Almeno una')} />
                            <Checkbox type={'radio'} title={t('Tutte')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Button size={'medium'} variant={'outline'}>
                    {t('Annulla')}
                </Button>
                <Button size={'medium'}>{t('Aggiungi')}</Button>
            </div>
        </PageContainer>
    )
}

export default SmartResponsesEdit
