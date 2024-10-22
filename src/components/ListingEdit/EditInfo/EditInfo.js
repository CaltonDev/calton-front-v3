import styles from './EditInfo.module.scss';
import React, {useCallback, useState} from 'react';
import {Button, Select, Spin} from 'antd';
import { useTranslation } from 'react-i18next';
import ListingService from 'Services/ListingService';
import { showToast } from '../../../redux/errorToast';
import {useDispatch} from 'react-redux';
import { StyledMenu, StyledSelect} from '../AdditionalCategorySelect/AdditionalCategorySelectStyled';
import AdditionalCategorySelect from '../AdditionalCategorySelect/AdditionalCategorySelect'
import {debounce} from "lodash";
import SingleButtonSave from "../SingleButtonSave/SingleButtonSave";
import {
  Input,
  FormItem, Field,
} from 'formik-antd';
import { editType } from 'Constants/CustomConstant';

function EditInfo({ formikProps, listingItem, setListingItem, categoriesListDefault, isCreateNewLocation, saveEditInfo, setAccordionType}) {
    const {t} = useTranslation();
    const [categoriesList, setCategoryList] = useState(categoriesListDefault);
    const dispatch = useDispatch();


    //conditional check useful to handle new listing cases, otherwise it breaks
    const handleAddAdditionalCategory = () => {
        let currentItem = JSON.parse(JSON.stringify(listingItem))
        if (currentItem?.categories) {
          if (currentItem.categories.additionalCategories) {
            currentItem.categories.additionalCategories = [...currentItem.categories.additionalCategories, '']
          } else {
            currentItem.categories.additionalCategories = ['']
          }
        } else {
          currentItem.categories = {
            additionalCategories: ['']
          }
        }

        setListingItem(currentItem)
    };
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

    //conditional check useful to handle new listing cases, otherwise it breaks
    const handleSetDescription = (value)  => {
      let currentItem = JSON.parse(JSON.stringify(listingItem))
      if (currentItem?.profile?.description) {
        currentItem.profile.description = value
      } else {
        currentItem.profile = {
          description: value
        }
      }
      formikProps?.setFieldValue("listingDescription", value)
      setListingItem(currentItem)
    }

    const handleSetTitle = (value)  => {
      let currentItem = JSON.parse(JSON.stringify(listingItem))
      currentItem.title = value
      setListingItem(currentItem)
    }

    const handleSetStoreCode = (value)  => {
      let currentItem = JSON.parse(JSON.stringify(listingItem))
      currentItem.storeCode = value
      setListingItem(currentItem)
    }

    //conditional check useful to handle new listing cases, otherwise it breaks
    const handleSetPrimaryCategory = (value)  => {
      let currentItem = JSON.parse(JSON.stringify(listingItem))
      if (currentItem?.categories?.primaryCategory) {
        currentItem.categories.primaryCategory = value
      } else {
        currentItem.categories = {
          primaryCategory: value
        }
      }

      setListingItem(currentItem)
      formikProps?.setFieldValue("listingCategory", value?.displayName)
    }


    function validateRequired(value) {
      return value ? undefined : t('Obbligatorio')
    }

    return (
      <div className={styles.containerEditInfo}>
        <span className={styles.label}>{t("Codice negozio")}
          {!isCreateNewLocation &&
            <SingleButtonSave callback={saveEditInfo} typeEdit={editType.storeCode} />
          }
        </span>
        <div>
          <Input name={'listingStoreCode'}
                 type={'text'}
                 style={{width: '40%'}}
                 className={styles.input}
                 value={listingItem?.storeCode}
                 onChange={(e) => handleSetStoreCode(e.target.value)}
          />
        </div>

        <span className={styles.label}>{t('Nome dell\'attività commerciale')}
          {!isCreateNewLocation &&
            <SingleButtonSave callback={saveEditInfo} typeEdit={editType.title} />
          }
            </span>
        <FormItem
          name="listingName"
          required={true}
          validate={validateRequired}
          style={{ marginBottom: '3rem' }}
        >
          <Input
            name='listingName'
            type={'text'}
            placeholder={t('Obbligatorio')}
            style={{ width: '40%' }}
            className={styles.inputCreateNewLocation}
            value={listingItem?.title}
            onChange={(e) => {
              handleSetTitle(e.target.value)
            }}
            suffix
          />
        </FormItem>
        <span className={styles.label}>{t('Categoria dell\'attività')}
          {!isCreateNewLocation &&
            <SingleButtonSave callback={saveEditInfo} typeEdit={editType.primaryCategory} />
          }
            </span>
        <FormItem
          name="listingCategory"
          required={true}
          validate={validateRequired}
          style={{ marginBottom: '3rem' }}
        >
          <StyledSelect
            name="listingCategory"
            filterOption={false}
            showSearch
            style={{ width: '40%', marginBottom: 10 }}
            placeholder={t('Obbligatorio')}
            value={listingItem?.categories?.primaryCategory?.displayName}
            onChange={(value) => handleSetPrimaryCategory(JSON.parse(value))}
            dropdownRender={(menu) => <StyledMenu>
              <div className={styles.containerSearchLabel}>{t('Cerca per mostrare nuovi elementi')}</div>
              {menu}</StyledMenu>}
            onSearch={(value) => {
              if (value.trim() !== "")
                debounceSearch(value)
            }}
            notFoundContent={<Spin size="small" />}
            suffix
          >
            {categoriesList?.map((category) => (
              <Select.Option key={category.name}
                             value={JSON.stringify(category)}
                             className={styles.menuItem}
              >
                {category.displayName}
              </Select.Option>
            ))}
          </StyledSelect>
        </FormItem>
        {listingItem?.categories?.additionalCategories?.map((value, idx) => <AdditionalCategorySelect key={idx} idx={idx}
                                                                                                      additionalCategoryList={listingItem?.categories?.additionalCategories}
                                                                                                      categoriesListDefault={categoriesList}
                                                                                                      listingItem={listingItem}
                                                                                                      setListingItem={setListingItem} />)}
        <span
          onClick={handleAddAdditionalCategory}
          className={styles.addGroup}
        >
                + {t('Aggiungi gruppo secondario')}
            </span>
        <span className={styles.label}>{t('Descrizione')}
          {!isCreateNewLocation &&
            <SingleButtonSave callback={saveEditInfo} typeEdit={editType.description} />
          }
            </span>
        <FormItem
          name="listingDescription"
          required={true}
          validate={validateRequired}
          style={{ marginBottom: '3rem' }}
          key={'listingDescription'}
        >
          <Field
            name="listingDescription"
            placeholder={t('Obbligatorio')}
            value={listingItem?.profile?.description}
            style={{ width: '60%' }}
            className={styles.inputTextAreaNewLocation}
            onChange={(e) => handleSetDescription(e.target.value)}
            cols={4}
            as={"textarea"}
          />

        </FormItem>
        {!isCreateNewLocation &&
          <div className={styles.footer}>
            <div>
              <Button type='text' className={styles.cancelButton}>
                {t('Annulla')}
              </Button>
            </div>
            <div>
              <Button className={styles.saveButton} type='primary' shape='round' htmlType={'submit'}
                      onClick={() => setAccordionType("STANDARD")}>
                {t('Salva')}
              </Button>
            </div>
          </div>
        }
      </div>
    );
}

export default EditInfo;