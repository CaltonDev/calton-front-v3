import React, { useState } from 'react'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import styles from '../UploadFonti/UploadFonti.module.scss'
import Typography from '../../components/Typography/Typography'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import CaltonSelect from '../../components/Select/Select'
import TextContainer from '../../components/TextContainer/TextContainer'
import Checkbox from '../../components/Checkbox/Checkbox'
import { SmartResponseEditProps } from './UploadFonti.interface'
import CustomAutocomplete from '../../components/CustomAutocomplete/CustomAutocomplete'
import { useSelector } from 'react-redux'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { RootState } from '../../store/store'
import FilterService from '../../services/FilterService'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'
import CustomGooglePlacesAutocompleteAnt from '../../components/CustomGoogleAutocomplete/CustomGooglePlacesAutocomplete'
import CustomGooglePlacesAutocomplete from '../../components/CustomGoogleAutocomplete/CustomGooglePlacesAutocomplete'

function UploadFonti({ data }: SmartResponseEditProps) {
    const { t } = useTranslation()
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

    const allChannelSources =
        FilterService.getChannelSourcesFiltered()?.data?.data || []
    const { selectedChannel } = useSelector(selectAllFilters)

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

    const handleChange = (event: any, type: string) => {
        if (!equalsIgnoreOrder(event, selectedChannel)) {
            const payload = {
                type,
                value: event,
            }
            //setPreparedPayload(payload)
        }
    }

    const [location, setLocation] = useState('ciao')
    const handleGoogleAutocompleteLocation = (location: any) => {
        setLocation(location.formatted_address)
    }
    return (
        <PageContainer>
            <PageHeader
                heading={t('Inserisci file')}
                subheading={true}
            ></PageHeader>
            <div className={styles.container}>
                <div className={styles.leftContainer}>
                    <div className={styles.leftItemContainer}>
                        <CustomGooglePlacesAutocomplete
                            setLocationValue={handleGoogleAutocompleteLocation}
                            locationInput={{
                                address: location,
                            }}
                            placeHolder={t('Obbligatorio')}
                            customClass={styles.inputCustomAutocomplete}
                            fromForm={false}
                        />
                    </div>
                    <div className={styles.leftItemContainer}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('Nome')}
                        </Typography>
                        <Input
                            fullWidth={true}
                            size={'large'}
                            placeholder={t('Inserisci...')}
                        />
                    </div>
                    <div className={styles.leftItemContainer}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('Luogo')}
                        </Typography>
                        <CustomAutocomplete
                            displayType={'core'}
                            label={
                                selectedLocationDetails &&
                                selectedLocationDetails.length === 0
                                    ? t('Tutti i luoghi')
                                    : selectedLocationDetails?.length +
                                      t('luoghi')
                            }
                            placeholderInput={t('Cerca luoghi')}
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
                            multiple={true}
                            hasDropdown={true}
                        />
                    </div>
                    <div className={styles.leftItemContainer}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('Canale')}
                        </Typography>
                        <CustomAutocomplete
                            hasIcons={true}
                            displayType={'core'}
                            label={
                                selectedChannel && selectedChannel?.length === 0
                                    ? t('Tutti i canali')
                                    : selectedChannel?.length + t('canali')
                            }
                            placeholderInput={t('Cerca canali')}
                            primary={''}
                            secondary={''}
                            labels={allChannelSources}
                            type={'channelSources'}
                            handleChange={handleChange}
                            defaultValue={selectedChannel}
                            multiple={true}
                            hasDropdown={true}
                        />
                    </div>
                    <div className={styles.leftItemContainer}>
                        <Typography size={'bodySmall'} weight={'light'}>
                            {t('File')}
                        </Typography>
                        <div className={styles.addFileContainer}>
                            <Button
                                variant={'outline'}
                                icon={'uploadSvg'}
                                size={'medium'}
                                arrowPlacement={'left'}
                            >
                                {t('Scegli file')}
                            </Button>
                            <Typography size={'bodyXSmall'} weight={'light'}>
                                {t('Nome file.xlsx')}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <Typography size={'bodyBig'} weight={'bold'}>
                        {t('Associa tipo')}
                    </Typography>
                    <div className={styles.columnsContainer}>
                        <div className={styles.selectContainerDual}>
                            <div className={styles.selectBody}>
                                <Typography size={'bodySmall'} weight={'light'}>
                                    {t('Nome colonna')}
                                </Typography>
                                <CaltonSelect
                                    //options={selectOptions}
                                    /*value={
                                    selectOptions[
                                        selectOptions?.findIndex(
                                            (x) => x.value === sentiment
                                        )
                                    ]
                                }*/
                                    size={'fullWidth'}
                                    fontSize={'small'}
                                    customColor={'none'}
                                    customHeight={'auto'}
                                    placeholderColor={'#9D96A5'}
                                    /*onChange={(data) => {
                                    handleClickChangeSentiment(
                                        typeof data?.value === 'number'
                                            ? data?.value
                                            : 0,
                                        index
                                    )
                                }}*/
                                />
                                <div className={styles.checkboxContainer}>
                                    <Checkbox title={t('Da analizzare')} />
                                    <Checkbox title={t('Originale')} />
                                    <Checkbox title={t('Risposta')} />
                                    <Checkbox title={t('Urls')} />
                                    <Checkbox title={t('Tipo')} />
                                </div>
                            </div>
                            <div className={styles.selectBody}>
                                <Typography size={'bodySmall'} weight={'light'}>
                                    {t('Nome colonna')}
                                </Typography>
                                <CaltonSelect
                                    //options={selectOptions}
                                    /*value={
                                    selectOptions[
                                        selectOptions?.findIndex(
                                            (x) => x.value === sentiment
                                        )
                                    ]
                                }*/
                                    size={'fullWidth'}
                                    fontSize={'small'}
                                    customColor={'none'}
                                    customHeight={'auto'}
                                    placeholderColor={'#9D96A5'}
                                    /*onChange={(data) => {
                                    handleClickChangeSentiment(
                                        typeof data?.value === 'number'
                                            ? data?.value
                                            : 0,
                                        index
                                    )
                                }}*/
                                />
                                <div className={styles.checkboxContainer}>
                                    <Checkbox title={t('Rating')} />
                                    <Checkbox title={t('NPS')} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.selectContainerDual}>
                            <div className={styles.selectBody}>
                                <Typography size={'bodySmall'} weight={'light'}>
                                    {t('Nome colonna')}
                                </Typography>
                                <CaltonSelect
                                    //options={selectOptions}
                                    /*value={
                                    selectOptions[
                                        selectOptions?.findIndex(
                                            (x) => x.value === sentiment
                                        )
                                    ]
                                }*/
                                    size={'fullWidth'}
                                    fontSize={'small'}
                                    customColor={'none'}
                                    customHeight={'auto'}
                                    placeholderColor={'#9D96A5'}
                                    /*onChange={(data) => {
                                    handleClickChangeSentiment(
                                        typeof data?.value === 'number'
                                            ? data?.value
                                            : 0,
                                        index
                                    )
                                }}*/
                                />
                                <div className={styles.checkboxContainer}>
                                    <Checkbox title={t('Utente')} />
                                </div>
                            </div>
                            <div className={styles.selectBody}>
                                <Typography size={'bodySmall'} weight={'light'}>
                                    {t('Nome colonna')}
                                </Typography>
                                <CaltonSelect
                                    //options={selectOptions}
                                    /*value={
                                    selectOptions[
                                        selectOptions?.findIndex(
                                            (x) => x.value === sentiment
                                        )
                                    ]
                                }*/
                                    size={'fullWidth'}
                                    fontSize={'small'}
                                    customColor={'none'}
                                    customHeight={'auto'}
                                    placeholderColor={'#9D96A5'}
                                    /*onChange={(data) => {
                                    handleClickChangeSentiment(
                                        typeof data?.value === 'number'
                                            ? data?.value
                                            : 0,
                                        index
                                    )
                                }}*/
                                />
                                <div className={styles.checkboxContainer}>
                                    <Checkbox
                                        title={t('Data rilascio feedback')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.selectContainerDual}>
                            <div className={styles.selectBody}>
                                <Typography size={'bodySmall'} weight={'light'}>
                                    {t('Nome colonna')}
                                </Typography>
                                <CaltonSelect
                                    //options={selectOptions}
                                    /*value={
                                    selectOptions[
                                        selectOptions?.findIndex(
                                            (x) => x.value === sentiment
                                        )
                                    ]
                                }*/
                                    size={'fullWidth'}
                                    fontSize={'small'}
                                    customColor={'none'}
                                    customHeight={'auto'}
                                    placeholderColor={'#9D96A5'}
                                    /*onChange={(data) => {
                                    handleClickChangeSentiment(
                                        typeof data?.value === 'number'
                                            ? data?.value
                                            : 0,
                                        index
                                    )
                                }}*/
                                />
                            </div>
                            <div className={styles.selectBody}>
                                <Typography size={'bodySmall'} weight={'light'}>
                                    {t('Nome colonna')}
                                </Typography>
                                <CaltonSelect
                                    //options={selectOptions}
                                    /*value={
                                    selectOptions[
                                        selectOptions?.findIndex(
                                            (x) => x.value === sentiment
                                        )
                                    ]
                                }*/
                                    size={'fullWidth'}
                                    fontSize={'small'}
                                    customColor={'none'}
                                    customHeight={'auto'}
                                    placeholderColor={'#9D96A5'}
                                    /*onChange={(data) => {
                                    handleClickChangeSentiment(
                                        typeof data?.value === 'number'
                                            ? data?.value
                                            : 0,
                                        index
                                    )
                                }}*/
                                />
                            </div>
                        </div>
                        <div className={styles.selectContainerDual}>
                            <div className={styles.selectBody}>
                                <Typography size={'bodySmall'} weight={'light'}>
                                    {t('Nome colonna')}
                                </Typography>
                                <CaltonSelect
                                    //options={selectOptions}
                                    /*value={
                                    selectOptions[
                                        selectOptions?.findIndex(
                                            (x) => x.value === sentiment
                                        )
                                    ]
                                }*/
                                    size={'fullWidth'}
                                    fontSize={'small'}
                                    customColor={'none'}
                                    customHeight={'auto'}
                                    placeholderColor={'#9D96A5'}
                                    /*onChange={(data) => {
                                    handleClickChangeSentiment(
                                        typeof data?.value === 'number'
                                            ? data?.value
                                            : 0,
                                        index
                                    )
                                }}*/
                                />
                            </div>
                            <div className={styles.selectBody}>
                                <Typography size={'bodySmall'} weight={'light'}>
                                    {t('Nome colonna')}
                                </Typography>
                                <CaltonSelect
                                    //options={selectOptions}
                                    /*value={
                                    selectOptions[
                                        selectOptions?.findIndex(
                                            (x) => x.value === sentiment
                                        )
                                    ]
                                }*/
                                    size={'fullWidth'}
                                    fontSize={'small'}
                                    customColor={'none'}
                                    customHeight={'auto'}
                                    placeholderColor={'#9D96A5'}
                                    /*onChange={(data) => {
                                    handleClickChangeSentiment(
                                        typeof data?.value === 'number'
                                            ? data?.value
                                            : 0,
                                        index
                                    )
                                }}*/
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Button size={'medium'} variant={'outline'}>
                    {t('Annulla')}
                </Button>
                <Button size={'medium'}>{t('Aggiungi')}</Button>
            </div>
        </PageContainer>
    )
}

export default UploadFonti
