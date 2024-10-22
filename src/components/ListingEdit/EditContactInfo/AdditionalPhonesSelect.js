import { useTranslation } from 'react-i18next';
import React from 'react';
import { Button, Input, Tooltip } from 'antd';
import styles from 'Components/ListingEdit/EditContactInfo/EditContactInfo.module.scss';
import { BsTrash } from 'react-icons/bs';

function AdditionalPhonesSelect({idx, additionalPhonesList,listingItem, setListingItem}) {
  const { t, i18n } = useTranslation();

  const handleRemovePhoneFromList = () => {
    let currentPhoneList = [...additionalPhonesList]
    currentPhoneList.splice(idx, 1); // 2nd parameter means remove one item only
    let currentItem = JSON.parse(JSON.stringify(listingItem))
    currentItem.phoneNumbers.additionalPhones = currentPhoneList
    setListingItem(currentItem)
  }

  const addPhoneToList = (value) => {
    const currentPhone = value
    let currentPhoneList = [...additionalPhonesList]
    currentPhoneList[idx] = currentPhone
    let currentItem = JSON.parse(JSON.stringify(listingItem))
    currentItem.phoneNumbers.additionalPhones = currentPhoneList
    setListingItem(currentItem)
  }

  return (
    <div style={{ display: 'flex' }}>
      <Input type={'text'}
             style={{width: '20%', marginBottom: '20px'}}
             className={styles.input}
             value={additionalPhonesList?.length > 0 ? additionalPhonesList[idx] : t("Inserisci il tuo numero aggiuntivo")}
             onChange={(e) => addPhoneToList(e.target.value)}
      />
      <Tooltip title={t("Elimina")} style={{ margin: '0 auto' }} placement={'top'}>
        <Button
          onClick={handleRemovePhoneFromList}
          icon={<BsTrash />}
          size={'large'}
          type={'text'}
        />
      </Tooltip>
    </div>
  )
}

export default AdditionalPhonesSelect;