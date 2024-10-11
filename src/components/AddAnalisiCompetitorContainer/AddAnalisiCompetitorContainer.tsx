import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AddAnalisiCompetitorContainerProps } from './AddAnalisiCompetitorContainer.interface'
import styles from './AddAnalisiCompetitorContainer.module.scss'
import Typography from '../Typography/Typography'
import { useTranslation } from 'react-i18next'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import Button from '../Button/Button'
import AddAccountForm from '../Forms/AddAccountForm/AddAccountForm'
import { FormikProps } from 'formik'
import { AddAccountFormData } from '../Forms/AddAccountForm/AddAccountForm.interface'
import AddGroupsForm from '../Forms/AddGroupsForm/AddGroupsForm'
import AddSurveyForm from '../Forms/AddSurveyForm/AddSurveyForm'
import CustomGooglePlacesAutocomplete from '../CustomGoogleAutocomplete/CustomGooglePlacesAutocomplete'
import CompetitorCard from '../Cards/CompetitorCard/CompetitorCard'
import { generateRandomColor } from '../../helpers/helpers'
import { debounce } from 'lodash'
import CompetitorService from '../../services/CompetitorService'
import search from '../../assets/icons/searchBig.svg'
import Lottie from 'lottie-react'
import circle_loader from '../../assets/lottie/circle-loader.json'
import search_empty from '../../assets/lottie/search_empty.json'
import Input from '../Input/Input'
const AddAnalisiCompetitorContainer = ({
    data,
}: AddAnalisiCompetitorContainerProps) => {
    const [isOnEdit, setIsOnEdit] = useState(false)
    const formRef = useRef<FormikProps<any>>(null)
    const [locationInput, setLocationInput] = useState('')
    const [objPlace, setObjPlace] = useState(null)
    const [searchingText, setSearchingText] = useState('')
    const [expanded, setExapnded] = useState('panel0')
    const [displayBox, setDisplayBox] = useState(false)
    const [firstCheck, setFirstCheck] = useState(false)
    const [selectAllBool, setSelectAll] = useState(false)
    const [addNewGroup, setAddNewGroup] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [toDelete, setToDelete] = useState(null)
    const [isOpen, toggle] = useState(false)
    const [color, setColor] = useState(generateRandomColor())
    const [top, setTop] = useState(0)
    const [loadAddNewGroup, setAddLoadNewGroup] = useState(false)
    const [newName, setNewName] = useState('')
    const type = ['restaurant']
    const [actualPage, setActualPage] = useState(1)
    const [pages, setPages] = useState(0)
    const [cards, setCards] = useState([])
    const [currentRecords, setCurrentRecords] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [currLang, setCurrLang] = useState('')
    const recordsPerPage = 6
    const { t, i18n } = useTranslation()
    const gruppi = CompetitorService.getAllCompetitor()?.data?.data

    const handleSaveBtn = () => {
        setIsOnEdit(false)
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    const setSelectedCompetitor = (elm: any) => {
        const tmpAllGruppi = JSON.parse(JSON.stringify(gruppi))
        const index = expanded.split('panel')[1]

        const tmpGruppo = tmpAllGruppi[index]
        const present = tmpGruppo?.items.findIndex(
            (el: any) => el.place_id === elm.place_id
        )
        if (present !== -1) {
            tmpGruppo?.items.splice(present, 1)
        } else {
            if (!elm.formatted_address) {
                elm['formatted_address'] = elm?.vicinity
            }
            tmpGruppo?.items.push(elm)
        }
        tmpAllGruppi[index] = tmpGruppo
        //todo: just use useMutation and gruppi should reload
        //setNewGruppi(tmpAllGruppi)
    }

    const langs = [
        { key: 'Italiano', value: 'it' },
        { key: 'English', value: 'en' },
        { key: 'Español', value: 'es' },
    ]

    const handleChangeComplete = (color: any) => {
        setColor(color.hex)
    }

    useEffect(() => {
        const langToFind = i18n.language.includes('-')
            ? i18n.language.split('-')[0]
            : i18n.language
        const lang = langs.find((x) => x.value === langToFind)?.key || ''
        setCurrLang(lang)
    }, [])

    const handleCloseDelete = () => {
        setModalDelete(false)
        setToDelete(null)
    }

    useEffect(() => {
        const pages = Math.ceil(cards?.length / recordsPerPage)
        setPages(pages)
        const indexOfLastRecord = actualPage * recordsPerPage
        const indexOfFirstRecord = Math.abs(indexOfLastRecord - recordsPerPage)
        setCurrentRecords(cards?.slice(indexOfFirstRecord, indexOfLastRecord))
    }, [cards, actualPage])

    const getActualGroup = () => {
        const index = expanded.split('panel')[1]
        //return gruppi[index]
    }

    /*
    //todo: check why we should do this update
    const getGroups = async () => {
        try {
            const response = await CompetitorService.getAllCompetitor()
            response?.data?.data.map((serverGruppo) => {
                let tmp = gruppi.find((elm) => elm.competitorName === serverGruppo.competitorName)
                if (tmp?.items) {
                    serverGruppo['items'] = tmp?.items
                } else {
                    serverGruppo['items'] = []
                }
            })
            setNewGruppi(response?.data.data)
        } catch (e) {
            dispatch(showToast({type: 2, text: t("Impossibile ottenere competitor")}))
        }
    }
     */
    const searchAPI = async (text: string) => {
        try {
            const response = await CompetitorService.getCompetitor(type, text)
            console.log('Res: ', response)
            setCards(response.suggested)
            setSearchResult(response.search)
        } catch (e) {
            setSearchResult([])
        }
    }

    const handler = useCallback(
        debounce((text) => searchAPI(text), 500),
        []
    )

    const searchCompetitor = async (text: string) => {
        setFirstCheck(true)
        setSearchingText(text)
        setSearchResult([])
        handler(text)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.textHeader}>
                    <Typography size={'h5'} weight={'bold'} color={'black'}>
                        {t('Analisi competitor')}
                    </Typography>
                    <Typography size={'h5'} weight={'light'} color={'black'}>
                        {' - ' + data?.title}
                    </Typography>
                </div>
                <div className={styles.btnContainer}>
                    <Button
                        variant={'outline'}
                        size={'small'}
                        onClick={() => setIsOnEdit(false)}
                    >
                        {t('Annulla')}
                    </Button>
                    <Button
                        variant={'solid'}
                        size={'small'}
                        onClick={handleSaveBtn}
                    >
                        {t('Salva')}
                    </Button>
                </div>
            </div>
            <div className={styles.description}>
                <Typography
                    size={'bodySmall'}
                    weight={'normal'}
                    color={'black'}
                >
                    {t(
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    )}
                </Typography>
            </div>
            <div className={styles.body}>
                <div style={{ width: '60%' }}>
                    <Input
                        fullWidth={true}
                        onChange={(e) => {
                            searchCompetitor(e.target.value)
                        }}
                        onFocus={() => setDisplayBox(true)}
                        onBlur={() => setDisplayBox(false)}
                        value={searchingText}
                        placeholder={
                            gruppi && gruppi?.length > 0
                                ? t('Cerca un punto vendita da aggiungere') + ''
                                : /*gruppi[expanded.split('panel')[1]]
                                      ?.competitorName*/
                                  t('Cerca un punto vendita')
                        }
                        type={'text'}
                        prefix={'searchSvg'}
                    />
                </div>
                <div className={styles.searchResults}>
                    <Typography
                        size={'bodyMedium'}
                        weight={'light'}
                        color={'black'}
                    >
                        {t('Risultati ricerca')}
                    </Typography>
                    <div className={styles.cardContainer}>
                        {searchResult.map((elm: any, idx: number) => {
                            const {
                                //todo: check if place_id is necessary
                                place_id,
                                name,
                                formatted_address,
                                rating,
                                user_ratings_total,
                            } = elm

                            return (
                                <CompetitorCard
                                    key={idx}
                                    elm={elm}
                                    name={name}
                                    /*selected={getActualGroup()?.items?.find(
                                        (el: any) => el.place_id === place_id
                                    )}*/
                                    formatted_address={formatted_address}
                                    meanSentiment={rating}
                                    meanRating={rating}
                                    totRating={user_ratings_total}
                                    addCompetitor={setSelectedCompetitor}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className={styles.searchResults}>
                    <Typography
                        size={'bodyMedium'}
                        weight={'light'}
                        color={'black'}
                    >
                        {t('Suggeriti')}
                    </Typography>
                    <div className={styles.cardContainer}>
                        {currentRecords.map((elm: any, idx: number) => {
                            const {
                                place_id,
                                name,
                                vicinity,
                                rating,
                                user_ratings_total,
                            } = elm
                            return (
                                <CompetitorCard
                                    key={idx}
                                    elm={elm}
                                    name={name}
                                    /*selected={getActualGroup()?.items?.find(
                                        (el: any) => el.place_id === place_id
                                    )}*/
                                    formatted_address={vicinity}
                                    meanSentiment={rating}
                                    meanRating={rating}
                                    totRating={user_ratings_total}
                                    addCompetitor={setSelectedCompetitor}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAnalisiCompetitorContainer
