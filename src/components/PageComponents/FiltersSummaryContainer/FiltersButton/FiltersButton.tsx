import React from 'react'
import styles from './FiltersButton.module.scss'
import {
    setSelectedFilter,
    setSidebar,
} from '../../../../store/settings/settingsSlice'
import { useDispatch } from 'react-redux'
import { resetFiltersByPayload } from '../../../../store/filters/filtersSlice'
import { Tooltip } from 'antd'
import { FiltersButtonProps } from './FiltersButton.interface'
import SvgWrapper from '../../../SvgWrapper/SvgWrapper'

function FiltersButton({
    title,
    showCancel,
    keyUpdate,
    isMore,
    filter,
    valueExp,
}: FiltersButtonProps) {
    const dispatch = useDispatch()

    return (
        <Tooltip
            title={
                valueExp && Array.isArray(valueExp) ? (
                    valueExp.map((elm) => elm)
                ) : valueExp ? (
                    <span>{valueExp}</span>
                ) : (
                    ''
                )
            }
        >
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
                <span className={styles.containerTitle}>{title}</span>
                {showCancel && !isMore && (
                    <SvgWrapper
                        isClickable={true}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (keyUpdate) {
                                dispatch(resetFiltersByPayload(keyUpdate))
                            }
                        }}
                        size={'small'}
                        keySvg={'lockClosed.svg'}
                    />
                )}
            </div>
        </Tooltip>
    )
}

export default FiltersButton
