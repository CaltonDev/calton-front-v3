import styled from 'styled-components';
import {Button, Select, Spin, Tooltip} from 'antd';
import { useTranslation } from 'react-i18next';
import React, {useCallback, useState} from 'react';
import styles from '../EditInfo/EditInfo.module.scss';
import { BsTrash } from 'react-icons/bs';
import {showToast} from "../../../redux/errorToast";
import ListingService from "../../../services/ListingService";
import {useDispatch} from "react-redux";
import {debounce} from "lodash";
import {StyledMenu, StyledSelect} from "./AdditionalCategorySelectStyled"


function AdditionalCategorySelect({idx, additionalCategoryList, listingItem, setListingItem, categoriesListDefault}) {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch()
  const [categoriesList, setCategoryList] = useState(categoriesListDefault ?? []);


  const handleSetCategoryList = (value) => {

    let currentSelectList = [...additionalCategoryList]
    currentSelectList[idx] = JSON.parse(value)
    let currentItem = JSON.parse(JSON.stringify(listingItem))
    currentItem.categories.additionalCategories = currentSelectList
    setListingItem(currentItem)
  }

  const handleRemoveSelectFromList = () => {
    let currentSelectList = JSON.parse(JSON.stringify(additionalCategoryList))
    currentSelectList.splice(idx, 1)
    let currentItem = JSON.parse(JSON.stringify(listingItem))
    currentItem.categories.additionalCategories = currentSelectList
    setListingItem(currentItem)
  }

  const handleSelectOnSearch = async (value) => {
    setCategoryList([])
    try {
      const res = await ListingService.getCategoriesList(value)
      setCategoryList(res?.data?.data?.categories)
    } catch (e) {
      dispatch(showToast({type: 2, text: t("Categorie non trovate")}))
    }
  }
  const debounceSearch = useCallback(debounce((value) => handleSelectOnSearch(value), 700), []);


  return (
    <div style={{display: 'flex'}}>
      <StyledSelect
        filterOption={false}
        showSearch
        style={{width: '20%', marginBottom: '20px'}}
        value={additionalCategoryList && additionalCategoryList[idx]?.displayName ? additionalCategoryList[idx]?.displayName  : t("Seleziona la tua categoria aggiuntiva")}
        onChange={(value) => handleSetCategoryList(value)}
        dropdownRender={(menu) => <StyledMenu><div className={styles.containerSearchLabel}>{t('Cerca per mostrare nuovi elementi')}</div>{menu}</StyledMenu>}
        onSearch={(value)=> {
          if(value.trim() != "")
            debounceSearch(value)
        }}
        notFoundContent={<Spin size="small" />}
      >
        {categoriesList?.map((category) => (
          <Select.Option key={category.name} value={JSON.stringify(category)} className={styles.menuItem}>{category.displayName}</Select.Option>
        ))}
      </StyledSelect>
      <Tooltip title={t("Elimina")} style={{margin: '0 auto'}} placement={'top'}>
        <Button
          onClick={handleRemoveSelectFromList}
          icon={<BsTrash/>}
          size={'large'}
          type={'text'}
        />
      </Tooltip>
    </div>
  )
}

export default AdditionalCategorySelect