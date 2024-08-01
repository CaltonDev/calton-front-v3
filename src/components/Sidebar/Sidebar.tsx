import React from 'react'
import styles from './Sidebar.module.scss'
import CaltonSelect from '../Select/Select'
import { useTranslation } from 'react-i18next'
import SidebarMenu from './SidebarMenu/SidebarMenu'
import { useDispatch, useSelector } from 'react-redux'
import { setCode } from '../../store/code/codeSlice'
import { resetFilters } from '../../store/filters/filtersSlice'
import ServiceWrapper from '../../helpers/ServiceWrapper'
import { showToast } from '../../store/toast/errorToastSlice'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import ListingService from '../../services/ListingService'
import { setPlatformType } from '../../store/settings/settingsSlice'

import { getBackgroundColor } from '../../utils/utils'
import { RootState } from '../../store/store'
function Sidebar() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const allFilters = useSelector(selectAllFilters)
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )
    const handlePlatformTypeChange = (e: any) => {
        const value = e?.value
        dispatch(setCode(getCodeFromPlatformType(value)))
        dispatch(setPlatformType(value))
        dispatch(resetFilters())
        if (value === 'listing') {
            checkNumberOfListings()
        }
        ServiceWrapper.wrapperLoadFilters(allFilters, dispatch, value, t)
    }

    const checkNumberOfListings = async () => {
        try {
            const res = await ListingService.getNumberOfListings()

            if (res?.data?.count === 0) {
                //todo: solve this error
                //history('./integrations')
            }
        } catch (error) {
            dispatch(
                showToast({
                    type: 2,
                    text: t('Numero di listings non trovato'),
                })
            )
            //history('./integrations')
            console.log(error)
        }
    }

    const selectOptions = [
        {
            value: 'reviews',
            label: t('Recensioni'),
            className: styles.menuItem,
        },
        {
            value: 'surveys',
            label: t('Sondaggi'),
            className: styles.menuItem,
        },
        {
            value: 'competitor',
            label: t('Competitor'),
            className: styles.menuItem,
        },
        {
            value: 'listing',
            label: t('Listing'),
            className: styles.menuItem,
        },
    ]

    const getCodeFromPlatformType = (type: string) => {
        let code: number[] = []

        if (type === 'reviews') {
            code = [0, 1, 2, 3]
        } else if (type === 'surveys') {
            code = [4]
        } else if (type === 'competitor') {
            code = [5]
        } else if (type === 'listing') {
            code = [6]
        }

        return code
    }

    return (
        <div
            className={styles.sidebarContainer}
            style={{ background: getBackgroundColor(platformType) }}
        >
            <CaltonSelect
                options={selectOptions}
                value={
                    selectOptions[
                        selectOptions?.findIndex(
                            (x) => x.value === platformType
                        )
                    ]
                }
                size={'small'}
                fontSize={'large'}
                customColor={getBackgroundColor(platformType)}
                onChange={handlePlatformTypeChange}
            />
            <div className={styles.divider} />
            <SidebarMenu />
        </div>
    )
}

export default Sidebar
