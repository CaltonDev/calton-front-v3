import React, { useEffect, useState } from 'react'
import styles from './FiltersButton.module.scss'
import {
    setSelectedFilter,
    setSidebar,
} from '../../../../store/settings/settingsSlice'
import { useDispatch } from 'react-redux'
import { resetFiltersByPayload } from '../../../../store/filters/filtersSlice'
import { FiltersButtonProps } from './FiltersButton.interface'
import SvgWrapper from '../../../SvgWrapper/SvgWrapper'
import Typography from '../../../Typography/Typography'
import { useTranslation } from 'react-i18next'

function FiltersButton({
    title,
    showCancel,
    keyUpdate,
    isMore,
    filter,
    value,
    setShowAllFilters,
    showAllFilters,
}: FiltersButtonProps) {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [isExpaned, setIsExpanded] = useState(false)

    return (
        <div
            style={{ background: isMore ? '#AFB3FF' : '' }}
            className={styles.container}
            onClick={() => {
                if (
                    keyUpdate === 'feedbackFilters' &&
                    window.location.pathname.includes('grafo')
                ) {
                    return
                }
                if (filter != null) {
                    dispatch(setSelectedFilter(filter))
                }
                dispatch(setSidebar(true))
            }}
        >
            <div className={styles.titleContainer}>
                <div className={styles.leftTitleItem}>
                    {!isMore && (
                        <SvgWrapper
                            size={'small'}
                            keySvg={'location.svg'}
                            color={'secondary'}
                        />
                    )}
                    <Typography
                        size={'bodyXSmall'}
                        weight={'normal'}
                        color={'blue'}
                    >
                        {isMore && !showAllFilters
                            ? t('Visualizza altri')
                            : isMore && showAllFilters
                              ? t('Riduci filtri')
                              : title}
                    </Typography>
                </div>
                <SvgWrapper
                    size={'small'}
                    keySvg={
                        isMore && !showAllFilters
                            ? 'arrowForward'
                            : isMore && showAllFilters
                              ? 'arrowBack'
                              : 'close.svg'
                    }
                    color={'secondary'}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (setShowAllFilters) {
                            setShowAllFilters(!showAllFilters)
                        } else {
                            if (keyUpdate) {
                                dispatch(resetFiltersByPayload(keyUpdate))
                            }
                        }
                    }}
                />
            </div>
            <div className={styles.textContainer}>
                <Typography
                    size={'bodyXSmall'}
                    weight={'light'}
                    color={'lightGrey'}
                >
                    {isMore && !showAllFilters
                        ? title
                        : isMore && showAllFilters
                          ? ''
                          : isExpaned && Array.isArray(value)
                            ? value?.join(', ')
                            : value
                              ? value?.length + ' ' + t('selezionati')
                              : ''}
                </Typography>

                {!isMore && (
                    <SvgWrapper
                        size={'small'}
                        keySvg={'expand.svg'}
                        color={'primary'}
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsExpanded(!isExpaned)
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default FiltersButton
