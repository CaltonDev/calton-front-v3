import React, { useState } from 'react'
import styles from './ListingBulkEditModal.module.scss'
import { useTranslation } from 'react-i18next'
import Typography from '../../Typography/Typography'
import Button from '../../Button/Button'
import { ListingBulkEditModalProps } from './ListingBulkEditModal.interface'
import CustomAutocomplete from '../../CustomAutocomplete/CustomAutocomplete'
import { useNavigate } from 'react-router-dom'
function ListingBulkEditModal({
    isOpen,
    setIsOpen,
    label = '',
    labels = [],
    isCreateNewLocation = false,
}: ListingBulkEditModalProps) {
    const { t } = useTranslation()
    const [customAutocompleteSelected, setCustomAutocompleteSelected] =
        useState<any>({})

    const history = useNavigate()
    const handleChangeLocation = (data: any) => {
        setCustomAutocompleteSelected(data)
    }

    const handleSaveBtn = () => {
        const formatted_listings = labels?.map((item) => {
            return item?.idAccountLocationGbp
        })
        const locationsName = labels?.map((item) => {
            return item?.title
        })
        if (!isCreateNewLocation && customAutocompleteSelected) {
            history(`edit`, {
                state: {
                    item:
                        customAutocompleteSelected?.idAccountLocationGbp ??
                        customAutocompleteSelected?.id,
                    selectedListings: formatted_listings,
                    locationName: locationsName,
                },
            })
        } else if (!isCreateNewLocation && !customAutocompleteSelected) {
            history(`edit`, {
                state: {
                    item:
                        customAutocompleteSelected?.idAccountLocationGbp ??
                        customAutocompleteSelected?.id,
                    selectedListings: formatted_listings,
                    locationName: locationsName,
                    toOverwrite: false,
                },
            })
        } else
            history('/chooseLocations/new', {
                state: {
                    isCreateNewLocation: true,
                    item: customAutocompleteSelected?.idAccountLocationGbp,
                },
            })
    }

    return (
        <>
            {isOpen && (
                <>
                    <div
                        className={styles.darkBG}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <Typography size={'bodyBig'} weight={'bold'}>
                                {t('Seleziona la tua location di base')}
                            </Typography>
                        </div>
                        <div className={styles.body}>
                            <Typography size={'bodySmall'} weight={'light'}>
                                {t('Luogo')}
                            </Typography>
                            {/*todo: check data after merging ugo's fix on custom autocomplete*/}
                            <CustomAutocomplete
                                label={
                                    customAutocompleteSelected?.title
                                        ? customAutocompleteSelected?.title
                                        : label
                                }
                                labels={labels}
                                defaultValue={customAutocompleteSelected}
                                primary={'title'}
                                secondary={'formatted_address'}
                                type={'locations'}
                                multiple={false}
                                handleChange={handleChangeLocation}
                                fullwidth={true}
                            />
                        </div>
                        <div className={styles.footer}>
                            <Button
                                size={'medium'}
                                variant={'outline'}
                                onClick={() => setIsOpen(false)}
                            >
                                {t('Annulla')}
                            </Button>
                            <Button size={'medium'} onClick={handleSaveBtn}>
                                {t('Aggiungi')}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ListingBulkEditModal
