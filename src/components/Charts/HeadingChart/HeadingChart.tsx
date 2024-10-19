import styles from './HeadingChart.module.scss'
//todo: add svg
// import DownloadIcon from '../../../../components/DownloadIcon/DownloadIcon'
import React, { useState } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { saveAs } from 'file-saver'
import { HeadingChartProps } from './HeadingChart.interface'

function HeadingChart({
    title,
    download,
    loading,
    isAnt,
    width,
    isInfoTooltip,
    infoTooltip,
    widthIcon = 20,
    optionable,
}: HeadingChartProps) {
    const [downloading, setDownloading] = useState(false)

    const onDownload = () => {
        setDownloading(true)
        let canvasSave: any
        if (isAnt) {
            const divElement = document.getElementById(title)
            if (divElement) canvasSave = divElement.querySelector('canvas')
        } else {
            canvasSave = document.getElementById(title)
        }

        try {
            if (canvasSave)
                canvasSave.toBlob(function (blob: any) {
                    saveAs(blob, title + '.png')
                })
        } catch (e) {}
        setTimeout(() => {
            setDownloading(false)
        }, 1800)
    }

    return (
        <div style={width ? { width } : {}} className={styles.wrapperDiv}>
            <div className={styles.headingDiv}>
                <h3 className={styles.heading}>{title}</h3>
                {isInfoTooltip ? (
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
                            <InfoCircleOutlined className={styles.infoIcon} />
                        </Tooltip>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {!loading && download && (
                <a onClick={() => onDownload()}>
                    {/*
                        <DownloadIcon
                            width={widthIcon}
                            play={downloading}
                            optionable={optionable}
                        />*/}
                </a>
            )}
        </div>
    )
}

export default HeadingChart
