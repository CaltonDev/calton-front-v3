import React from 'react';
import { Tooltip } from 'antd';
import { useState, useRef } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import appConfig from 'Constants/AppConfig';
import {useTranslation} from "react-i18next";
import { Input as FormikInput} from 'formik-antd';
import { Input as AntdInput} from 'antd';



const CustomGooglePlacesAutocompleteAnt = (props) => {
  const { customClass, placeHolder, locationInput, setLocationValue, fromForm = false} = props;
  const {t, i18n} = useTranslation();
  const [address, setAddress] = useState(locationInput?.address ?? null);
  const [newLocation, setNewLocation] = useState({
    idUser: locationInput?.idUser,
    _id: locationInput?._id,
  });
  const inputRef = useRef(null);

  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: appConfig.googlePlaces.apiKey,
    onPlaceSelected: (place) => {
      setAddress(place.formatted_address
          ? place.formatted_address
          : place.name);
      parseAddress(place);
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
  });

  const parseAddress = (composedAddress) => {
    let place_id = composedAddress.place_id ? composedAddress.place_id : null;
    let type = composedAddress.types ? composedAddress.types : null;
    let formatted_address = composedAddress.formatted_address
      ? composedAddress.formatted_address
      : null;
    let locationName = composedAddress?.name;
    let street_number = null;
    let route = null;
    let al3 = null;
    let al2 = null;
    let al1 = null;
    let country = null;
    let postal_code = null;
    let regionCode = null;
    let administrativeArea = null;
    composedAddress.address_components.map((el) => {
      if (!street_number) {
        if (el.types.find((data) => data === 'street_number')) {
          street_number = el.long_name;
        }
      }

      if (!route) {
        if (
          el.types.find((data) => data === 'route') ||
          el.types.find((data) => data === 'intersection')
        ) {
          route = el.long_name;
        } else {
          route = composedAddress.formatted_address.split(',')[0];
        }
      }

      if (!al3) {
        if (
          el.types.find((data) => data === 'locality') ||
          el.types.find((data) => data === 'administrative_area_level_3')
        ) {
          al3 = el.long_name;
        }
      }
      if (!al2) {
        if (el.types.find((data) => data === 'administrative_area_level_2')) {
          al2 = el.long_name;
          administrativeArea = el.short_name
        }
      }

      if (!al1) {
        if (el.types.find((data) => data === 'administrative_area_level_1')) {
          al1 = el.long_name;
        }
      }

      if (!country) {
        if (el.types.find((data) => data === 'country')) {
          country = el.long_name;
          regionCode = el.short_name;
        }
      }

      if (!postal_code) {
        if (el.types.find((data) => data === 'postal_code')) {
          postal_code = el.long_name;
        }
      }
    });
    let lat = composedAddress.geometry.location.lat();
    let lng = composedAddress.geometry.location.lng();

    setAddress(formatted_address);

    setNewLocation({
      ...newLocation,
      lat: lat,
      lng: lng,
    });

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
      administrativeArea: administrativeArea
    });
  };


  return (
    <Tooltip title={t("Seleziona un indirizzo dalla lista")}>
      {fromForm ?
        <FormikInput
          name="googleCustomAutocomplete"
          //style={fromForm && address ? {marginBottom: "3rem"} : {marginBottom: '0'}}
          className={customClass}
          placeholder={placeHolder}
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
          ref={(data) => {
            inputRef.current = data;
            if (data) {
              ref.current = data.input;
            }
          }}
          suffix
        /> :
        <AntdInput
          name="googleCustomAutocomplete"
          style={fromForm && address ? {marginBottom: "3rem"} : {marginBottom: '0'}}
          className={customClass}
          placeholder={placeHolder}
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
          ref={(data) => {
            inputRef.current = data;
            if (data) {
              ref.current = data.input;
            }
          }}
          suffix
        />
      }
    </Tooltip>
  );
};

export default CustomGooglePlacesAutocompleteAnt;