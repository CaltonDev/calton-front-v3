import styles from "./EditContactInfo.module.scss"
import React, {useEffect, useState} from "react";
import {Radio, Row, Col, Checkbox, Input, Button, Select, Tooltip} from 'antd';
import {useTranslation} from "react-i18next";
import ListingService from 'Services/ListingService';
import save_svg from '../../../assets/img/saveIcon.svg';
import AdditionalPhonesSelect from 'Components/ListingEdit/EditContactInfo/AdditionalPhonesSelect';
import {showToast} from '../../../redux/errorToast';
import {useDispatch} from 'react-redux';
import SingleButtonSave from "../SingleButtonSave/SingleButtonSave";
import { editType } from 'Constants/CustomConstant';

function EditContactInfo({listingItem, setListingItem, listingsName, reloadData, saveEditInfo, setAccordionType, isCreateNewLocation}) {

    const {t, i18n} = useTranslation();

    const dispatch = useDispatch()

    //conditional check useful to handle new listing cases, otherwise it breaks
    const handleAddAdditionalPhones = () => {
      let currentItem = JSON.parse(JSON.stringify(listingItem))
      if (currentItem?.phoneNumbers) {
        if (currentItem?.phoneNumbers?.additionalPhones) {
          currentItem.phoneNumbers.additionalPhones = [...currentItem.phoneNumbers.additionalPhones, '']
        } else {
          currentItem.phoneNumbers.additionalPhones = ['']
        }
      } else {
        currentItem.phoneNumbers = {
          additionalPhones: ['']
        }
      }
      setListingItem(currentItem)
    };

    //conditional check useful to handle new listing cases, otherwise it breaks
    const handleSetPrimaryPhone = (value)  => {
      let currentItem = JSON.parse(JSON.stringify(listingItem))
      if (currentItem?.phoneNumbers?.primaryPhone) {
        currentItem.phoneNumbers.primaryPhone = value;
      } else {
        currentItem.phoneNumbers = {
          primaryPhone: value
        }
      }
      setListingItem(currentItem)
    }

    const handleSetWebsiteUri= (value)  => {
      let currentItem = JSON.parse(JSON.stringify(listingItem))
      currentItem.websiteUri = value
      setListingItem(currentItem)
    }

    return (
        <div className={styles.containerEditInfo}>
            <span className={styles.label}>{t("Numero di telefono")}
              {!isCreateNewLocation &&
                <SingleButtonSave callback={saveEditInfo} typeEdit={editType.phone}/>
              }
            </span>
            <div style={{display: 'flex', width: '40%'}}>
                <Input type={'text'}
                       className={styles.input}
                       value={listingItem?.phoneNumbers?.primaryPhone}
                       onChange={(e) => handleSetPrimaryPhone(e.target.value)}
                />
            </div>

            {listingItem?.phoneNumbers?.additionalPhones?.length > 0 &&
                <span className={styles.label}>{t("Numeri di telefono aggiuntivi")}</span>
            }
            {listingItem?.phoneNumbers?.additionalPhones?.map((value, idx) => <AdditionalPhonesSelect key={idx} idx={idx}
                                                                               additionalPhonesList={listingItem?.phoneNumbers?.additionalPhones}
                                                                               listingItem={listingItem}
                                                                               setListingItem={setListingItem}/>)}
            <span
                onClick={handleAddAdditionalPhones}
                className={styles.addGroup}
            >
                  + {t('Aggiungi un altro numero')}
                </span>

            <span className={styles.label}>{t("Sito web")}
              {!isCreateNewLocation &&
                <SingleButtonSave callback={saveEditInfo} typeEdit={editType.website}/>
              }
            </span>
            <div style={{display: 'flex', width: '40%'}}>
                <Input type={'text'}
                       className={styles.input}
                       value={listingItem?.websiteUri}
                       onChange={(e) => handleSetWebsiteUri(e.target.value)}
                />
            </div>
            {!isCreateNewLocation &&
              <div className={styles.footer}>
                  <div>
                      <Button type="text" className={styles.cancelButton}>
                          {t("Annulla")}
                      </Button>
                  </div>
                  <div>
                      <Button className={styles.saveButton} type="primary" shape="round" htmlType={"submit"} onClick={() => setAccordionType("CONTACT")}>
                          {t("Salva")}
                      </Button>
                  </div>
              </div>
            }
        </div>
    )
}

export default EditContactInfo;