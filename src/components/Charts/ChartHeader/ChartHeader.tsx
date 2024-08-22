import styles from './ChartHeader.module.scss'
import CountUp from 'react-countup'
import React, { useState } from 'react'
import html2canvas from 'html2canvas'
import { useTranslation } from 'react-i18next'
import RibbonStateReview from '../../RibbonStateReview/RibbonStateReview'
import AppConfig from '../../../constants/AppConfig'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { saveAs } from 'file-saver'
import { ChartHeaderProps } from './ChartHeader.interface'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import Typography from '../../Typography/Typography'
import TextContainer from '../../TextContainer/TextContainer'

function ChartHeader({
    title = '',
    numberToShow,
    extraImg,
    dataReady,
    numberToShowComponent,
    onClickImg,
    decimals = 0,
    sizeImg = 40,
    textForNumber = '',
    classTextForNumber = '',
    styleCounter = '',
    download = true,
    isBubble,
    isAnt = true,
    option,
    setOption,
    optionable,
    isBeta = false,
    isInfoTooltip,
    infoTooltip,
    textIcon,
}: ChartHeaderProps) {
    const [downloading, setDownloading] = useState(false)
    const { t, i18n } = useTranslation()

    const onDownload = () => {
        setDownloading(true)
        if (isBubble) {
            const divElement = document.getElementById(title)

            if (divElement)
                html2canvas(divElement).then((canvas) => {
                    const link = document.createElement('a')
                    link.href = canvas.toDataURL('image/png')
                    link.download = title + '.png'
                    link.click()
                })
        } else {
            let canvasSave
            if (isAnt) {
                const divElement = document.getElementById(title)
                if (divElement) canvasSave = divElement.querySelector('canvas')
            } else {
                canvasSave = document.getElementById(title)
            }

            try {
                if (canvasSave) {
                    const canvas = canvasSave as HTMLCanvasElement
                    canvas.toBlob(function (blob) {
                        saveAs(blob ? blob : '', title + '.png')
                    })
                }
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
                        <Typography size={'h5'} weight={'bold'}>
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
                        {optionable && (
                            <SvgWrapper
                                keySvg={'settings.svg'}
                                onClick={() => setOption(!option)}
                            />
                        )}
                        {download && dataReady && (
                            <SvgWrapper
                                keySvg={'download.svg'}
                                onClick={onDownload}
                            />
                        )}
                    </div>
                ) : (
                    download &&
                    dataReady && (
                        <SvgWrapper
                            keySvg={'download.svg'}
                            onClick={onDownload}
                        />
                    )
                )}
            </div>
            <div style={{ paddingLeft: 5 }}>
                {textForNumber && (
                    <span className={classTextForNumber}>{textForNumber}</span>
                )}
                <span className={styles.counterPoint}>
                    {numberToShowComponent ? (
                        numberToShowComponent
                    ) : numberToShow === 0 ? (
                        <TextContainer
                            label={String(numberToShow)}
                            textColor={'black'}
                            color={'#F1F1F1'}
                            iconSvg={textIcon}
                            customIconHeight={24}
                            customIconWidth={24}
                            rightSideIcon={true}
                            textSize={'h5'}
                        />
                    ) : numberToShow ? (
                        <TextContainer
                            label={String(numberToShow)}
                            textColor={'black'}
                            color={'#F1F1F1'}
                            iconSvg={textIcon}
                            customIconHeight={24}
                            customIconWidth={24}
                            rightSideIcon={true}
                            textSize={'h5'}
                        />
                    ) : extraImg && dataReady ? (
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
        </>
    )
}

export default ChartHeader
