import styles from './HeaderGraph.module.scss'
import CountUp from 'react-countup'
import DownloadIcon from '../DownloadIcon/DownloadIcon'
import React, { useState } from 'react'
import html2canvas from 'html2canvas'
import { useTranslation } from 'react-i18next'
import settings from '../../assets/icons/settings.svg'
import RibbonStateReview from '../RibbonStateReview/RibbonStateReview'
import AppConfig from '../../constants/AppConfig'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { saveAs } from 'file-saver'
import { HeaderGraphProps } from './HeaderGraph.interface'
import Typography from '../Typography/Typography'

function HeaderGraph({
    title = '',
    numberToShow,
    extraImg,
    dataReady,
    numberToShowComponent,
    onClickImg,
    decimals = 0,
    sizeImg = 40,
    textForNumber = undefined,
    classTextForNumber = undefined,
    styleCounter = undefined,
    download = true,
    isBubble,
    widthIcon = 20,
    isAnt = true,
    option,
    setOption,
    optionable,
    isBeta = false,
    isInfoTooltip,
    infoTooltip,
}: HeaderGraphProps) {
    const [downloading, setDownloading] = useState(false)
    const { t, i18n } = useTranslation()

    const onDownload = () => {
        setDownloading(true)
        if (isBubble) {
            const divElement = document.getElementById(title)

            if (divElement) {
                html2canvas(divElement).then((canvas) => {
                    const link = document.createElement('a')
                    link.href = canvas.toDataURL('image/png')
                    link.download = title + '.png'
                    link.click()
                })
            }
        } else {
            let canvasSave
            if (isAnt) {
                const divElement = document.getElementById(title)
                if (divElement) {
                    canvasSave = divElement.querySelector('canvas')
                }
            } else {
                canvasSave = document.getElementById(title)
            }

            try {
                const canvas = canvasSave as HTMLCanvasElement
                canvas.toBlob(function (blob) {
                    saveAs(blob ? blob : '', title + '.png')
                })
            } catch (e) {}
        }
        setTimeout(() => {
            setDownloading(false)
        }, 1800)
    }

    return (
        <>
            {isBeta && (
                <div className={styles.customRibbornDiv}>
                    <RibbonStateReview
                        competitor={'Beta'}
                        colorCompetitor={AppConfig.themeColors.primary}
                    />
                </div>
            )}
            <div className={styles.myExtContainerHeading}>
                <div className={styles.myContainerHeading}>
                    <div className={styles.headingTextDiv}>
                        <Typography size={'h6'} weight={'bold'}>
                            {!option ? title : t('Sinonimi/Esclusioni')}
                        </Typography>
                        {dataReady && isInfoTooltip ? (
                            <div className={styles.tooltipDiv}>
                                <Tooltip
                                    overlayInnerStyle={{ padding: '.8em' }}
                                    color={'white'}
                                    title={
                                        <div className={styles.tooltipText}>
                                            {infoTooltip}
                                        </div>
                                    }
                                    arrow={false}
                                >
                                    <InfoCircleOutlined
                                        className={styles.infoIcon}
                                    />
                                </Tooltip>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                {optionable ? (
                    <div>
                        {optionable && setOption && option && (
                            <a onClick={() => setOption(!option)}>
                                {' '}
                                <img
                                    src={settings}
                                    alt="Surveys"
                                    style={{
                                        width: 25,
                                        marginRight: 10,
                                        outline: 'none',
                                        cursor: 'pointer',
                                    }}
                                />
                            </a>
                        )}
                        {download && dataReady && (
                            <a onClick={() => onDownload()}>
                                <DownloadIcon
                                    width={widthIcon}
                                    play={downloading}
                                    optionable={optionable}
                                />
                            </a>
                        )}
                    </div>
                ) : (
                    download &&
                    dataReady && (
                        <a onClick={() => onDownload()}>
                            <DownloadIcon
                                width={widthIcon}
                                play={downloading}
                                optionable={optionable}
                            />
                        </a>
                    )
                )}
            </div>
            <div>
                <div className="float-right pr-10 hidden-md-down">
                    <div
                        style={{ float: 'right' }}
                        className="featured-section-icon"
                    >
                        {textForNumber && (
                            <span
                                className={
                                    classTextForNumber ? classTextForNumber : ''
                                }
                            >
                                {textForNumber}
                            </span>
                        )}
                        <span className={styles.counterPoint}>
                            {numberToShowComponent ? (
                                numberToShowComponent
                            ) : numberToShow === 0 ? (
                                <span>0</span>
                            ) : numberToShow ? (
                                <CountUp
                                    separator=","
                                    className={styleCounter ? styleCounter : ''}
                                    start={0}
                                    end={numberToShow}
                                    duration={3}
                                    decimals={decimals}
                                    useEasing={true}
                                />
                            ) : extraImg && dataReady && onClickImg ? (
                                <div onClick={() => onClickImg()}>
                                    <img
                                        alt={''}
                                        width={sizeImg}
                                        src={extraImg}
                                        style={{
                                            marginRight: 20,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </div>
                            ) : (
                                ''
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderGraph
