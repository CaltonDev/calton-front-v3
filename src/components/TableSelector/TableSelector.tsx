import styles from './TableSelector.module.scss'
import { TableSelectorProps } from './TableSelector.interface'
import React, { HTMLProps, useEffect, useState } from 'react'
import Typography from '../Typography/Typography'
import { disabledColor } from '../../constants/constants'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import { AiOutlineMinus } from 'react-icons/ai'
import refresh from '../../assets/img/refresh.svg'
import DownloadIcon from '../DownloadIcon/DownloadIcon'
import { GrClose } from 'react-icons/gr'
import Table from '../Table/Table'
import _ from 'lodash'

const TableSelector = ({
    data = [],
    fullyLoaded = false,
    downloadble = false,
    onDownload,
}: TableSelectorProps) => {
    const [activeTable, setActiveTable] = useState(
        data?.length > 0 && data[0]?.key
    )
    const [downloading, setDownloading] = useState(false)

    const onDownloadInternal = () => {
        console.log('onDownload')
        setDownloading(true)
        onDownload && onDownload()
        setTimeout(() => {
            setDownloading(false)
        }, 1800)
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.leftItemContainer}>
                    {data?.map((obj) => {
                        return (
                            <div
                                key={obj?.key}
                                onClick={() => setActiveTable(obj?.key)}
                                className={
                                    obj?.key === activeTable
                                        ? styles.headerLabelContainer
                                        : styles.headerLabelContainerDisabled
                                }
                            >
                                {obj?.svg && (
                                    <SvgWrapper
                                        keySvg={obj.svg}
                                        color={
                                            obj?.key === activeTable
                                                ? 'secondary'
                                                : 'disabled'
                                        }
                                        customWidth={20}
                                        customHeight={20}
                                    />
                                )}
                                <Typography
                                    size={'bodyBig'}
                                    weight={'normal'}
                                    color={
                                        obj?.key === activeTable
                                            ? 'blue'
                                            : 'grey'
                                    }
                                >
                                    {obj?.label}
                                </Typography>
                            </div>
                        )
                    })}
                </div>
                {downloadble && (
                    <div className={styles.contextuaLink}>
                        {downloadble && (
                            <a onClick={() => onDownloadInternal()}>
                                <DownloadIcon width={25} play={downloading} />
                            </a>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.body}>
                <Table
                    data={
                        data.find((el) => el?.key === activeTable)?.data?.data
                    }
                    columnsData={
                        data.find((el) => el?.key === activeTable)?.data
                            ?.columns
                    }
                    fullyLoaded={true}
                />{' '}
            </div>
        </div>
    )
}

export default TableSelector
