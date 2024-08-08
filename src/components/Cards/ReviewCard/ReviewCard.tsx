import React, { useState } from 'react'
import styles from './ReviewCard.module.scss'
import { useTranslation } from 'react-i18next'
import Typography from '../../Typography/Typography'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import Tag from '../../Tag/Tag'
import TextContainer from '../../TextContainer/TextContainer'
import Button from '../../Button/Button'
import Select from '../../Select/Select'
import CaltonSelect from '../../Select/Select'
import { getBackgroundColor } from '../../../utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import Textarea from '../../Textarea/Textarea'
import Hooks from '../../../utils/hooks/Hooks'
function ReviewCard() {
    const { t } = useTranslation()
    const title = 'Daniel'
    const sentiment = 'neutral'
    const [replyMessage, setReplyMessage] = useState<string>()
    const [showTextarea, setShowTextarea] = useState(false)
    const selectOptions = [
        {
            value: 'positive',
            label: t('Sentiment'),
            icon: 'positiveSentiment.svg',
        },
        {
            value: 'neutral',
            label: t('Sentiment'),
            icon: 'neutralSentiment.svg',
        },
        {
            value: 'negative',
            label: t('Sentiment'),
            icon: 'negativeSentiment.svg',
        },
    ]

    const handleSentimentChange = () => {
        console.log('Ciao')
    }

    const handleClickOutside = () => {
        setShowTextarea(false)
    }
    const ref = Hooks.useOutsideClick(handleClickOutside)

    return (
        <div className={styles.container}>
            <div className={styles.paddedContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            {true ? (
                                <div className={styles.placeholderImg} />
                            ) : (
                                <SvgWrapper
                                    keySvg={'Facebook.svg'}
                                    size={'small'}
                                />
                            )}
                            <Typography size={'bodySmall'} weight={'light'}>
                                {title}
                            </Typography>
                        </div>
                        <SvgWrapper
                            keySvg={'openInNewPageIcon.svg'}
                            size={'small'}
                        />
                    </div>
                    <div className={styles.contentDiv}>
                        <div className={styles.tagsContainer}>
                            <div className={styles.leftItem}>
                                <TextContainer
                                    label={'Location'}
                                    color={'#0C14A1'}
                                />
                                <TextContainer
                                    label={'Prezzo'}
                                    color={'#0C14A1'}
                                />
                            </div>
                            <div>
                                <Button
                                    size={'small'}
                                    fullWidth={true}
                                    customPadding={'7px 16px'}
                                >
                                    {t('Gestisci topic')}
                                </Button>
                            </div>
                        </div>
                        <div className={styles.tagsContainer}>
                            <div className={styles.leftItem}>
                                <TextContainer
                                    label={'23/04/2023'}
                                    textColor={'black'}
                                    color={'#F1F1F1'}
                                    iconSvg={'Amazon.svg'}
                                />
                                {/*Add review stars*/}
                                <TextContainer isRating={1} color={'#F1F1F1'} />
                            </div>
                            <CaltonSelect
                                options={selectOptions}
                                value={
                                    selectOptions[
                                        selectOptions?.findIndex(
                                            (x) => x.value === sentiment
                                        )
                                    ]
                                }
                                size={'small'}
                                fontSize={'small'}
                                customColor={'none'}
                                customHeight={'auto'}
                                placeholderColor={'black'}
                                onChange={handleSentimentChange}
                            />
                        </div>
                        <div className={styles.reviewContainer}>
                            <div className={styles.title}>
                                {true ? (
                                    <div className={styles.placeholderImg} />
                                ) : (
                                    <SvgWrapper
                                        keySvg={'Facebook.svg'}
                                        size={'small'}
                                    />
                                )}
                                <Typography size={'bodyMedium'} weight={'bold'}>
                                    {title}
                                </Typography>
                            </div>
                            <div className={styles.reviewContainer}>
                                <Typography
                                    size={'bodyMedium'}
                                    weight={'normal'}
                                >
                                    {
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                    }
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                {!showTextarea && (
                    <div className={styles.footer}>
                        <Tag
                            label={'Senza risposta'}
                            type={'neutral'}
                            iconSvg={'reply.svg'}
                        />
                        <SvgWrapper
                            keySvg={'message.svg'}
                            size={'small'}
                            color={'secondary'}
                            hasContainerProps={{
                                hasContainer: true,
                                containerSize: 32,
                                border: '2px solid #3F49FC',
                                outlined: true,
                            }}
                            onClick={() => setShowTextarea(true)}
                        />
                    </div>
                )}
            </div>
            {showTextarea && (
                <div className={styles.textareaContainer}>
                    <div className={styles.labelContainer}>
                        <Typography
                            size={'bodyXSmall'}
                            weight={'bold'}
                            color={'blue'}
                        >
                            {t('Risposta')}
                        </Typography>
                    </div>
                    <div ref={ref}>
                        <Textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            rows={5}
                            fullWidth={true}
                            icon={'sendIcon.svg'}
                            placeholder={t('Rispondi...')}
                            customPadding={'100px'}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReviewCard
