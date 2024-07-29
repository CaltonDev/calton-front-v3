import React, { useEffect } from 'react'
import { PageHeaderProps } from './PageHeader.interface'
import styles from './PageContainer.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectAllFilters } from '../../../store/selectors/selectorsSlice'
import { setStateSelect } from '../../../store/filters/filtersSlice'
import { useTranslation } from 'react-i18next'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import moment from 'moment'
import { getConfigFilter } from '../../../utils/filterHelpers'
import FiltersSummaryContainer from '../FiltersSummaryContainer/FiltersSummaryContainer'

function PageHeader({
    heading,
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
        <div
            className="page-title d-flex justify-content-between align-items-center"
            style={{ marginBottom: '1.875rem' }}
        >
            <div className={styles.containerColumn}>
                {heading && (
                    <div
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={handleHeadingClick}
                    >
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
                        <b
                            style={{
                                color: '#321D48',
                                fontSize: '22px',
                                fontWeight: 'bold',
                                fontFamily:
                                    'Montserrat, Heebo, sans-serif !important;',
                                paddingRight: '10px',
                            }}
                        >
                            {t(heading)}
                        </b>
                    </div>
                )}
                {!(
                    window.location.pathname.includes('locations') ||
                    window.location.pathname.includes('fonti') ||
                    window.location.pathname.includes(
                        'integrazioniOnboarding'
                    ) ||
                    window.location.pathname.includes('integrations') ||
                    window.location.pathname.includes('chooseLocations') ||
                    window.location.pathname.includes('AddCompetitorsSource') ||
                    window.location.pathname.includes('products')
                ) && (
                    <div
                        id={'test'}
                        style={{
                            marginTop: 10,
                            marginBottom: 30,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <FiltersSummaryContainer
                            filter={getConfigFilter(filters, t)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PageHeader
