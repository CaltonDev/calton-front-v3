import React, { useEffect, useState } from 'react'
import Checkbox from '../../../../Checkbox/Checkbox'
import styles from './OtherFilter.module.scss'
import { useTranslation } from 'react-i18next'
import CustomAutocomplete from '../../../../CustomAutocomplete/CustomAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { SelectableFiltersState } from '../../../../../store/filters/selectableFiltersSlice'
import { selectAllFilters } from '../../../../../store/selectors/selectorsSlice'
import {
    setCustomFilter,
    setStateSelect,
} from '../../../../../store/filters/filtersSlice'
import Typography from '../../../../Typography/Typography'
import ReactStars from 'react-stars'
import { CustomAutocompleteFilter } from '../../Filter/Filter.interface'

function OtherFilter({ setPreparedPayload }: CustomAutocompleteFilter) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { customFilters } = useSelector(selectAllFilters)
    const [starsList, setStarsList] = useState<number[]>([])
    const saveFiltersToRedux = (
        data: string | number | number[],
        type: string
    ) => {
        const payload = {
            _id: null,
            collection: 'feedback',
            EP_config: null,
            attribute: type,
            selectedCustom: Array.isArray(data) ? data : [data],
        }
        const foundFilters = customFilters?.filter(
            (elm: any) => elm.attribute === type
        )
        if (!foundFilters || foundFilters.length == 0) {
            const tmpfeedbackFilters = JSON.parse(JSON.stringify(customFilters))
            tmpfeedbackFilters?.push(payload)
            dispatch(setCustomFilter(tmpfeedbackFilters))
        } else {
            const filtersToSave: any[] = []
            customFilters?.map((elm: any) => {
                if (
                    elm.attribute === type &&
                    !elm.selectedCustom.includes(data)
                ) {
                    const tmpArr = JSON.parse(JSON.stringify(elm))
                    const tmp = tmpArr.selectedCustom
                    tmp.push(data)
                    tmpArr.selectedCustom = tmp
                    if (tmpArr && tmpArr?.selectedCustom.length > 0)
                        filtersToSave.push(tmpArr)
                } else if (
                    elm.attribute === type &&
                    elm.selectedCustom.includes(data)
                ) {
                    const tmpArr = JSON.parse(JSON.stringify(elm))
                    const tmp = tmpArr.selectedCustom.filter(
                        (el: any) => el != data
                    )
                    tmpArr.selectedCustom = tmp
                    if (tmpArr && tmpArr?.selectedCustom.length > 0)
                        filtersToSave.push(tmpArr)
                } else {
                    filtersToSave.push(elm)
                }
            })

            //            setPreparedPayload(payload)
            dispatch(setCustomFilter(filtersToSave))
        }
    }

    const ratingChanged = (index: number) => {
        const tmpList = JSON.parse(JSON.stringify(starsList))
        const removeIdx = starsList.indexOf(index)

        if (removeIdx !== -1) {
            tmpList.splice(removeIdx, 1)
        } else {
            tmpList.push(index)
        }
        setStarsList(tmpList)

        saveFiltersToRedux(starsList, 'voto')
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentDiv}>
                <Typography size={'bodySmall'} weight={'normal'}>
                    {t('testo')}
                </Typography>
                <Checkbox
                    type={'checkbox'}
                    checked={customFilters?.some(
                        (elm: any) =>
                            elm.attribute == 'testo' &&
                            elm.selectedCustom.includes('Con testo')
                    )}
                    onClick={() => saveFiltersToRedux('Con testo', 'testo')}
                    title={t('Con Testo')}
                ></Checkbox>
                <Checkbox
                    type={'checkbox'}
                    checked={customFilters?.some(
                        (elm: any) =>
                            elm.attribute == 'testo' &&
                            elm.selectedCustom.includes('Senza testo')
                    )}
                    onClick={() => saveFiltersToRedux('Senza testo', 'testo')}
                    title={t('Senza Testo')}
                ></Checkbox>
            </div>
            <div className={styles.contentDiv}>
                <Typography size={'bodySmall'} weight={'normal'}>
                    {t('Traduzione')}
                </Typography>
                <Checkbox
                    type={'checkbox'}
                    checked={customFilters?.some(
                        (elm: any) =>
                            elm.attribute == 'original' &&
                            elm.selectedCustom.includes('Con testo')
                    )}
                    onClick={() => saveFiltersToRedux('Con testo', 'original')}
                    title={t('Con traduzione')}
                ></Checkbox>
                <Checkbox
                    type={'checkbox'}
                    checked={customFilters?.some(
                        (elm: any) =>
                            elm.attribute == 'original' &&
                            elm.selectedCustom.includes('Senza testo')
                    )}
                    onClick={() =>
                        saveFiltersToRedux('Senza testo', 'original')
                    }
                    title={t('Senza Traduzione')}
                ></Checkbox>
            </div>
            <div className={styles.contentDiv}>
                <Typography size={'bodySmall'} weight={'normal'}>
                    {t('Sentiment')}
                </Typography>
                <Checkbox
                    type={'checkbox'}
                    checked={customFilters?.some(
                        (elm: any) =>
                            elm.attribute == 'sentiment' &&
                            elm.selectedCustom.includes(1)
                    )}
                    onClick={() => saveFiltersToRedux(1, 'sentiment')}
                    title={t('Positivo')}
                ></Checkbox>
                <Checkbox
                    type={'checkbox'}
                    checked={customFilters?.some(
                        (elm: any) =>
                            elm.attribute == 'sentiment' &&
                            elm.selectedCustom.includes(0)
                    )}
                    onClick={() => saveFiltersToRedux(0, 'sentiment')}
                    title={t('Neutro')}
                ></Checkbox>
                <Checkbox
                    type={'checkbox'}
                    checked={customFilters?.some(
                        (elm: any) =>
                            elm.attribute == 'sentiment' &&
                            elm.selectedCustom.includes(-1)
                    )}
                    onClick={() => saveFiltersToRedux(-1, 'sentiment')}
                    title={t('Negativo')}
                ></Checkbox>
            </div>
            <div className={styles.contentDiv}>
                <Typography size={'bodySmall'} weight={'normal'}>
                    {t('Voto')}
                </Typography>
                <div className={styles.starsContainer}>
                    {Array.from({ length: 5 }).map((_, index: number) => (
                        <ReactStars
                            value={starsList?.includes(index) ? 1 : 0}
                            key={'stars_' + (index + 1)}
                            count={1}
                            onChange={() => ratingChanged(index + 1)}
                            size={24}
                            color2={'#ffd700'}
                            color1={'#E9E7EC'}
                            half={false}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.contentDiv}>
                <Typography size={'bodySmall'} weight={'normal'}>
                    {t('Risposta')}
                </Typography>
                <Checkbox
                    type={'checkbox'}
                    checked={customFilters?.some(
                        (elm: any) =>
                            elm.attribute == 'risposta' &&
                            elm.selectedCustom.includes('Con risposta')
                    )}
                    onClick={() =>
                        saveFiltersToRedux('Con risposta', 'risposta')
                    }
                    title={t('Con Risposta')}
                ></Checkbox>
                <Checkbox
                    type={'checkbox'}
                    checked={customFilters?.some(
                        (elm: any) =>
                            elm.attribute == 'risposta' &&
                            elm.selectedCustom.includes('Senza risposta')
                    )}
                    onClick={() =>
                        saveFiltersToRedux('Senza risposta', 'risposta')
                    }
                    title={t('Senza Risposta')}
                ></Checkbox>
            </div>
        </div>
    )
}

export default OtherFilter
