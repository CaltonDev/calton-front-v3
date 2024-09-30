import styles from './SurveyCard.module.scss'
import { useTranslation } from 'react-i18next'
import AppConfig from '../../../constants/AppConfig'
import React from 'react'
import CountUp from 'react-countup'
import { useNavigate } from 'react-router-dom'
import { SurveyCardProps } from './SurveyCard.interface'
import Typography from '../../Typography/Typography'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import TrackerCard from '../../TrackerCard/TrackerCard'
import ProgressBar from '../../ProgressBar/ProgressBar'
import Button from '../../Button/Button'

function CardSurvey({
    name,
    userStart,
    completition,
    time,
    sentiment,
    date,
    index,
    response,
    id,
    elm,
}: SurveyCardProps) {
    const { t, i18n } = useTranslation()
    const history = useNavigate()

    const getSentiment = (meanSentiment: number) => {
        if (meanSentiment) {
            if (meanSentiment <= 0.45) {
                return -1
            } else if (meanSentiment > 0.45 && meanSentiment < 0.55) {
                return 0
            } else if (meanSentiment >= 0.55) {
                return 1
            }
        } else {
            return null
        }
    }
    const localSentiment = getSentiment(sentiment)

    const backgroundColor =
        localSentiment == 1
            ? AppConfig.themeColors.positive
            : localSentiment == 0
              ? AppConfig.themeColors.neutrale
              : localSentiment == -1
                ? AppConfig.themeColors.negative
                : ''

    const handleBurgerIconClick = () => {}

    const trackerData = [
        {
            label: t('Media tasso di completamento'),
            value: 200000,
            total: 15000,
        },
    ]

    return (
        <div
            onClick={() =>
                history('../insights/' + id, { state: { data: elm } })
            }
            className={styles.containerSurvey}
        >
            <div className={styles.containerColumn}>
                <div className={styles.headerContainer}>
                    <Typography size={'bodyMedium'} weight={'bold'}>
                        {name}
                    </Typography>
                    <SvgWrapper
                        keySvg={'burgerIconDot.svg'}
                        onClick={handleBurgerIconClick}
                    />
                </div>
                <div className={styles.containerInfo}>
                    <div className={styles.dataContainer}>
                        <div className={styles.labelContainer}>
                            <SvgWrapper
                                keySvg={'peopleSvg'}
                                onClick={handleBurgerIconClick}
                                color={'disabled'}
                                size={'medium'}
                            />
                            <Typography
                                size={'bodyMedium'}
                                weight={'light'}
                                color={'grey'}
                            >
                                {t('Start')}
                            </Typography>
                        </div>

                        <div className={styles.typographyNumberDiv}>
                            <Typography size={'h4'} weight={'bold'}>
                                {userStart?.toString()}
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.dataContainer}>
                        <div className={styles.labelContainer}>
                            <SvgWrapper
                                keySvg={'checkmarkSvg'}
                                onClick={handleBurgerIconClick}
                                color={'disabled'}
                                size={'medium'}
                            />
                            <Typography
                                size={'bodyMedium'}
                                weight={'light'}
                                color={'grey'}
                            >
                                {t('Risposte')}
                            </Typography>
                        </div>

                        <div className={styles.typographyNumberDiv}>
                            <Typography size={'h4'} weight={'bold'}>
                                {response?.toString()}
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.dataContainer}>
                        <div className={styles.labelContainer}>
                            <SvgWrapper
                                keySvg={'hours.svg'}
                                onClick={handleBurgerIconClick}
                                color={'disabled'}
                                size={'medium'}
                            />
                            <Typography
                                size={'bodyMedium'}
                                weight={'light'}
                                color={'grey'}
                            >
                                {t('Tempo medio')}
                            </Typography>
                        </div>
                        <div className={styles.typographyNumberDiv}>
                            <Typography size={'h4'} weight={'bold'}>
                                {time?.toString()}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={styles.progressContainer}>
                    <div className={styles.progessBarTypography}>
                        <Typography size={'bodyMedium'} weight={'light'}>
                            {t('Tasso di completamente')}
                        </Typography>
                        <Typography size={'bodyMedium'} weight={'bold'}>
                            {completition.toString() + ' %'}
                        </Typography>
                    </div>
                    <div>
                        <ProgressBar
                            progress={completition}
                            progressTotal={100}
                        />
                    </div>
                </div>

                <div className={styles.containerFooter}>
                    <Typography size={'bodyMedium'} weight={'light'}>
                        {t('Sondaggio del') + ' ' + date}
                    </Typography>
                    <Button
                        variant={'outline'}
                        customPadding={'7px 16px'}
                        icon={'eyeSvg'}
                        arrowPlacement={'left'}
                        iconColor={'secondary'}
                    >
                        {t('Mostra')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CardSurvey
