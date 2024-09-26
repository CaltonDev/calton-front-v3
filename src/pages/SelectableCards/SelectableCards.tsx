import React, { forwardRef, useEffect, useState } from 'react'
import styles from './SelectableCards.module.scss'
import Button from '../../components/Button/Button'
import { Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ClickableCard from '../../components/CustomClickableCard/CustomClickableCard'
import ReviewService from '../../services/ReviewService'
import { showToast } from '../../store/toast/errorToastSlice'
import { matchSorter } from 'match-sorter'
import ScraperService from '../../services/ScraperService'
import CustomFilterService from '../../services/CustomFilterService'
import { setFilters } from '../../store/settings/settingsSlice'
import ServiceWrapper from '../../helpers/ServiceWrapper'
//import LoaderChart from '../../components/CardInsights/LoaderChart/LoaderChart'
import ListingService from '../../services/ListingService'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { IS_BETA, IS_DEMO } from '../../constants/environment'
import CustomAutocomplete from '../../components/CustomAutocomplete/CustomAutocomplete'
import AntDropdown from '../../components/AntDropdown/AntDropdown'
import { RightOutlined } from '@ant-design/icons'
//import ModalConfirmMessage from 'Components/ModalConfirmMessage/ModalConfirmMessage'
import { useVirtualizer } from '@tanstack/react-virtual'
import { resetSearch } from '../../store/search/search'
import Checkbox from '../../components/Checkbox/Checkbox'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import {
    SelectableCardsItemWrapperProps,
    SelectableCardsProps,
} from './SelectableCards.interface'
import { RootState } from '../../store/store'

const gridComponents = {
    List: forwardRef(
        (
            { style, children, ...props }: SelectableCardsItemWrapperProps,
            ref: React.ForwardedRef<any>
        ) => (
            <div
                ref={ref}
                {...props}
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    ...style,
                }}
            >
                {children}
            </div>
        )
    ),
    Item: ({ children, ...props }: SelectableCardsItemWrapperProps) => (
        <div
            {...props}
            style={{
                padding: '0.5rem',
                display: 'flex',
                flex: 'none',
                alignContent: 'stretch',
                boxSizing: 'border-box',
            }}
        >
            {children}
        </div>
    ),
}

gridComponents.List.displayName = 'gridComponentDisplayName'

const ItemWrapper = ({
    children,
    ...props
}: SelectableCardsItemWrapperProps) => (
    <div
        {...props}
        style={{
            display: 'flex',
            flex: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap',
        }}
    >
        {children}
    </div>
)

