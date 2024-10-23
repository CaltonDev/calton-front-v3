import React from 'react'
import Tooltip from '../Tooltip/Tooltip'
import { useState } from 'react'
import { usePlacesWidget } from 'react-google-autocomplete'
import AppConfig from '../../constants/AppConfig'
import { useTranslation } from 'react-i18next'
import { CustomGooglePlacesAutocompleteProps } from './CustomGooglePlacesAutocomplete.interface'
import FormInputWrapper from '../FormFieldsWrapper/FormInputWrapper/FormInputWrapper'
import { Field } from 'formik'
import Input from '../Input/Input'

const CustomGooglePlacesAutocomplete = ({
    customClass,
    placeHolder,
    locationInput,
    setLocationValue,
    fromForm = false,
}: CustomGooglePlacesAutocompleteProps) => {
    const { t } = useTranslation()
    const [address, setAddress] = useState(locationInput ?? null)
    const [newLocation, setNewLocation] = useState({
        idUser: locationInput?.idUser,
        _id: locationInput?._id,
        lat: null,
        lng: null,
    })

    const { ref }: any = usePlacesWidget({
        apiKey: AppConfig.googlePlaces.apiKey,
        onPlaceSelected: (place: any) => {
            setAddress(
                place.formatted_address ? place.formatted_address : place.name
            )
            parseAddress(place)
        },
        options: {
            types: [],
            fields: [
                'address_components',
                'geometry.location',
                'place_id',
                'formatted_address',
                'name',
                'types',
            ],
        },
        language: 'it',
    })

    //todo: create custom autocomplete type if necessary (maybe better to stay with any because of google updates) or check google typescript
    const parseAddress = (composedAddress: any) => {
        const place_id = composedAddress.place_id
            ? composedAddress.place_id
            : null
        const type = composedAddress.types ? composedAddress.types : null
        const formatted_address = composedAddress.formatted_address
            ? composedAddress.formatted_address
            : null
        const locationName = composedAddress?.name
        let street_number: any = null
        let route: any = null
        let al3: any = null
        let al2: any = null
        let al1: any = null
        let country: any = null
        let postal_code: any = null
        let regionCode: any = null
        let administrativeArea = null
        composedAddress.address_components.map((el: any) => {
            if (!street_number) {
                if (el.types.find((data: string) => data === 'street_number')) {
                    street_number = el.long_name
                }
            }

            if (!route) {
                if (
                    el.types.find((data: string) => data === 'route') ||
                    el.types.find((data: string) => data === 'intersection')
                ) {
                    route = el.long_name
                } else {
                    route = composedAddress.formatted_address.split(',')[0]
                }
            }

            if (!al3) {
                if (
                    el.types.find((data: string) => data === 'locality') ||
                    el.types.find(
                        (data: string) => data === 'administrative_area_level_3'
                    )
                ) {
                    al3 = el.long_name
                }
            }
            if (!al2) {
                if (
                    el.types.find(
                        (data: string) => data === 'administrative_area_level_2'
                    )
                ) {
                    al2 = el.long_name
                    administrativeArea = el.short_name
                }
            }

            if (!al1) {
                if (
                    el.types.find(
                        (data: string) => data === 'administrative_area_level_1'
                    )
                ) {
                    al1 = el.long_name
                }
            }

            if (!country) {
                if (el.types.find((data: string) => data === 'country')) {
                    country = el.long_name
                    regionCode = el.short_name
                }
            }

            if (!postal_code) {
                if (el.types.find((data: string) => data === 'postal_code')) {
                    postal_code = el.long_name
                }
            }
        })
        const lat = composedAddress.geometry.location.lat()
        const lng = composedAddress.geometry.location.lng()

        setAddress(formatted_address)

        setNewLocation({
            ...newLocation,
            lat: lat,
            lng: lng,
        })

        if (setLocationValue) {
            setLocationValue({
                place_id: place_id,
                type: type,
                street_number: street_number,
                route: route,
                al3: al3,
                al2: al2,
                al1: al1,
                country: country,
                postal_code: postal_code,
                formatted_address: formatted_address,
                lat: lat,
                lng: lng,
                locationName: locationName,
                regionCode: regionCode,
                administrativeArea: administrativeArea,
            })
        }
    }

    return (
        <Tooltip
            title={t('Seleziona un indirizzo dalla lista')}
            direction="top"
        >
            {fromForm ? (
                <Field
                    fullWidth={true}
                    component={FormInputWrapper}
                    required={true}
                    name="googleCustomAutocomplete"
                    //style={fromForm && address ? {marginBottom: "3rem"} : {marginBottom: '0'}}
                    customClassName={customClass}
                    placeholder={placeHolder}
                    value={address}
                    onChange={(event: any) => {
                        setAddress(event.target.value)
                    }}
                    customRef={ref}
                    suffix
                />
            ) : (
                <Input
                    name="googleCustomAutocomplete"
                    isFromForm={fromForm && address}
                    customClassName={customClass}
                    placeholder={placeHolder}
                    value={address}
                    onChange={(event) => {
                        setAddress(event.target.value)
                    }}
                    customRef={ref}
                />
            )}
        </Tooltip>
    )
}

export default CustomGooglePlacesAutocomplete
