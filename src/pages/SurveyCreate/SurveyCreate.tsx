import styles from './SurveyCreate.module.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { SurveyCreateProps } from './SurveyCreate.interface'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import Table from '../../components/Table/Table'
import Input from '../../components/Input/Input'
import CustomAutocomplete from '../../components/CustomAutocomplete/CustomAutocomplete'
import { RootState } from '../../store/store'
import FilterService from '../../services/FilterService'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'
import Button from '../../components/Button/Button'
import Typography from '../../components/Typography/Typography'

function SurveyCreate({ id }: SurveyCreateProps) {
    const { t } = useTranslation()
    const [surveyName, setSurveyName] = useState('')
    const [surveyLocation, setSurveyLocation] = useState({})
    const [surveyViewType, setSurveyViewType] = useState('Desktop')

    const { selectedLocation, selectedLocationDetails } =
        useSelector(selectAllFilters)
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )
    const allLocations =
        FilterService.getLocationsFiltered(
            platformType === 'surveys'
                ? [0, 1, 2, 3, 4]
                : getNoCodeFromPlatfrom(),
            false
        )?.data?.data || []

    const equalsIgnoreOrder = (a: string[], b: string[]) => {
        if (a?.length !== b?.length) return false
        const uniqueValues = new Set([...a, ...b])
        for (const v of uniqueValues) {
            const aCount = a.filter((e) => e === v).length
            const bCount = b.filter((e) => e === v).length
            if (aCount !== bCount) return false
        }
        return true
    }

    /*
    //TODO: check what handle change we should use
    const handleChange = (event: any, type: string) => {
        const allids = event?.map((e: any) => {
            if (e && e._id) return e._id
            else if (e && !e._id) return e
        })
        const allPlacesSelected: any[] = []
        allLocations.forEach((item: any) => {
            allids.forEach((elm: any) => {
                if (item._id == elm) allPlacesSelected.push(item)
            })
        })

        if (!equalsIgnoreOrder(allids, selectedLocation)) {
            const payload = {
                type,
                value: allids,
                optional: allPlacesSelected,
            }
            setSurveyLocation(payload)
        }
    }*/

    const handleChange = (event: any, type: string) => {
        if (!equalsIgnoreOrder(event, selectedLocation)) {
            const payload = {
                type,
                value: event,
            }
            setSurveyLocation(payload)
        }
    }
    const handleChangeSurveyViewType = (value: boolean) => {
        setSurveyViewType(value ? 'Mobile' : 'Desktop')
    }

    return (
        <PageContainer>
            <PageHeader
                heading={t('Crea sondaggio')}
                subheading={true}
                hideFilters={true}
            ></PageHeader>
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <Input
                        size={'medium'}
                        placeholder={'Inserisci nome sondaggio'}
                        fullWidth={true}
                        onChange={(e) => setSurveyName(e?.target?.value)}
                        value={surveyName}
                    />
                    <CustomAutocomplete
                        displayType={'core'}
                        label={
                            selectedLocationDetails &&
                            selectedLocationDetails.length === 0
                                ? t('Tutti i luoghi')
                                : selectedLocationDetails?.length + t('luoghi')
                        }
                        placeholderInput={t('Inserisci luogo')}
                        primary={
                            platformType === 'listing'
                                ? 'title'
                                : 'locationName'
                        }
                        secondary={'formatted_address'}
                        labels={allLocations}
                        type={'locations'}
                        handleChange={handleChange}
                        defaultValue={selectedLocation}
                        multiple={false}
                        hasDropdown={true}
                    />

                    <div className={styles.surveyTypeViewSelectorContainer}>
                        <div
                            className={styles.textContainer}
                            onClick={() => handleChangeSurveyViewType(true)}
                            style={{
                                background:
                                    surveyViewType === 'Mobile'
                                        ? 'black'
                                        : 'white',
                                borderTopLeftRadius:
                                    surveyViewType === 'Mobile' ? 5 : 10,
                                borderBottomLeftRadius:
                                    surveyViewType === 'Mobile' ? 5 : 10,
                            }}
                        >
                            <Typography
                                size={'bodyMedium'}
                                weight={'normal'}
                                customTextColor={
                                    surveyViewType === 'Mobile'
                                        ? 'white'
                                        : 'black'
                                }
                            >
                                {t('Mobile')}
                            </Typography>
                        </div>
                        <div
                            className={styles.textContainer}
                            onClick={() => handleChangeSurveyViewType(false)}
                            style={{
                                background:
                                    surveyViewType === 'Desktop'
                                        ? 'black'
                                        : 'white',
                                borderTopRightRadius:
                                    surveyViewType === 'Desktop' ? 5 : 10,
                                borderBottomRightRadius:
                                    surveyViewType === 'Desktop' ? 5 : 10,
                            }}
                        >
                            <Typography
                                size={'bodyMedium'}
                                weight={'normal'}
                                customTextColor={
                                    surveyViewType === 'Desktop'
                                        ? 'white'
                                        : 'black'
                                }
                            >
                                {t('Desktop')}
                            </Typography>
                        </div>
                    </div>
                    <Button size={'large'}>{t('Pubblica')}</Button>
                </div>
            </div>
        </PageContainer>
    )
}

export default SurveyCreate
