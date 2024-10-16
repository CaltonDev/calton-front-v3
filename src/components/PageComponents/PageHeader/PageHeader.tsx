import React, { useEffect, useState } from 'react'
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
import Button from '../../Button/Button'
import Dropdown from '../../Dropdown/Dropdown'
import Checkbox from '../../Checkbox/Checkbox'
import ListingBulkEditModal from '../../Modals/ListingBulkEditModal/ListingBulkEditModal'
import ListingService from '../../../services/ListingService'
import ServiceWrapper from '../../../helpers/ServiceWrapper'
import ListingBulkDeleteModal from '../../Modals/ListingBulkDeleteModal/ListingBulkDeleteModal'

function PageHeader({
    heading,
    subheading,
    previousPage,
    setPreviousState,
    arrowBackUrl,
    showArrowBack = false,
    hideFilters = false,
    bulkEdit = false,
    dropdownData,
    isOnBulkEdit = false,
    setIsOnBulkEdit,
    selectAllListing,
    allSelected = false,
    bulkOperationType = 'edit',
    bulkBtnDisabled = false,
    bulkList = [],
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
    const allFilters = useSelector(selectAllFilters)
    const [openBulkEditModal, setOpenBulkEditModal] = useState(false)
    const [openBulkDeleteModal, setOpenBulkDeleteModal] = useState(false)

    const handleDeleteBulk = async () => {
        try {
            const formatted_listings = bulkList?.map((item: any) => {
                return item?.idAccountLocationGbp
            })
            await ListingService.deleteListing(formatted_listings)
            //dispatch(showToast({ type: 0, text: t('Location eliminata con successo') }));
            //dispatch(resetFiltersByPayload("selectedLocation"))
            await ServiceWrapper.wrapperLoadFilters(
                allFilters,
                dispatch,
                platformType,
                t
            )
            if (setIsOnBulkEdit) {
                setIsOnBulkEdit(false)
            }
        } catch (e) {
            console.log('E: ', e)
        }
        setOpenBulkDeleteModal(false)
    }

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

    const handleBulkEdit = () => {
        if (bulkOperationType === 'delete') {
            setOpenBulkDeleteModal(true)
        } else {
            setOpenBulkEditModal(true)
        }
    }
    return (
        <div style={{ marginBottom: '1.875rem' }}>
            <ListingBulkEditModal
                setIsOpen={setOpenBulkEditModal}
                isOpen={openBulkEditModal}
                labels={bulkList}
                label={t('Seleziona la location da modificare')}
            />
            <ListingBulkDeleteModal
                setIsOpen={setOpenBulkDeleteModal}
                isOpen={openBulkDeleteModal}
                textDelete={
                    t('Sicuro di voler eliminare questi listing') + ': '
                }
                textBold={bulkList?.length}
                onConfirm={handleDeleteBulk}
                question={true}
            />
            <div className={styles.containerColumn}>
                {!hideFilters && subheading && (
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
                        <div
                            onClick={handleHeadingClick}
                            className={styles.headingContainer}
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
                            <Typography size={'h1'} weight={'bold'}>
                                {t(heading)}
                            </Typography>
                            {!(
                                window.location.pathname.includes(
                                    'locations'
                                ) ||
                                window.location.pathname.includes('fonti') ||
                                window.location.pathname.includes(
                                    'integrazioniOnboarding'
                                ) ||
                                window.location.pathname.includes(
                                    'integrations'
                                ) ||
                                window.location.pathname.includes(
                                    'chooseLocations'
                                ) ||
                                window.location.pathname.includes(
                                    'AddCompetitorsSource'
                                ) ||
                                window.location.pathname.includes('products')
                            ) &&
                                !hideFilters &&
                                !isOnBulkEdit && (
                                    <div id={'test'}>
                                        <FiltersSummaryContainer
                                            filter={getConfigFilter(filters, t)}
                                        />
                                    </div>
                                )}
                        </div>
                        {isOnBulkEdit && (
                            <div className={styles.bulkEditBtnContainer}>
                                <Checkbox
                                    checked={allSelected}
                                    color={'shadow'}
                                    title={t('Seleziona tutto')}
                                    onClick={
                                        selectAllListing && selectAllListing
                                    }
                                />
                                <div className={styles.btnContainer}>
                                    <Button
                                        variant={'outline'}
                                        size={'small'}
                                        onClick={() =>
                                            setIsOnBulkEdit &&
                                            setIsOnBulkEdit(false)
                                        }
                                    >
                                        {t('Annulla')}
                                    </Button>
                                    <Button
                                        disabled={bulkBtnDisabled}
                                        variant={'solid'}
                                        size={'small'}
                                        customColor={
                                            bulkOperationType === 'delete'
                                                ? '#FF1654'
                                                : ''
                                        }
                                        customTextColor={
                                            bulkOperationType === 'delete'
                                                ? '#FFD3DF'
                                                : ''
                                        }
                                        onClick={handleBulkEdit}
                                    >
                                        {bulkOperationType === 'edit'
                                            ? t('Modifica')
                                            : t('Elimina')}
                                    </Button>
                                </div>
                            </div>
                        )}
                        {bulkEdit && !isOnBulkEdit && (
                            <div className={styles.btnContainer}>
                                <Dropdown
                                    isButton={true}
                                    dropdownData={dropdownData}
                                    btnTitle={t('Operazioni in bulk')}
                                />
                                <Button variant={'solid'} size={'small'}>
                                    {t('Aggiungi locale')}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PageHeader
