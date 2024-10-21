import classnames from 'classnames'
import { Collapse } from 'react-collapse'
import React, { useState } from 'react'
//import RctSectionLoader from '../RctSectionLoader/RctSectionLoader'
import DownloadIcon from '../DownloadIcon/DownloadIcon'
import styles from './CollapsableCard.module.scss'
import refresh from '../../assets/img/refresh.svg'
import HeaderGraph from '../HeaderGraph/HeaderGraph'
import { GrClose } from 'react-icons/gr'
import { AiOutlineMinus } from 'react-icons/ai'
import { CollapsableCardProps } from './CollapsableCard.interface'
import SynonymsChartTableView from '../SynonymsChart/SynonymsChartTableView/SynonymsCharTableView'

function CollapsableCard({
    headingCustomClasses,
    heading,
    colClasses,
    customClasses,
    collapsible,
    reloadable,
    closeable,
    downloadble,
    children,
    isBubble,
    widthIcon,
    isAnt,
    optionable,
    externalSourceRefresher,
    isBeta,
    onDownload,
    width,
}: CollapsableCardProps) {
    const [reload, setReload] = useState(false)
    const [collapse, setCollapse] = useState(true)
    const [close, setClose] = useState(false)
    const [downloading, setDownloading] = useState(false)
    const [option, setOption] = useState(false)

    const onCollapse = () => {
        setCollapse(!collapse)
    }
    const onReload = () => {
        setReload(true)
        setTimeout(() => {
            setReload(false)
        }, 1500)
    }
    const onDownloadInternal = () => {
        console.log('onDownload')
        setDownloading(true)
        onDownload ? onDownload() : console.log('nada')
        setTimeout(() => {
            setDownloading(false)
        }, 1800)
    }

    const onCloseSection = () => {
        setClose(true)
    }

    return (
        <div
            style={{ width: width ? width : '' }}
            className={classnames(colClasses ? colClasses : '', {
                'd-block': !collapse,
            })}
        >
            <div
                className={classnames(
                    `${styles.rctBlock} ${customClasses ? customClasses : ''}`,
                    { 'd-none': close }
                )}
            >
                {heading && (
                    <div
                        className={`${styles.rctBlockTitle} ${headingCustomClasses ? headingCustomClasses : ''}`}
                    >
                        <HeaderGraph
                            dataReady={true}
                            download={!downloadble}
                            title={heading}
                            isBubble={isBubble}
                            isAnt={isAnt}
                            optionable={optionable}
                            option={option}
                            setOption={setOption}
                            isBeta={isBeta}
                        />
                        {(collapsible ||
                            reloadable ||
                            closeable ||
                            downloadble ||
                            optionable) && (
                            <div className={styles.contextuaLink}>
                                {collapsible && (
                                    <a onClick={() => onCollapse()}>
                                        <AiOutlineMinus />
                                    </a>
                                )}
                                {reloadable && (
                                    <a onClick={() => onReload()}>
                                        <img
                                            width={25}
                                            alt={'refresh'}
                                            src={refresh}
                                        />
                                    </a>
                                )}
                                {downloadble && (
                                    <a onClick={() => onDownloadInternal()}>
                                        <DownloadIcon
                                            width={25}
                                            play={downloading}
                                        />
                                    </a>
                                )}
                                {closeable && (
                                    <a onClick={() => onCloseSection()}>
                                        {' '}
                                        <GrClose />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                )}
                <Collapse isOpened={collapse}>
                    <div className={styles.rctBlockContent}>
                        {!option ? (
                            children
                        ) : (
                            <SynonymsChartTableView
                                externalSourceRefresher={
                                    externalSourceRefresher &&
                                    externalSourceRefresher
                                }
                            />
                        )}
                    </div>
                </Collapse>
                {/*reload && <RctSectionLoader />*/}
            </div>
        </div>
    )
}

export default CollapsableCard
