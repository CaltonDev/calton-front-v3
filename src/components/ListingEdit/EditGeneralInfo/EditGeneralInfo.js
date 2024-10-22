import styles from './EditGeneralInfo.module.scss';
import React, { useState } from 'react';
import { Checkbox, Input, Button, Spin, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import ListingService from 'Services/ListingService';
import CustomGooglePlacesAutocompleteAnt from 'Components/CustomGoogleAutocomplete/CustomGooglePlacesAutocompleteAnt';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { showToast } from '../../../redux/errorToast';
import { useDispatch } from 'react-redux';
import SingleButtonSave from "../SingleButtonSave/SingleButtonSave";
import { StyledMenu, StyledSelect } from 'Components/ListingEdit/AdditionalCategorySelect/AdditionalCategorySelectStyled';
import { FormItem } from 'formik-antd';
import { editType } from 'Constants/CustomConstant';
import AntCheckbox from 'Components/AntCheckbox/AntCheckbox';

function Chip({ idx, chipList, setChipList, suggestedChipList, setSuggestedChipList, area, toRemove }) {

    const removeChipFromSelectedList = () => {
        let currentList = [...chipList];
        const removed = currentList.splice(idx, 1);

        setChipList(currentList);

        setSuggestedChipList([...suggestedChipList, removed[0]]);
    };

    const removeChipFromSuggestedList = () => {
        let currentList = [...suggestedChipList];
        const removed = currentList.splice(idx, 1);
        setSuggestedChipList(currentList);
        setChipList([...chipList, removed[0]]);
    };

    return (
        <>
            <span className={styles.chip}
                  key={idx}
                  onClick={toRemove ? removeChipFromSelectedList : removeChipFromSuggestedList}>{toRemove ?
                <AiOutlineMinus /> : <AiOutlinePlus />} {area?.placeName ? area?.placeName : area?.locationName}</span>
        </>
    );
}

function EditGeneralInfo({ listingItem, setListingItem, saveEditInfo, setAccordionType, isCreateNewLocation }) {

    const { t, i18n } = useTranslation();

    const [suggestedAreas, setSuggestedAreas] = useState([]);
    const dispatch = useDispatch()

    const businessTypeList = [
        {
            value: "BUSINESS_TYPE_UNSPECIFIED",
            label: t("Non specificato")
        },
        {
            value: "CUSTOMER_LOCATION_ONLY",
            label: t('Opera presso clienti')
        },
        {
            value: "CUSTOMER_AND_BUSINESS_LOCATION",
            label: t('Opera sia presso clienti che in negozio fisico')
        }
    ];

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    //conditional check useful to handle new listing cases, otherwise it breaks
    const handleGoogleAutocompleteLocation = (location) => {
        setListingItem(prevItem => {
            const currentItem = JSON.parse(JSON.stringify(prevItem));
            if (currentItem?.storefrontAddress) {
                currentItem.storefrontAddress.addressLines = [location?.locationName]
                currentItem.storefrontAddress.postalCode = location?.postal_code
                currentItem.storefrontAddress.locality = location?.al3
                currentItem.storefrontAddress.regionCode = location?.regionCode
                currentItem.storefrontAddress.administrativeArea = location?.administrativeArea
                currentItem.storefrontAddress.languageCode = location?.regionCode?.toLowerCase()
            } else {
                currentItem.storefrontAddress = {
                    addressLines: [location?.locationName],
                    postalCode: location?.postal_code,
                    locality: location?.al3,
                    regionCode: location?.regionCode,
                    administrativeArea: location?.administrativeArea,
                    languageCode: location?.regionCode?.toLowerCase()
                }
            }
            currentItem.formatted_address = location?.formatted_address
            currentItem.location = location

            return currentItem;
        });
    };

    //conditional check useful to handle new listing cases, otherwise it breaks
    const handleSuggestedAreasAutocomplete = (location) => {
        setListingItem(prevItem => {
            const currentItem = JSON.parse(JSON.stringify(prevItem));

            const placeInfoObj = {
                "placeName": location?.locationName,
                "placeId": location?.place_id
            }

            if (currentItem?.serviceArea?.places?.placeInfos) {
                currentItem.serviceArea.places.placeInfos = [...currentItem.serviceArea.places.placeInfos, placeInfoObj];
                currentItem.serviceArea.regionCode = location?.regionCode
            } else {
                currentItem.serviceArea = {
                    ...currentItem.serviceArea,
                    places: {
                        ...currentItem.serviceArea?.places,
                        placeInfos: [placeInfoObj]
                    }
                };
                currentItem.serviceArea.regionCode = location?.regionCode
            }

            return currentItem;
        });
    };

    //conditional check useful to handle new listing cases, otherwise it breaks
    const handleSetSelectedAreas = (value)  => {
        let currentItem = JSON.parse(JSON.stringify(listingItem))
        if (currentItem?.serviceArea?.places?.placesInfos) {
            currentItem.serviceArea.places.placeInfos = value
        } else {
            currentItem.serviceArea = {
                places: {
                    placeInfos: value
                }
            }
        }
        setListingItem(currentItem)
    }

    const handleSetBusinessType = (value)  => {
        setListingItem(prevItem => {
            const currentItem = JSON.parse(JSON.stringify(prevItem));
            if (currentItem?.serviceArea) {
                currentItem.serviceArea.businessType = value
            } else {
                currentItem.serviceArea = {
                    businessType: value
                };
            }
            return currentItem
        })
    }

    function validateRequired(value) {
        return value ? undefined : t('Obbligatorio')
    }
    return (
        <div key={listingItem?.toString()} className={styles.containerEditInfo}>
            {!isCreateNewLocation &&
                <span className={styles.accordionLabel}>{t('La tua sede')}
                    <SingleButtonSave callback={saveEditInfo} typeEdit={editType.address}/>
                </span>
            }
            <FormItem
              name="googleCustomAutocomplete"
              required={true}
              validate={validateRequired}
              style={{marginBottom: '3rem'}}
            >
                <CustomGooglePlacesAutocompleteAnt
                  setLocationValue={handleGoogleAutocompleteLocation}
                  locationInput={{address: listingItem?.formatted_address}}
                  valueProps={''}
                  placeHolder={t('Obbligatorio')}
                  customClass={styles.inputCustomAutocomplete}
                  fromForm={true}
                />
            </FormItem>
            <div style={{ display: 'flex' }}>
                <div className={styles.columnDiv}>
                    <span className={styles.label}>{t('Paese')}</span>
                    <Input type={'text'}
                           style={{ width: '100%' }}
                           className={styles.input}
                           value={listingItem?.storefrontAddress?.regionCode}
                           disabled={true}
                    />
                </div>
                <div className={styles.columnDiv}>
                    <span className={styles.label}>{t('Indirizzo')}</span>
                    <Input type={'text'}
                           style={{ width: '100%' }}
                           className={styles.input}
                           value={listingItem?.storefrontAddress?.addressLines ? listingItem?.storefrontAddress?.addressLines[0] : listingItem?.storefrontAddress?.addressLines}
                           disabled={true}
                    />
                </div>
                <div className={styles.columnDiv}>
                    <span className={styles.label}>{t('Codice Postale')}</span>
                    <Input type={'text'}
                           style={{ width: '100%' }}
                           className={styles.input}
                           value={listingItem?.storefrontAddress?.postalCode}
                           disabled={true}
                    />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div className={styles.columnDiv}>
                    <span className={styles.label}>{t('Città')}</span>
                    <Input type={'text'}
                           style={{ width: '100%' }}
                           className={styles.input}
                           value={listingItem?.storefrontAddress?.locality}
                           disabled={true}
                    />
                </div>
                <div className={styles.columnDiv}>
                    <span className={styles.label}>{t('Provincia')}</span>
                    <Input type={'text'}
                           style={{ width: '100%' }}
                           className={styles.input}
                           value={listingItem?.storefrontAddress?.administrativeArea}
                           disabled={true}
                    />
                </div>
                <div className={styles.columnCheckbox} style={{ justifyContent: 'center' }}>
                    <AntCheckbox style={{ fontSize: '15px', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.88)'}}
                              onChange={onChange}><span style={{marginLeft: 10}}>{t('Mostra indirizzo dell’attività ai clienti')}</span></AntCheckbox>
                </div>
            </div>
            {isCreateNewLocation &&
                <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <span className={styles.label}>{t('Categoria del business')}</span>
                    <StyledSelect
                      filterOption={false}
                      style={{ width: '20%', marginBottom: 10 }}
                      value={businessTypeList.filter(obj => {
                          return obj.value === listingItem?.serviceArea?.businessType
                      })}
                      onChange={(value) => handleSetBusinessType(JSON.parse(value))}
                    >
                        {businessTypeList?.map((type) => (
                          <Select.Option key={type.label}
                                         value={JSON.stringify(type.value)}
                                         className={styles.menuItem}
                          >
                              {type.label}
                          </Select.Option>
                        ))}
                    </StyledSelect>
                </div>
            }
            <div style={{ display: 'flex', marginTop: 50 }}>
                <div className={styles.columnDiv} key={listingItem?.serviceArea?.places?.placeInfos?.toString()}>
                    <span className={styles.accordionLabel}>{t('Area coperta dal servizio')}
                        {!isCreateNewLocation &&
                            <SingleButtonSave callback={saveEditInfo} typeEdit={editType.area}/>
                        }
                    </span>
                    <span
                        className={styles.accordionLabel}>{t('Fai sapere ai tuoi clienti le aree in cui la tua attività effettua consegne o fornisce servizi')}</span>
                    <CustomGooglePlacesAutocompleteAnt
                        setLocationValue={handleSuggestedAreasAutocomplete}
                        customClass={styles.inputCustomAutocomplete}
                    />
                    {suggestedAreas?.length > 0 &&
                        <span className={styles.accordionLabel}>{t('Aree coperte dal servizio suggerite')}</span>}
                    <div style={{ display: 'flex' }}>
                        {suggestedAreas?.map((value, idx) => <Chip key={idx} idx={idx} area={value} toRemove={false}
                                                                  suggestedChipList={suggestedAreas}
                                                                  setSuggestedChipList={setSuggestedAreas}
                                                                  chipList={listingItem?.serviceArea?.places?.placeInfos}
                                                                  setChipList={(e) =>handleSetSelectedAreas(e)} />)}
                    </div>
                    {listingItem?.serviceArea?.places?.placeInfos?.length > 0 && <span className={styles.accordionLabel}
                                                       style={{ marginTop: 20 }}>{t('Aree coperte dal servizio selezionate')}</span>}
                    <div style={{ display: 'flex' }}>
                        {listingItem?.serviceArea?.places?.placeInfos?.map((value, idx) => <Chip key={idx} idx={idx} area={value} toRemove={true}
                                                                 suggestedChipList={suggestedAreas}
                                                                 setSuggestedChipList={setSuggestedAreas}
                                                                 chipList={listingItem?.serviceArea?.places?.placeInfos}
                                                                 setChipList={(e) =>handleSetSelectedAreas(e)} />)}
                    </div>
                </div>
            </div>
            {!isCreateNewLocation &&
                <div className={styles.footer}>
                    <div>
                        <Button type='text' className={styles.cancelButton}>
                            {t('Annulla')}
                        </Button>
                    </div>
                    <div>
                        <Button className={styles.saveButton} type='primary' shape='round' htmlType={'submit'} onClick={() => setAccordionType("GENERAL")}>
                            {t('Salva')}
                        </Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default EditGeneralInfo;