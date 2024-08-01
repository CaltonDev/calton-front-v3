import React, { useEffect } from 'react'
import { PageHeaderProps } from './PageHeader.interface'
import styles from './PageHeader.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectAllFilters } from '../../../store/selectors/selectorsSlice'
import { setStateSelect } from '../../../store/filters/filtersSlice'
import { useTranslation } from 'react-i18next'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import moment from 'moment'
import { getConfigFilter } from '../../../utils/filterHelpers'
import FiltersSummaryContainer from '../FiltersSummaryContainer/FiltersSummaryContainer'
import Typography from '../../Typography/Typography'
import { RootState } from '../../../store/store'

function PageHeader({
    heading,
    subheading,
    previousPage,
    setPreviousState,
    arrowBackUrl,
    showArrowBack = false,
}: PageHeaderProps) {
    const dispatch = useDispatch()
    const history = useNavigate()
    const filters = useSelector(selectAllFilters)
    const { startDate, endDate, labelDate, groupby } =
        useSelector(selectAllFilters)
    const { t } = useTranslation()
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )

    useEffect(() => {
        if (
            labelDate &&
            (labelDate.toLowerCase().includes('corrente') ||
                labelDate.toLowerCase().includes('sempre'))
        ) {
            const intervalDate = moment().diff(moment(endDate), 'days')
            if (intervalDate > 0) {
                let tmpStartDate
                const tmpEndDate = moment().format('YYYY-MM-DD')
                if (labelDate.toLowerCase().includes('sempre')) {
                    tmpStartDate = startDate
                } else {
                    tmpStartDate = moment(startDate)
                        .add(intervalDate, 'days')
                        .format('YYYY-MM-DD')
                }

                const res = {
                    startDate: tmpStartDate,
                    endDate: tmpEndDate,
                }
                const payload = {
                    type: 'time',
                    value: res,
                    optional: groupby,
                    labelDate: labelDate,
                }
                dispatch(setStateSelect(payload))
            }
        }
    }, [])

    const handleHeadingClick = () => {
        if (previousPage) {
            if (setPreviousState) {
                setPreviousState(false)
            }
        }
    }

    return (
        <div style={{ marginBottom: '1.875rem' }}>
            <div className={styles.containerColumn}>
                {subheading && (
                    <div className={styles.containerBreadcrumb}>
                        <Typography
                            size={'bodySmall'}
                            weight={'light'}
                            color={'grey'}
                        >
                            {t(platformType) + ' > ' + t(heading)}
                        </Typography>
                    </div>
                )}
                {heading && (
                    <div className={styles.headingContainer}>
                        <div onClick={handleHeadingClick}>
                            {showArrowBack && (
                                <div>
                                    <span
                                        style={{
                                            paddingTop: '5px',
                                            lineHeight: 0,
                                            verticalAlign: 'middle',
                                            marginRight: '8px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                            history(
                                                arrowBackUrl ? arrowBackUrl : ''
                                            )
                                        }
                                    >
                                        <SvgWrapper
                                            size={'small'}
                                            color={'black'}
                                            keySvg={'arrowBack'}
                                        />
                                    </span>
                                </div>
                            )}
                            <Typography size={'h1'} weight={'bold'}>
                                {t(heading)}
                            </Typography>
                        </div>
                        {!(
                            window.location.pathname.includes('locations') ||
                            window.location.pathname.includes('fonti') ||
                            window.location.pathname.includes(
                                'integrazioniOnboarding'
                            ) ||
                            window.location.pathname.includes('integrations') ||
                            window.location.pathname.includes(
                                'chooseLocations'
                            ) ||
                            window.location.pathname.includes(
                                'AddCompetitorsSource'
                            ) ||
                            window.location.pathname.includes('products')
                        ) && (
                            <div id={'test'}>
                                <FiltersSummaryContainer
                                    filter={getConfigFilter(filters, t)}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PageHeader
