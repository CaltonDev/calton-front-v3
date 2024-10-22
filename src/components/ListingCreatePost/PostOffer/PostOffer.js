import styles from './PostOffer.module.scss';
import React, { forwardRef, useEffect, useState } from 'react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ModalUploadPhoto from 'Components/ListingPhotos/PhotoUpload/ModalUploadPhoto/ModalUploadPhoto';
import { setIsSingle } from '../../../redux/UploadPhotos';
import DatePicker from 'react-datepicker';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import PostCarousel from 'Components/ListingCreatePost/PostCarousel/PostCarousel';
import { FormItem } from 'formik-antd';

const { TextArea } = Input;

function PostOffer({
                     validatePostFields,
                     formikProps,
                     post,
                     setPost,
                     imagesWithError,
                     isFromPopper = false,
                     showMore,
                     setShowMore,
                   }) {

  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(post?.event?.schedule?.startDate ? new Date(post?.event?.schedule?.startDate?.year, post?.event?.schedule?.startDate?.month - 1, post?.event?.schedule?.startDate?.day) : new Date());
  const [endDate, setEndDate] = useState(post?.event?.schedule?.endDate ? new Date(post?.event?.schedule?.endDate?.year, post?.event?.schedule?.endDate?.month - 1, post?.event?.schedule?.endDate?.day) : new Date().setMonth(new Date().getMonth() + 1));
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const [imgFromApiObj, setImgFromApiObj] = useState(post?.media?.length > 0 ? [{
    data_url: post?.media[0]?.googleUrl,
  }] : []);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input className={isFromPopper ? styles.customInputPopper : styles.customInput} readOnly onClick={onClick} ref={ref}
           value={value} />
  ));

  CustomInput.displayName = "CustomInput"

  const handleSetStartDate = (date) => {
    setStartDate(date);
    if (date !== null) {
      let tmpPost = JSON.parse(JSON.stringify(post));

      const timeObj = {
        endTime: {
          hours: tmpPost?.event?.schedule?.endTime ? tmpPost?.event?.schedule?.endTime.hours : '00',
          minutes: tmpPost?.event?.schedule?.endTime ? tmpPost?.event?.schedule?.endTime.minutes : '00',
        },
        startTime: {
          hours: tmpPost?.event?.schedule?.startTime ? tmpPost?.event?.schedule?.startTime.hours : '00',
          minutes: tmpPost?.event?.schedule?.startTime ? tmpPost?.event?.schedule?.startTime.minutes : '00',
        },
        endDate: tmpPost?.event?.schedule?.endDate ? {
          day: tmpPost?.event?.schedule?.endDate?.day,
          month: tmpPost?.event?.schedule?.endDate?.month,
          year: tmpPost?.event?.schedule?.endDate?.year,
        } : null,
        startDate: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
      };

      if (tmpPost?.event && tmpPost?.event?.schedule) {
        tmpPost.event.schedule.startDate = {
          'year': date.getFullYear(),
          'month': date.getMonth() + 1,
          'day': date.getDate(),
        };
      } else if (tmpPost?.event) {
        tmpPost.event.schedule = timeObj;
      } else {
        tmpPost.event =
          {
            schedule: timeObj,
          };
      }
      formikProps?.setFieldValue('postEventStartDate', date);
      setPost(tmpPost);
    }
  };

  const handleSetEndDate = (date) => {
    setEndDate(date);
    if (date !== null) {

      let tmpPost = JSON.parse(JSON.stringify(post));

      const timeObj = {
        endTime: {
          hours: tmpPost?.event?.schedule?.endTime ? tmpPost?.event?.schedule?.endTime.hours : null,
          minutes: tmpPost?.event?.schedule?.endTime ? tmpPost?.event?.schedule?.endTime.minutes : null,
        },
        startTime: {
          hours: tmpPost?.event?.schedule?.startTime ? tmpPost?.event?.schedule?.startTime.hours : null,
          minutes: tmpPost?.event?.schedule?.startTime ? tmpPost?.event?.schedule?.startTime.minutes : null,
        },
        endDate: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
        startDate: tmpPost?.event?.schedule?.startDate ? {
          day: tmpPost?.event?.schedule?.startDate?.day,
          month: tmpPost?.event?.schedule?.startDate?.month,
          year: tmpPost?.event?.schedule?.startDate?.year,
        } : null,
      };

      if (tmpPost?.event && tmpPost?.event?.schedule) {
        tmpPost.event.schedule.endDate = {
          'year': date.getFullYear(),
          'month': date.getMonth() + 1,
          'day': date.getDate(),
        };
      } else if (tmpPost?.event) {
        tmpPost.event.schedule = timeObj;
      } else {
        tmpPost.event =
          {
            schedule: timeObj,
          };
      }
      formikProps?.setFieldValue('postEventEndDate', date);
      setPost(tmpPost);
    }
  };

  const handleSetTitle = (value) => {
    let tmpPost = JSON.parse(JSON.stringify(post));
    tmpPost.name = value;

    if (tmpPost?.event) {
      tmpPost.event.title = value;
    } else {
      tmpPost.event = {
        title: value,
      };
    }
    formikProps?.setFieldValue('postEventTitle', value);
    setPost(tmpPost);
  };

  const handleSetOfferDetails = (value) => {
    let tmpPost = JSON.parse(JSON.stringify(post));
    tmpPost.summary = value;
    setPost(tmpPost);
  };

  const handleSetOfferTerms = (value) => {
    let tmpPost = JSON.parse(JSON.stringify(post));
    if (tmpPost?.offer) {
      tmpPost.offer.termsConditions = value;
    } else {
      tmpPost.offer = {
        termsConditions: value,
      };
    }

    setPost(tmpPost);
  };

  useEffect(() => {
    let tmpPost = JSON.parse(JSON.stringify(post));
    const formattedEndDate = new Date(endDate);
    tmpPost.event = {
      schedule: {
        startDate: {
          day: startDate.getDate(),
          month: startDate.getMonth() + 1,
          year: startDate.getFullYear(),
        },
        endDate: {
          day: formattedEndDate.getDate(),
          month: formattedEndDate.getMonth() + 1,
          year: formattedEndDate.getFullYear(),
        }
      },
      title: tmpPost?.event?.title
    }
    formikProps?.setFieldValue('postEventStartDate', startDate);
    formikProps?.setFieldValue('postEventEndDate', formattedEndDate);
    setPost(tmpPost)
  }, []);

  const handleSetCouponCode = (value) => {
    let tmpPost = JSON.parse(JSON.stringify(post));
    if (tmpPost?.offer) {
      tmpPost.offer.couponCode = value;
    } else {
      tmpPost.offer = {
        couponCode: value,
      };
    }

    setPost(tmpPost);
  };

  const handleSetOfferLink = (value) => {
    let tmpPost = JSON.parse(JSON.stringify(post));
    if (tmpPost?.offer) {
      tmpPost.offer.redeemOnlineUrl = value;
    } else {
      tmpPost.offer = {
        redeemOnlineUrl: value,
      };
    }

    setPost(tmpPost);
  };

  const handleAddPhoto = () => {
    dispatch(setIsSingle(true));
    setOpenModal(true);
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
      <div style={isFromPopper ? { display: 'flex', marginTop: '1rem', flexDirection: 'column' } : {
        display: 'flex',
        marginTop: 30,
      }}>
        <div className={styles.containerInputLeftItem} style={isFromPopper ? { width: '100%' } : {}}>
          <span className={styles.label}>{t('Titolo offerta')}</span>
          <FormItem
            name="postEventTitle"
            required={true}
            validate={(value) => validatePostFields(value, 'postEventTitle')}
            style={!isFromPopper ? { marginBottom: '3rem' } : {}}
          >
            <Input type={'text'}
                   style={isFromPopper ? { width: '100%' } : { width: '95%' }}
                   className={isFromPopper ? styles.inputPopper : styles.input}
                   value={post?.event?.title}
                   placeholder={t('Esempio: 20% di sconto in negozio o online')}
                   onChange={(e) => handleSetTitle(e.target.value)}
                   name={'postEventTitle'}
            />
          </FormItem>
          <div style={isFromPopper ? { display: 'flex', marginBottom: '1rem' } : { display: 'flex' }}>
            <div className={styles.containerInput} style={isFromPopper ? { paddingRight: 20 } : {}}>
              <span className={styles.label}>{t('Data di inizio')}</span>
              <FormItem
                name="postEventStartDate"
                required={true}
                validate={(value) => validatePostFields(value, 'postEventStartDate')}
                style={!isFromPopper ? { marginBottom: '3rem' } : {}}
              >
                <DatePicker
                  name="postEventStartDate"
                  selected={startDate}
                  onChange={(date) => handleSetStartDate(date)}
                  selectsRange={false}
                  isClearable={false}
                  shouldCloseOnSelect={true}
                  startOpen={false}
                  preventOpenOnFocus={true}
                  allowSameDay={true}
                  //locale={i18n.language}
                  placeholderText="00/00/0000"
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomInput />}
                />
              </FormItem>
            </div>
            <div className={styles.containerInput}>
              <span className={styles.label}>{t('Data di fine')}</span>
              <FormItem
                name="postEventEndDate"
                required={true}
                validate={(value) => validatePostFields(value, 'postEventEndDate')}
                style={!isFromPopper ? { marginBottom: '3rem' } : {}}
              >
                <DatePicker
                  name="postEventEndDate"
                  selected={endDate}
                  onChange={(date) => handleSetEndDate(date)}
                  selectsRange={false}
                  isClearable={false}
                  shouldCloseOnSelect={true}
                  startOpen={false}
                  preventOpenOnFocus={true}
                  allowSameDay={true}
                  //locale={i18n.language}
                  placeholderText="00/00/0000"
                  dateFormat="dd/MM/yyyy"
                  customInput={<CustomInput />}
                />
              </FormItem>
            </div>
          </div>
        </div>
        <div className={isFromPopper ? styles.containerPhotoPopper : styles.containerInputRightItem}
             style={isFromPopper ? { width: '100%' } : {}}>
          <span className={styles.label}>{t('Aggiungi foto')}</span>
          <div style={{ display: 'flex' }}>
            <PostCarousel handleFormikValidation={handleValidateFormikImgData} imagesWithError={imagesWithError} imgFromApi={imgFromApiObj} isFromPopper={isFromPopper} handleAddPhoto={handleAddPhoto}/>
          </div>
        </div>
      </div>
      {!isFromPopper && <div style={{ marginTop: 20 }}>
              <span className={styles.label}
                    onClick={() => setShowMore(!showMore)}>{!showMore ? t('Aggiungi altri dettagli (facoltativo)') : t('Nascondi')}</span>
        {
          !showMore ? <RightOutlined style={{ verticalAlign: 'middle' }} /> :
            <DownOutlined style={{ verticalAlign: 'middle' }} />
        }
      </div>}
      {showMore && !isFromPopper &&
        <div style={{ display: 'flex', marginTop: 20 }}>
          <div className={styles.containerInputAdditionalFields}>
            <div style={{ display: 'flex' }}>
              <div className={styles.containerInput}>
                <span className={styles.label}>{t('Codice coupon')}</span>
                <Input type={'text'}
                       style={{ width: '95%' }}
                       className={styles.input}
                       value={post?.offer?.couponCode}
                       placeholder={t('Nome coupon')}
                       onChange={(e) => handleSetCouponCode(e.target.value)}
                />
              </div>
              <div className={styles.containerInput}>
                <span className={styles.label}>{t('Link per utilizzare l\'offerta')}</span>
                <Input type={'text'}
                       style={{ width: '95%' }}
                       className={styles.input}
                       value={post?.offer?.redeemOnlineUrl}
                       placeholder={t('Link offerta')}
                       onChange={(e) => handleSetOfferLink(e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className={styles.containerInput}>
                <span className={styles.label}>{t('Dettagli offerta')}</span>
                <TextArea
                  value={post?.summary}
                  className={styles.inputTextArea}
                  onChange={(e) => handleSetOfferDetails(e.target.value)}
                  placeholder={t('Aggiungi dettagli...')}
                  rows={isFromPopper ? 2 : 4}
                />
              </div>
              <div className={styles.containerInput}>
                <span className={styles.label}>{t('Termini e condizioni')}</span>
                <TextArea
                  value={post?.offer?.termsConditions}
                  className={styles.inputTextArea}
                  onChange={(e) => handleSetOfferTerms(e.target.value)}
                  placeholder={t('Aggiungi dettagli...')}
                  rows={isFromPopper ? 2 : 4}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default PostOffer;