const SelectableCards = ({ code, callback }: SelectableCardsProps) => {
    const [data, setData] = useState<any[]>([])
    const [checkedAll, setCheckedAll] = useState(false)
    const [selectedCardIndex, setSelectedCardIndex] = useState<any[]>([])
    const search = useSelector(
        (state: RootState) => state.Search.selectedLocationSearched
    )
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useNavigate()
    const { t } = useTranslation()
    const [internalCode, setCode] = useState<string>('google')
    const [codeToken, setCodeToken] = useState<string | null>(null)
    const [fromIntegration, setFromIntegration] = useState(false)
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )
    const [formattedCards, setFormattedCards] = useState<any[]>([])
    //TODO: handle data ready in different way thx to react query
    const [accountDataReady, setAccountDataReady] = useState(true)
    const [selectedAccount, setSelectAccount] = useState<any>(null)

    const availableAccountsList = ListingService.getAllAccounts()?.data
    const [disableShowMore, setDisableShowMore] = useState(true)
    const [nextPageToken, setNextPageToken] = useState(null)
    const [checkBoxType, setCheckBoxType] = useState(1)
    const [dataReady, setDataReady] = useState(false)
    const [allCardsSelected, setAllCardsSelected] = useState(false)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const IS_LISTING = platformType === 'listing'

    const allFilters = useSelector(selectAllFilters)

    const parentRef = React.useRef(null)

    const rowVirtualizer = useVirtualizer({
        horizontal: true,
        count: formattedCards?.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 1,
        overscan: 5,
    })

    const items = [
        {
            key: '1',
            label: (
                <div
                    onClick={() => {
                        resetSelectedData()
                        setCheckBoxType(1)
                    }}
                >
                    <span>{t('Seleziona tutte le card visibili')}</span>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div
                    onClick={() => {
                        resetSelectedData()
                        setCheckBoxType(2)
                    }}
                >
                    <span>
                        {t("Seleziona tutte le location per l'account")}
                    </span>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div
                    onClick={() => {
                        resetSelectedData()
                        setCheckBoxType(3)
                    }}
                >
                    <span>{t('Seleziona tutte le location')}</span>
                </div>
            ),
        },
    ]

    const displayLabelObj = [
        {
            key: 1,
            label: t('Schede visibili'),
        },
        {
            key: 2,
            label: t('Schede account'),
        },
        {
            key: 3,
            label: t('Tutte le schede'),
        },
    ]

    useEffect(() => {
        const values =
            search !== ''
                ? matchSorter(formattedCards, search ? search : '', {
                      keys: [
                          'title',
                          'websiteUri',
                          'formatted_address',
                          'storeCode',
                      ],
                  })
                : data
        setFormattedCards(values)
    }, [search])

    //TODO:  remove
    /*useEffect(() => {
        if (internalCode === 'google') {
            fetchAllAccounts()
        }
    }, [internalCode])*/

    useEffect(() => {
        dispatch(resetSearch())
        if (code) {
            setFromIntegration(true)
        }
        // prod
        const query = new URLSearchParams(window.location.search)

        const codeUrl = query.get('code')
        if (codeUrl && codeUrl?.trim() !== '') {
            setCode('trustpilot')
            setCodeToken(codeUrl)
        } else {
            //TODO: check what's wrong with this
            //setCode(location?.state?.code ? location?.state?.code : code)
        }
        if (
            (IS_DEMO || IS_BETA) &&
            !codeUrl &&
            !location?.state?.code &&
            !code
        ) {
            setCode('google')
        }
    }, [])

    useEffect(() => {
        if (internalCode === 'google' && selectedAccount) {
            getAllgoogleLocation(true)
        } else if (internalCode === 'facebook' && !IS_LISTING) {
            getAllFacebookPages()
        } else if (internalCode === 'integrations' && !IS_LISTING) {
            console.log('integrations')
        } else if (internalCode === 'trustpilot' && !IS_LISTING) {
            loginTrustpilot()
        }
    }, [internalCode, selectedAccount])

    const loginTrustpilot = async () => {
        const body = { code: codeToken }
        try {
            await ScraperService.loginTrustpilot(body)
            dispatch(
                showToast({
                    type: 0,
                    text: t('Login effettuato con successo!'),
                })
            )
            history('/fonti')
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (search) {
            setFormattedCards(formattedCards)
        } else {
            setFormattedCards(data)
        }
    }, [checkedAll])

    const getAllgoogleLocation = async (accountChanged = false) => {
        setDisableShowMore(true)

        const initialData = accountChanged ? [] : [...data]
        const loaderList = new Array(3).fill({ type: 'loader' })
        setData([...initialData, ...loaderList])
        setFormattedCards([...initialData, ...loaderList])

        try {
            const service = IS_LISTING ? ListingService : ReviewService
            const response = await service.getAllLocations(
                selectedAccount ? selectedAccount : [],
                nextPageToken
            )
            const locations = response?.locations || []
            const newToken = response?.nextPageToken

            const newData = initialData.concat(locations)

            const currentData = newData?.filter((obj) => obj?.type !== 'loader')
            setData(currentData)
            setData(newData)
            setFormattedCards(currentData)
            setNextPageToken(newToken)
            setDisableShowMore(!newToken)

            rowVirtualizer.scrollToIndex(newData.length - 1)
        } catch (e) {
            const currentData = initialData?.filter(
                (obj) => obj?.type !== 'loader'
            )
            setData(currentData)
            setFormattedCards(currentData)
            console.error('Error fetching locations:', e)
            // Consider setting error states here, if necessary for your application
        }

        setDataReady(true)
    }

    const getAllFacebookPages = async () => {
        try {
            const response = await ReviewService.getAllPages()
            setData(response.data.pages)
            setFormattedCards(response.data.pages)
            setDataReady(true)
        } catch (e) {
            console.log('E: ', e)
        }
    }

    const onSubmit = () => {
        if (internalCode === 'google') {
            onSubmitGoogle()
        } else if (internalCode === 'facebook') {
            onSubmitGeneral()
        } else if (internalCode === 'tripadvisor') {
            onSubmitGeneral()
        }
    }

    const onSubmitGoogle = async () => {
        //let selectedData = formattedCards.filter((el) => !el.metadata?.duplicateLocation && selectedCardIndex.indexOf(el.metadata?.placeId) > -1)
        const selectedData = formattedCards.filter(
            (el: any) =>
                !el.metadata?.duplicateLocation &&
                selectedCardIndex.indexOf(el?.idAccountLocationGbp) > -1
        )

        try {
            if (IS_LISTING) {
                if (checkBoxType === 1) {
                    await ListingService.setAllLocations(selectedData)
                } else if (checkBoxType === 2) {
                    await ListingService.setAllLocations(
                        undefined,
                        [selectedAccount],
                        true
                    )
                } else {
                    await ListingService.setAllLocations(undefined, [], true)
                }
                dispatch(
                    showToast({
                        type: 0,
                        text: t('Locations selezionate con successo!'),
                    })
                )
                history('/home')
            } else {
                if (checkBoxType === 1) {
                    await ReviewService.getReviewsFromLocation(selectedData)
                } else if (checkBoxType === 2) {
                    await ReviewService.getReviewsFromLocation(
                        undefined,
                        [selectedAccount],
                        true
                    )
                } else {
                    await ReviewService.getReviewsFromLocation(
                        undefined,
                        [],
                        true
                    )
                }
                dispatch(
                    showToast({
                        type: 0,
                        text: t('Locations selezionate con successo!'),
                    })
                )
                if (fromIntegration) {
                    callback(internalCode)
                } else {
                    history('/fonti')
                }
            }
        } catch (e) {}
        try {
            const resp = await CustomFilterService.getPopulateNewFilter()
            dispatch(setFilters(resp.data.data))
        } catch (e) {}
        ServiceWrapper.wrapperLoadFilters(allFilters, dispatch, platformType, t)
    }

    const onSubmitGeneral = async () => {
        let selectedData = []
        if (internalCode === 'facebook') {
            selectedData = formattedCards.filter(
                (el) => selectedCardIndex.indexOf(el.access_token) > -1
            )
            try {
                await ReviewService.getPagesForReviews(selectedData)
                dispatch(
                    showToast({
                        type: 0,
                        text: t('Locations selezionate con successo!'),
                    })
                )
                if (fromIntegration) {
                    callback(internalCode)
                } else {
                    history('/fonti')
                }
            } catch (e) {}
        }
        try {
            const resp = await CustomFilterService.getPopulateNewFilter()
            dispatch(setFilters(resp.data.data))
        } catch (e) {}
        ServiceWrapper.wrapperLoadFilters(allFilters, dispatch, platformType, t)
    }

    const handleChangeCardSelection = () => {
        setCheckBoxType(1)
        setSelectedCardIndex([])
        setAllCardsSelected(false)
        //set all visibile cards as selected
        const cardList: any[] = []

        formattedCards.forEach((item) => {
            if (item?.idAccountLocationGbp) {
                cardList.push(item?.idAccountLocationGbp)
            }
        })

        setSelectedCardIndex(cardList)
    }

    const selectCard = (id: number) => {
        if (allCardsSelected) {
            setOpenConfirmModal(true)
        } else {
            const cardList = [...selectedCardIndex]
            const index = cardList.indexOf(id)

            if (index !== -1) {
                if (checkedAll) {
                    setCheckedAll(false)
                }
                cardList.splice(index, 1)
            } else {
                if (cardList.length + 1 === data.length) {
                    setCheckedAll(true)
                }
                if (cardList.length + 1 !== data.length && checkedAll) {
                    setCheckedAll(false)
                }
                cardList.push(id)
            }
            setSelectedCardIndex(cardList)
        }
    }

    const selectAllCards = () => {
        setCheckedAll(!checkedAll)
        if (internalCode === 'google') {
            if (checkBoxType === 1) {
                if (!checkedAll) {
                    const cardList: any[] = []
                    formattedCards.forEach((item) => {
                        if (item?.idAccountLocationGbp) {
                            cardList.push(item?.idAccountLocationGbp)
                        }
                    })
                    setSelectedCardIndex(cardList)
                } else {
                    setSelectedCardIndex([])
                }
            } else {
                if (!checkedAll) {
                    setAllCardsSelected(true)
                } else {
                    setAllCardsSelected(false)
                }
            }
        } else if (internalCode === 'facebook') {
            if (checkBoxType === 1) {
                if (!checkedAll) {
                    const cardList: any[] = []
                    formattedCards.forEach((item) => {
                        if (item?.access_token) {
                            cardList.push(item?.access_token)
                        }
                    })
                    setSelectedCardIndex(cardList)
                } else {
                    setSelectedCardIndex([])
                }
            } else {
                if (!checkedAll) {
                    setAllCardsSelected(true)
                } else {
                    setAllCardsSelected(false)
                }
            }
        }
    }

    const handleSelectedAccount = (account: any) => {
        console.log({ account })
        setSelectAccount(account)
    }

    //TODO: remove
    /*
    const fetchAllAccounts = async () => {

        setAccountDataReady(false)
        try {
            const response = await ListingService.getAllAccounts()
            console.log('REsp: ', response)
            //const accountList = response?.accounts
            accountList.forEach((account: any) => {
                account.translatedType = t(account?.type)
            })

            //setAvailableAccountsList(accountList)
            setSelectAccount(accountList[0])
        } catch (e) {
            if (IS_LISTING)
                dispatch(showToast({ type: 2, text: t('Listing non Trovato') }))
        }
        setAccountDataReady(true)
    }*/

    const handleShowMore = () => {
        getAllgoogleLocation(false)
    }

    const resetSelectedData = () => {
        setCheckedAll(false)
        setSelectedCardIndex([])
        setAllCardsSelected(false)
    }

    const handleSelectCheckBox = () => {
        selectAllCards()
    }

    return (
        <PageContainer
        //isGrey={fromIntegration}
        //customStyle={{ minHeight: 'unset' }}
        >
            <div className={styles.spacerHorizontal}>
                {!fromIntegration && (
                    <PageHeader heading={t('Scegli location')} />
                )}
                {/*<ModalConfirmMessage
                    openModal={openConfirmModal}
                    setOpenModal={setOpenConfirmModal}
                    title={t('Attenzione')}
                    label={t(
                        'Deselezionando una scheda, verranno selezionato solamente le schede visibili'
                    )}
                    confirmAction={handleChangeCardSelection}
                />*/}
                <div className={styles.accountDataContainer}>
                    {!accountDataReady ? (
                        <div style={{ width: '40%' }}>
                            {/*<LoaderChart type={'singleField'} />*/}
                        </div>
                    ) : internalCode === 'google' ? (
                        <div style={{ width: '40%' }}>
                            <span className={styles.label}>
                                {t('Seleziona account')}
                            </span>
                            <CustomAutocomplete
                                name={'listingAccount'}
                                label={
                                    selectedAccount
                                        ? selectedAccount?.accountName
                                        : t("Seleziona l'account")
                                }
                                placeholderInput={
                                    t('Cerca') +
                                    ' ' +
                                    t('account').toLowerCase()
                                }
                                primary={'accountName'}
                                secondary={'translatedType'}
                                labels={availableAccountsList?.accounts}
                                type={'core'}
                                handleChange={(acc) =>
                                    handleSelectedAccount(acc)
                                }
                                customCheckEquality={['name', 'name']}
                                //classes={styles.customAutocomplete}
                                onlyWrapper={true}
                                multiple={false}
                                defaultValue={selectedAccount}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                    {internalCode === 'google' && (
                        <div className="page-title d-flex justify-content-between align-items-center">
                            <div style={{ marginTop: 20, display: 'flex' }}>
                                <Checkbox
                                    checked={checkedAll}
                                    onClick={handleSelectCheckBox}
                                />
                                {/*<AntDropdown
                                    items={{ items }}
                                    trigger={['click']}
                                    placement="bottomRight"
                                    arrow={{
                                        pointAtCenter: false,
                                    }}
                                >
                                    <div style={{ display: 'flex' }}>
                                        <span
                                            style={{
                                                fontWeight: 700,
                                                margin: 0,
                                            }}
                                        >
                                            {t('Seleziona Tutto') + ' '}
                                        </span>
                                        <span
                                            style={{
                                                marginLeft: 5,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {' - ' +
                                                displayLabelObj?.find((obj) => {
                                                    return (
                                                        obj.key === checkBoxType
                                                    )
                                                })?.label}
                                        </span>
                                        <RightOutlined
                                            style={{ verticalAlign: 'middle' }}
                                        />
                                    </div>
                                </AntDropdown>*/}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div
                ref={parentRef}
                className="List"
                style={
                    !dataReady
                        ? {
                              width: '100%',
                              paddingLeft: 20,
                          }
                        : {
                              height: `350px`,
                              width: `100%`,
                              overflow: 'auto',
                          }
                }
            >
                <div
                    style={{
                        height: '350px',
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    {dataReady ? (
                        rowVirtualizer
                            .getVirtualItems()
                            .map((virtualRow, index) => (
                                <div key={virtualRow.key}>
                                    {formattedCards[index]?.type ===
                                    'loader' ? (
                                        <div style={{ width: '100%' }}>
                                            {/* <LoaderChart
                                                type={'reviews'}
                                                reviewType={
                                                    'integrationLocation'
                                                }
                                                isSingle={true}
                                            />*/}
                                        </div>
                                    ) : (
                                        <ItemWrapper>
                                            {internalCode === 'google' ? (
                                                <ClickableCard
                                                    //index={formattedCards[index]?.metadata?.placeId}
                                                    index={
                                                        formattedCards[index]
                                                            ?.idAccountLocationGbp
                                                    }
                                                    selectedCardIndex={
                                                        selectedCardIndex
                                                    }
                                                    //hiddenField={formattedCards[index]?.metadata?.duplicateLocation ? null : formattedCards[index]?.metadata?.placeId}
                                                    hiddenField={
                                                        formattedCards[index]
                                                            ?.metadata
                                                            ?.duplicateLocation
                                                            ? null
                                                            : formattedCards[
                                                                  index
                                                              ]
                                                                  ?.idAccountLocationGbp
                                                    }
                                                    heading={
                                                        formattedCards[index]
                                                            ?.title
                                                    }
                                                    content={
                                                        formattedCards[index]
                                                            ?.storefrontAddress
                                                            ?.addressLines[0]
                                                    }
                                                    footer={
                                                        formattedCards[index]
                                                            ?.storefrontAddress
                                                            ?.postalCode +
                                                        ', ' +
                                                        formattedCards[index]
                                                            ?.storefrontAddress
                                                            ?.locality +
                                                        (formattedCards[index]
                                                            ?.storefrontAddress
                                                            ?.administrativeArea
                                                            ? ' (' +
                                                              formattedCards[
                                                                  index
                                                              ]
                                                                  ?.storefrontAddress
                                                                  ?.administrativeArea +
                                                              ') - '
                                                            : '') +
                                                        formattedCards[index]
                                                            ?.storefrontAddress
                                                            ?.regionCode
                                                    }
                                                    //onClick={() => selectCard(formattedCards[index]?.metadata?.placeId)}
                                                    onClick={() =>
                                                        selectCard(
                                                            formattedCards[
                                                                index
                                                            ]
                                                                ?.idAccountLocationGbp
                                                        )
                                                    }
                                                    key={index}
                                                    isSelectable={true}
                                                    duplicate={
                                                        formattedCards[index]
                                                            ?.metadata
                                                            ?.duplicateLocation
                                                    }
                                                    isDisabled={
                                                        !!formattedCards[index]
                                                            ?.metadata
                                                            ?.duplicateLocation
                                                    }
                                                    allSelected={
                                                        allCardsSelected
                                                    }
                                                />
                                            ) : internalCode === 'facebook' ? (
                                                <ClickableCard
                                                    index={
                                                        formattedCards[index]
                                                            ?.access_token
                                                    }
                                                    selectedCardIndex={
                                                        selectedCardIndex
                                                    }
                                                    hiddenField={
                                                        formattedCards[index]
                                                            ?.access_token
                                                    }
                                                    heading={
                                                        formattedCards[index]
                                                            ?.name
                                                    }
                                                    footer={
                                                        formattedCards[index]
                                                            ?.location
                                                            ? (formattedCards[
                                                                  index
                                                              ]?.location.street
                                                                  ? formattedCards[
                                                                        index
                                                                    ]?.location
                                                                        .street +
                                                                    ', '
                                                                  : '') +
                                                              formattedCards[
                                                                  index
                                                              ]?.location.city +
                                                              ' (' +
                                                              formattedCards[
                                                                  index
                                                              ]?.location.zip +
                                                              ')'
                                                            : ''
                                                    }
                                                    onClick={() =>
                                                        selectCard(
                                                            formattedCards[
                                                                index
                                                            ]?.access_token
                                                        )
                                                    }
                                                    key={index}
                                                    isSelectable={true}
                                                    likes={
                                                        formattedCards[index]
                                                            ?.fan_count
                                                    }
                                                    followers={
                                                        formattedCards[index]
                                                            ?.followers_count
                                                    }
                                                    rating_count={
                                                        formattedCards[index]
                                                            ?.rating_count
                                                    }
                                                    allSelected={
                                                        allCardsSelected
                                                    }
                                                />
                                            ) : internalCode ===
                                              'tripadvisor' ? (
                                                <ClickableCard
                                                    index={
                                                        formattedCards[index] &&
                                                        formattedCards[index]
                                                            ?.result_object &&
                                                        formattedCards[index]
                                                            ?.result_object
                                                            ?.location_id
                                                            ? formattedCards[
                                                                  index
                                                              ]?.result_object
                                                                  ?.location_id
                                                            : null
                                                    }
                                                    selectedCardIndex={
                                                        selectedCardIndex
                                                    }
                                                    hiddenField={
                                                        formattedCards[index] &&
                                                        formattedCards[index]
                                                            ?.result_object &&
                                                        formattedCards[index]
                                                            .result_object
                                                            ?.location_id
                                                            ? formattedCards[
                                                                  index
                                                              ]?.result_object
                                                                  ?.location_id
                                                            : null
                                                    }
                                                    heading={
                                                        formattedCards[index]
                                                            ?.result_type
                                                    }
                                                    content={
                                                        formattedCards[index] &&
                                                        formattedCards[index]
                                                            ?.result_object &&
                                                        formattedCards[index]
                                                            ?.result_object
                                                            ?.name
                                                            ? formattedCards[
                                                                  index
                                                              ]?.result_object
                                                                  ?.name
                                                            : null
                                                    }
                                                    footer={
                                                        formattedCards[index] &&
                                                        formattedCards[index]
                                                            ?.result_object &&
                                                        formattedCards[index]
                                                            ?.result_object
                                                            ?.address
                                                            ? formattedCards[
                                                                  index
                                                              ]?.result_object
                                                                  ?.address
                                                            : null
                                                    }
                                                    onClick={() =>
                                                        selectCard(
                                                            formattedCards[
                                                                index
                                                            ] &&
                                                                formattedCards[
                                                                    index
                                                                ]
                                                                    ?.result_object &&
                                                                formattedCards[
                                                                    index
                                                                ]?.result_object
                                                                    ?.location_id
                                                                ? formattedCards[
                                                                      index
                                                                  ]
                                                                      ?.result_object
                                                                      ?.location_id
                                                                : null
                                                        )
                                                    }
                                                    key={index}
                                                    isSelectable={true}
                                                    allSelected={
                                                        allCardsSelected
                                                    }
                                                />
                                            ) : (
                                                <></>
                                            )}
                                        </ItemWrapper>
                                    )}
                                </div>
                            ))
                    ) : (
                        <div className="row" style={{ marginBottom: 20 }}>
                            {/*<LoaderChart
                                type={'reviews'}
                                reviewType={'integrationLocation'}
                            />*/}
                        </div>
                    )}
                </div>
            </div>
            <>
                <div style={!dataReady ? { marginTop: 60 } : { marginTop: 20 }}>
                    <Button
                        onClick={handleShowMore}
                        className={
                            disableShowMore
                                ? styles.showMoreBtnDisabled
                                : styles.showMoreBtn
                        }
                        disabled={disableShowMore}
                    >
                        {t('Mostra più location')}
                    </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        onClick={() => {
                            if (fromIntegration) {
                                callback()
                            } else {
                                history(-1)
                            }
                        }}
                    >
                        {t('Annulla')}
                    </Button>
                    <Button onClick={() => onSubmit()}>{t('Aggiungi')}</Button>
                </div>
            </>
        </PageContainer>
    )
}
export default SelectableCards
