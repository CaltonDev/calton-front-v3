import styles from './PostUpdate.module.scss';
import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ModalUploadPhoto from 'Components/ListingPhotos/PhotoUpload/ModalUploadPhoto/ModalUploadPhoto';
import { setIsSingle } from '../../../redux/UploadPhotos';
import PostCarousel from 'Components/ListingCreatePost/PostCarousel/PostCarousel';
import PostSelectBtnType from 'Components/ListingCreatePost/PostSelectBtnType/PostSelectBtnType';
import { Field, FormItem } from 'formik-antd';
import '../DatePicker.css';

function PostUpdate({ validatePostFields, formikProps, post, setPost, imagesWithError, isFromPopper = false }) {

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const [imgFromApiObj, setImgFromApiObj] = useState(post?.media?.length > 0 ? [{
    data_url: post?.media[0]?.googleUrl,
  }] : []);

  const handleAddPhoto = () => {
    dispatch(setIsSingle(true));
    setOpenModal(true);
  };

  const handleSetDescription = (value) => {
    if (value?.length <= 1500) {
      let tmpPost = JSON.parse(JSON.stringify(post));
      tmpPost.summary = value;
      if (tmpPost?.media?.length > 0) {
        tmpPost?.media?.forEach((media) => {
          media.description = value;
        });
      } else {
        tmpPost.media = [{
          description: value,
        }];
      }
      setPost(tmpPost);
    }
    formikProps?.setFieldValue('postDescription', value);
    formikProps?.setFieldValue('postEventMedia', [{media: "description"}]);
  };

  const handleSetBtnLink = (value) => {
    let tmpPost = JSON.parse(JSON.stringify(post));
    if (tmpPost.callToAction) {
      tmpPost.callToAction.url = value;
    } else {
      tmpPost.callToAction = {
        actionType: '',
        url: value,
      };
    }

    formikProps?.setFieldValue('postBtnLink', value);

    setPost(tmpPost);
  };

  const handleValidateFormikImgData = (data) => {
    formikProps?.setFieldValue('postEventMedia', data);

    if (data?.length > 0)
      formikProps?.setFieldValue('postDescription', "description");
  };

  return (
    <div className={isFromPopper ? styles.containerEditInfo : styles.containerEditInfoPage}>
      <ModalUploadPhoto
        openUploadPhoto={openModal}
        setOpenUploadPhoto={setOpenModal}
        fromListingPhotos={false}
      />
      <div style={isFromPopper ? {display: 'flex', marginTop: '1rem', flexDirection: 'column'} : {display: 'flex', marginTop: 30}}>
        <div className={styles.containerInputLeftItem} style={isFromPopper ? { width: '100%' } : {}}>
          <span className={styles.label}>{t('Aggiungi descrizione')}</span>
          <FormItem
            name="postDescription"
            required={true}
            validate={(value) => validatePostFields(value, 'postDescription')}
            style={!isFromPopper ? { marginBottom: '3rem' } : {}}
            key={'postDescription'}
          >
            <Field
              name="postDescription"
              value={post?.media?.length > 0 ? post?.media[0]?.description : ''}
              className={isFromPopper ? styles.inputTextAreaPopper : styles.inputTextArea}
              onChange={(e) => handleSetDescription(e.target.value)}
              placeholder={t('Aggiungi descrizione')}
              rows={isFromPopper ? 2 : 4}
              as={'textarea'}
            />
          </FormItem>
          <span className={styles.labelCharCounter}>{post?.summary ? post?.summary?.length + ' / 1500' : '0 / 1500'}</span>
        </div>
        {!isFromPopper && <div className={styles.containerInputRightItem}>
          <span className={styles.label}>{t('Aggiungi foto')}</span>
          <div style={{display: 'flex'}}>
            <FormItem
              name="postEventMedia"
              required={true}
              validate={(value) => validatePostFields(value, 'postEventMedia')}
              key={'postEventMedia'}
            >
              <PostCarousel handleFormikValidation={handleValidateFormikImgData} imagesWithError={imagesWithError} imgFromApi={imgFromApiObj} isFromPopper={isFromPopper} handleAddPhoto={handleAddPhoto}/>
            </FormItem>
          </div>
        </div> }
      </div>
      <div>
        <div style={isFromPopper ? {width: '100%'}: {}}>
          <span className={styles.label}>{t('Aggiungi pulsante')}</span>
          <div style={{width: '92%', marginTop: 15, display: 'flex'}}>
            <PostSelectBtnType post={post} setPost={setPost}/>
            {post?.callToAction?.actionType !== 'ACTION_TYPE_UNSPECIFIED' &&
              <FormItem
                name="postBtnLink"
                required={true}
                validate={(value) => validatePostFields(value, 'postBtnLink')}
                style={!isFromPopper ? { width: '100%', marginBottom: '3rem' } : {}}
                key={'postBtnLink'}
              >
                <Input
                  type={'text'}
                  name="postBtnLink"
                  style={{height: 39}}
                  className={isFromPopper ? styles.inputPopper : styles.input}
                  value={post?.callToAction?.url}
                  placeholder={t("Link per il pulsante")}
                  onChange={(e) => handleSetBtnLink(e.target.value)} />
              </FormItem>
            }
          </div>
        </div>
      </div>
      {isFromPopper && <div className={isFromPopper ? styles.containerPhotoPopper : styles.containerInputPopper} style={isFromPopper ? {width: '100%'} : {}}>
        <span className={styles.label}>{t('Aggiungi foto')}</span>
        <div style={{display: 'flex'}}>
          <FormItem
            name="postEventMedia"
            required={true}
            validate={(value) => validatePostFields(value, 'postEventMedia')}
            key={'postEventMedia'}
          >
            <PostCarousel handleFormikValidation={handleValidateFormikImgData} imagesWithError={imagesWithError} imgFromApi={imgFromApiObj} isFromPopper={isFromPopper} handleAddPhoto={handleAddPhoto}/>
          </FormItem>
        </div>
      </div> }
    </div>
  );
}

export default PostUpdate;