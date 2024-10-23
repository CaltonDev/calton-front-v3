import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServiceWrapper from '../../../helpers/ServiceWrapper'
import { selectAllFilters } from '../../../store/selectors/selectorsSlice'
import { useTranslation } from 'react-i18next'
import PageContainer from '../../../components/PageComponents/PageContainer/PageContainer'
import PageHeader from '../../../components/PageComponents/PageHeader/PageHeader'
import { RootState } from '../../../store/store'
import styles from './HomeListing.module.scss'
import InfoCardViewer from '../../../components/InfoCardViewer/InfoCardViewer'
import TrackerCard from '../../../components/TrackerCard/TrackerCard'
import PageNavigator from '../../../components/PageNavigator/PageNavigator'
import { PaginationState } from '@tanstack/react-table'
import InfoCard from '../../../components/InfoCard/InfoCard'
import ListingService from '../../../services/ListingService'
import ListingCard from '../../../components/Cards/ListingCard/ListingCard'
import Tooltip from '../../../components/Tooltip/Tooltip'
import Typography from '../../../components/Typography/Typography'

function HomeListing() {
    const dispatch = useDispatch()
    const allFilters = useSelector(selectAllFilters)
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )
    const search = useSelector((state: RootState) => state.Search.wordSearched)

    const { t } = useTranslation()
    const listingStateFilter = useSelector(
        (state: RootState) => state.Filters.listingLocationState
    )
    const filteredListings = useSelector(
        (state: RootState) => state.Filters.selectedLocationListing
    )
    //TODO: check if this all locations is useful
    const allLocations = useSelector(
        (state: RootState) => state.SelectableFilters.data
    )

    const { selectedLocationListing } = useSelector(selectAllFilters)
    const [bulkEdit, setBulkEdit] = useState(false)
    const [selectAllListing, setSelectAllListing] = useState(false)
    const [bulkList, setBulkList] = useState([])
    const [bulkOperationType, setBulkOperationType] = useState('edit')
    useEffect(() => {
        ServiceWrapper.wrapperLoadFilters(allFilters, dispatch, platformType, t)
    }, [])

    const AiData = [
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
    ]

    const trackerData = [
        {
            label: t('Media tasso di completamento'),
            displayLabel: '15%',
            value: 200000,
            total: 15000,
        },
    ]
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20,
    })

    const changeElementsPerPage = (e: any) => {
        setPagination({
            pageIndex: 0,
            pageSize: e.value,
        })
    }

    const filterListingStateHelper = () => {
        const filteringObj: any = {
            toVerify: null,
            pendingVerification: null,
            isDuplicated: null,
            missedStoreCode: null,
        }

        const verified = listingStateFilter?.verified
        if (verified?.yes && verified?.no) {
            filteringObj.toVerify = null
        } else if (verified?.yes) {
            filteringObj.toVerify = false
        } else if (verified?.no) {
            filteringObj.toVerify = true
        }

        const pendingVerification = listingStateFilter?.pendingVerification

        if (pendingVerification?.yes && pendingVerification?.no) {
            filteringObj.pendingVerification = null
        } else if (pendingVerification?.yes) {
            filteringObj.pendingVerification = true
            filteringObj.toVerify = null
        } else if (pendingVerification?.no) {
            filteringObj.pendingVerification = false
        } else {
            filteringObj.pendingVerification = null
        }

        const isDuplicated = listingStateFilter?.isDuplicated

        if (isDuplicated?.yes && isDuplicated?.no) {
            filteringObj.isDuplicated = null
        } else if (isDuplicated?.yes) {
            filteringObj.isDuplicated = true
        } else if (isDuplicated?.no) {
            filteringObj.isDuplicated = false
        } else {
            filteringObj.isDuplicated = null
        }

        const missedStoreCode = listingStateFilter?.missedStoreCode

        if (missedStoreCode?.yes && missedStoreCode?.no) {
            filteringObj.missedStoreCode = null
        } else if (missedStoreCode?.yes) {
            filteringObj.missedStoreCode = true
        } else if (missedStoreCode?.no) {
            filteringObj.missedStoreCode = false
        } else {
            filteringObj.missedStoreCode = null
        }

        return filteringObj
    }

    const numberOfListings = ListingService.getNumberOfListings(
        allFilters?.selectedLocationListing,
        false,
        filterListingStateHelper()
    )?.data?.count

    const listings = ListingService.getListings(
        pagination.pageSize,
        pagination.pageIndex * pagination.pageSize,
        filteredListings,
        filterListingStateHelper()
    )?.data?.data

    const handleBulkEditBtn = (type: string) => {
        setBulkEdit(!bulkEdit)
        setBulkOperationType(type)
    }
    const dropdownData = [
        {
            label: t('Modifica'),
            labelColor: 'black',
            labelIcon: 'editIcon',
            onClickAction: () => handleBulkEditBtn('edit'),
        },
        {
            label: t('Elimina'),
            labelColor: 'red',
            labelIcon: 'trashIcon',
            onClickAction: () => handleBulkEditBtn('delete'),
        },
    ]

    const handleSelectAllListing = () => {
        if (selectAllListing) {
            setBulkList([])
            setSelectAllListing(false)
        } else {
            setSelectAllListing(!selectAllListing)
            //TODO: check if this all locations is useful
            //setBulkList(selectedLocationListing?.length === 0 ? allLocations : listings)

            setBulkList(listings)
        }
    }

    useEffect(() => {
        if (bulkList?.length < listings?.length) {
            setSelectAllListing(false)
        }
    }, [bulkList])

    const changePage = (direction: any) => {
        if (direction === 'next') {
            setPagination({
                pageIndex: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
            })
        } else if (direction === 'previous') {
            setPagination({
                pageIndex: pagination.pageIndex - 1,
                pageSize: pagination.pageSize,
            })
        } else {
            const number = Number(direction)
            if (
                number > 0 &&
                number <= Math.ceil(numberOfListings / pagination.pageSize)
            ) {
                setPagination({
                    pageIndex: number - 1,
                    pageSize: pagination.pageSize,
                })
            } else {
                setPagination({
                    pageIndex: 0,
                    pageSize: pagination.pageSize,
                })
            }
        }
    }

    return (
        <PageContainer>
            <PageHeader
                heading={t('Home')}
                subheading={true}
                bulkEdit={true}
                isOnBulkEdit={bulkEdit}
                setIsOnBulkEdit={setBulkEdit}
                dropdownData={dropdownData}
                selectAllListing={handleSelectAllListing}
                allSelected={selectAllListing}
                bulkOperationType={bulkOperationType}
                bulkBtnDisabled={bulkList?.length === 0}
                bulkList={bulkList}
            ></PageHeader>
            <div className={styles.container}>
                {!bulkEdit && (
                    <div className={styles.headerContainer}>
                        <InfoCardViewer data={AiData} customWidth={'45%'} />
                        <div className={styles.itemContainer}>
                            <InfoCard
                                value={64}
                                label={t('Totale punti vendita')}
                                icon={'puntiVenditaSvg'}
                                backgroundIconColor={'#E1F6FF'}
                            />
                        </div>
                        <div className={styles.itemContainer}>
                            <TrackerCard data={trackerData} maxHeight={true} />
                        </div>
                    </div>
                )}
                <div className={styles.navigatorRow}>
                    <div>
                        <PageNavigator
                            totalElements={numberOfListings}
                            currentPage={pagination.pageIndex}
                            pageElements={pagination.pageSize}
                            changeElementsPerPage={changeElementsPerPage}
                            changePage={changePage}
                        />
                    </div>
                </div>
                <div className={styles.reviewsContainer}>
                    {listings?.map((listing: any, idx: number) => {
                        return (
                            <ListingCard
                                isOnBulkEdit={bulkEdit}
                                key={idx}
                                index={idx}
                                listing={listing}
                                isSelected={bulkList?.find(
                                    (elm: any) =>
                                        elm?.idAccountLocationGbp ===
                                        listing?.idAccountLocationGbp
                                )}
                                bulkList={bulkList}
                                setBulkList={setBulkList}
                            />
                        )
                    })}
                </div>
            </div>
        </PageContainer>
    )
}

export default HomeListing
